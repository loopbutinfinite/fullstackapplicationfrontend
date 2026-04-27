"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button } from "flowbite-react";
import { getUserByUsername, login as loginUser } from "@/data/lib/user-services";
import { UserInfo } from "@/data/Interfaces/Interfaces";
import { useAuth } from "@/context/AuthContext";

const initialForm: UserInfo = {
  username: "",
  password: "",
};

const LoginUser = () => {
  const { push } = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState<UserInfo>(initialForm);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      return "Please enter your username and password.";
    }

    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    const result = await loginUser({
      username: formData.username.trim(),
      password: formData.password,
    });

    if (!result.success) {
      setError(result.message || "Invalid username or password.");
      return;
    }

    const fullUser = await getUserByUsername(formData.username.trim());

    if (!fullUser || !fullUser.userId) {
      setError("Login worked, but we could not find your account information.");
      return;
    }

    login(result.token ?? "local-session", {
      userId: fullUser.userId,
      username: fullUser.username,
      email: fullUser.email,
      isBusinessOwner: fullUser.isBusinessOwner,
    });

    push("/");
  } catch (err) {
    console.error(err);
    setError("Something went wrong while logging in.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20">
      <header className="flex pt-5 px-10 bg-[#191818]">
        <div className="flex justify-center flex-col mx-auto">
          <a href="/">
            <img
              src="/assets/MunchrLogo.png"
              className="mx-auto rounded-4xl"
              width={70}
              height={70}
              alt="Munchr Logo"
            />
            <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
          </a>
        </div>
      </header>

      <main>
        <div className="bg-[#191818] ps-35 lg:ps-60 xl:ps-110">
          <h2 className="py-12 text-5xl font-extralight text-neutral-100">
            Let's Get You Logged In!
          </h2>
          <div className="flex justify-start gap-3 text-[16px] font-extralight">
            <p className="border-b-2 text-lg border-[#C95A23] pb-1 text-neutral-50 hover:text-white">
              Log In
            </p>
          </div>
        </div>

        <div className="mx-40 lg:mx-80 xl:mx-130 p-8 bg-[#484848] text-white rounded-lg mt-15">
          <h2 className="text-2xl font-normal border-b-2 border-[#ffffff77]">
            Profile
          </h2>

          <div className="flex flex-col items-center mt-6">
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <p className="mb-2 block">Username</p>
                <TextInput
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  sizing="lg"
                  className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                  color="gray"
                />
              </div>

              <div>
                <p className="mb-2 block">Password</p>
                <TextInput
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  sizing="lg"
                  className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                  color="gray"
                />
              </div>

              {error && <p className="text-red-400">{error}</p>}

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  color="#C95A23"
                  className="w-full bg-[#C95A23] h-15 border-none text-black py-1"
                >
                  <span className="text-xl font-medium">
                    {isLoading ? "Signing In..." : "Sign In"}
                  </span>
                </Button>

                <a href="../CreateUserAccount">
                  <p className="text-blue-400 hover:underline mt-5">
                    Don't have an account?
                  </p>
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginUser;