"use client";

import Image from "next/image";
import { Button, TextInput, Avatar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getUserByUsername,
  updateUserProfile,
} from "@/data/lib/user-services";
import { UserModel } from "@/data/Interfaces/Interfaces";

const UserProfilePage = () => {
  const router = useRouter();

  const {
    isLoggedIn,
    user,
    logout,
    isCheckingAuth,
    updateUser,
  } = useAuth();

  const [userInfo, setUserInfo] = useState<UserModel | null>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isCheckingAuth && !isLoggedIn) {
      router.push("/");
    }
  }, [isCheckingAuth, isLoggedIn, router]);

  useEffect(() => {
    if (!user?.username) return;

    const fetchUserInfo = async () => {
      try {
        const foundUser = await getUserByUsername(user.username);

        setUserInfo(foundUser);
        setUsername(foundUser.username || "");
        setEmail(foundUser.email || "");
      } catch (error) {
        console.log("Failed to fetch user info:", error);
        setErrorMessage("Could not load user profile information.");
      }
    };

    fetchUserInfo();
  }, [user?.username]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername) {
      setErrorMessage("Username cannot be empty.");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("Email cannot be empty.");
      return;
    }

    if (!userInfo?.userId) {
      setErrorMessage("Could not find the current user.");
      return;
    }

    if (!user) {
      setErrorMessage("You must be logged in to update your profile.");
      return;
    }

    try {
      setIsSaving(true);

      const result = await updateUserProfile(userInfo.userId, {
        username: trimmedUsername,
        email: trimmedEmail,
      });

      if (!result) {
        setErrorMessage("Username or email may already be taken.");
        return;
      }

      const updatedAuthUser = {
        ...user,
        username: trimmedUsername,
        email: trimmedEmail,
      };

      updateUser(updatedAuthUser);

      setUserInfo({
        ...userInfo,
        username: trimmedUsername,
        email: trimmedEmail,
      });

      setUsername(trimmedUsername);
      setEmail(trimmedEmail);

      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      console.log("Profile update error:", error);
      setErrorMessage("Something went wrong while updating your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#2D2D2D] flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20">
      <header className="flex pt-5 px-10 bg-[#191818]">
        <div className="flex justify-center flex-col mx-auto">
          <Link href="/">
            <Image
              src="/assets/MunchrLogo.png"
              className="mx-auto"
              width={70}
              height={70}
              alt="Munchr Logo"
            />
            <h1 className="text-3xl font-extrabold text-[#C95A23]">
              Munchr
            </h1>
          </Link>
        </div>
      </header>

      <main>
        <div className="bg-[#191818] ps-35 lg:ps-70">
          <h2 className="py-12 text-5xl font-extralight text-neutral-100">
            Hello, {username || user?.username}
          </h2>

          <nav className="flex justify-start gap-3 text-[16px] font-extralight">
            <Link
              href="/UserProfilePage"
              className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white"
            >
              My account
            </Link>

            <Link
              href="/ChangePassword"
              className="hover:border-b-[#C95A23] hover:bg-[#2D2D2D] border-b-[#3A3A3A] border-b-2"
            >
              Change Password
            </Link>
          </nav>
        </div>

        <div className="mx-40 lg:mx-110 p-8 bg-[#484848] text-white rounded-lg mt-15">
          <h2 className="text-2xl font-normal border-b-2 border-[#ffffff77]">
            Profile
          </h2>

          <div className="flex flex-col items-center mt-6">
            <p className="text-md mb-4">
              Your profile photo{" "}
              <span className="text-blue-400 cursor-pointer">
                (Add/Edit)
              </span>
            </p>

            <Avatar size="xl" className="mb-8" />

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <p className="mb-2 block">Username</p>
                <TextInput
                  id="username"
                  sizing="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                />
              </div>

              <div>
                <p className="mb-2 block">E-mail</p>
                <TextInput
                  id="email"
                  type="email"
                  sizing="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                />
              </div>

              {errorMessage && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}

              {successMessage && (
                <p className="text-green-400 text-sm">{successMessage}</p>
              )}

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSaving}
                  color="#C95A23"
                  className="w-full bg-[#C95A23] h-15 border-none text-black py-1 disabled:opacity-60"
                >
                  <span className="text-xl font-medium">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="place-items-center mt-10">
          <Button
            color="failure"
            className="bg-[#b23b3b] text-xl"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;