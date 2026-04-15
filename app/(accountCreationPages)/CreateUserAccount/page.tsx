// import { Avatar, TextInput, Button } from 'flowbite-react'

// const CreateUserAccount = () => {

//     return (
// <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20">
//     <header className='flex pt-5 px-10 bg-[#191818]'>
//         <div className='flex justify-center flex-col mx-auto'>
//             <a href="/">
//                 <img src="/assets/MunchrLogo.png" className="mx-auto rounded-4xl" width={70} height={70} alt={"Munchr Logo"}></img>
//                 <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
//             </a>
//         </div>
//     </header>
//     <main>
//         <div className='bg-[#191818] ps-35 lg:ps-80'>
//             <h2 className="py-12 text-5xl font-extralight text-neutral-100">
//                 Let's Set Up Your Account!
//             </h2>
//             <nav className="flex justify-start gap-3 text-[16px ] font-extralight">
//                 <p className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white">Create User</p>
//             </nav>
//         </div>
//         <div className="mx-40 lg:mx-110 p-8 bg-[#484848] text-white rounded-lg mt-15">
//             <h2 className="text-2xl font-normal border-b-2 border-[#ffffff77]">Profile</h2>
//             <div className="flex flex-col items-center mt-6">
//                 <p className="text-md mb-4">
//                     Your profile photo <span className="text-blue-400 cursor-pointer">(Add/Edit)</span>
//                 </p>
//                 <Avatar
//                     rounded
//                     size="xl"
//                     placeholderInitials="Avatar"
//                     className="mb-8"
//                 />
//                 <form className="w-full space-y-4">
//                     <div>
//                         <p className="mb-2 block">
//                             Username
//                         </p>
//                         <TextInput
//                             id="firstName"
//                             sizing="lg"
//                             className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
//                             color="#969696"
//                         />
//                     </div>
//                     <div>
//                         <p className="mb-2 block">
//                             First Name
//                         </p>
//                         <TextInput
//                             id="lastName"
//                             sizing="lg"
//                             className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
//                             color="gray"
//                         />
//                     </div>
//                     <div>
//                         <p className="mb-2 block">
//                             Last Name
//                         </p>
//                         <TextInput
//                             id="lastName"
//                             sizing="lg"
//                             className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
//                             color="gray"
//                         />
//                     </div>
//                     <div>
//                         <p className="mb-2 block">
//                             Email
//                         </p>
//                         <TextInput
//                             id="lastName"
//                             sizing="lg"
//                             className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
//                             color="gray"
//                         />
//                     </div>
//                     <div>
//                         <p className="mb-2 block">
//                             Phone Number
//                         </p>
//                         <TextInput
//                             id="lastName"
//                             sizing="lg"
//                             className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
//                             color="gray"
//                         />
//                     </div>
//                     <div>
//                         <p className="mb-2 block">
//                             Password
//                         </p>
//                         <TextInput
//                             id="lastName"
//                             sizing="lg"
//                             className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
//                             color="gray"
//                         />
//                     </div>
//                     <div>
//                         <p className="mb-2 block">
//                             Confirm Password
//                         </p>
//                         <TextInput
//                             id="lastName"
//                             sizing="lg"
//                             className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
//                             color="gray"
//                         />
//                     </div>
//                     <div className="pt-6 grid">
//                         <Button color={"#C95A23"} className="w-full bg-[#C95A23] h-15 border-none text-black py-1">
//                             <span className="text-xl font-medium">Create Account</span>
//                         </Button>
//                         <a href="../CreateBusinessAccount"><p className='hover:underline mt-5 text-blue-400 mx-auto'>Are you a business owner?</p></a>
//                         <a href="../LoginUser"><p className='hover:underline mt-5 text-blue-400 mx-auto'>Already have an account?</p></a>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </main>
// </div>
//     )
// }

// export default CreateUserAccount


"use client";

import { FormEvent, ChangeEvent, useState } from "react";
import { Avatar, Button, TextInput } from "flowbite-react";
import { createAccount } from "@/data/lib/user-services";
import { useRouter } from "next/navigation";

type CreateAccountForm = {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    isBusinessOwner: boolean;
};

const initialForm: CreateAccountForm = {
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    isBusinessOwner: false,
};

export default function CreateAccountPage() {
    const { push } = useRouter();
    const [formData, setFormData] = useState<CreateAccountForm>(initialForm);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));

        setError("");
        setSuccess("");
    };

    const validateForm = () => {
        if (
            !formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.username.trim() ||
            !formData.phoneNumber.trim() ||
            !formData.email.trim() ||
            !formData.password.trim()
        ) {
            return "Please fill out all fields.";
        }

        if (!formData.email.includes("@")) {
            return "Please enter a valid email.";
        }

        if (formData.password.length < 8) {
            return "Password must be at least 8 characters.";
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
        setSuccess("");

        try {
            const success = await createAccount({
                userProfileImage: "",
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                username: formData.username.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                email: formData.email.trim(),
                password: formData.password,
                isBusinessOwner: formData.isBusinessOwner,
            });

            if (!success) {
                setError("Account creation failed.");
                return;
            }

            setSuccess("Account created successfully.");
            setFormData(initialForm);

            if (formData.isBusinessOwner) {
                push("/CreateBusiness");
                return;
            }

            push("/");
        } catch (err) {
            setError("Something went wrong while creating the account.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20">
            <header className='flex pt-5 px-10 bg-[#191818]'>
                <div className='flex justify-center flex-col mx-auto'>
                    <a href="/">
                        <img src="/assets/MunchrLogo.png" className="mx-auto rounded-4xl" width={70} height={70} alt={"Munchr Logo"}></img>
                        <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
                    </a>
                </div>
            </header>
            <main>
                <div className='bg-[#191818] ps-35 lg:ps-80'>
                    <h2 className="py-12 text-5xl font-extralight text-neutral-100">
                        Let's Set Up Your Account!
                    </h2>
                    <nav className="flex justify-start gap-3 text-[16px ] font-extralight">
                        <p className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white">Create User</p>
                    </nav>
                </div>
                <div className="mx-40 lg:mx-110 p-8 bg-[#484848] text-white rounded-lg mt-15">
                    <h2 className="text-2xl font-normal border-b-2 border-[#ffffff77]">Profile</h2>
                    <div className="flex flex-col items-center mt-6">
                        <p className="text-md mb-4">
                            Your profile photo <span className="text-blue-400 cursor-pointer">(Add/Edit)</span>
                        </p>
                        <Avatar
                            rounded
                            size="xl"
                            placeholderInitials="Avatar"
                            className="mb-8"
                        />
                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                            <div>
                                <p className="mb-2 block">First Name</p>
                                <TextInput
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Last Name</p>
                                <TextInput
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

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
                                <p className="mb-2 block">Phone Number</p>
                                <TextInput
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Email</p>
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={formData.email}
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

                            <div className="flex items-center gap-2">
                                <input
                                    id="isBusinessOwner"
                                    type="checkbox"
                                    checked={formData.isBusinessOwner}
                                    onChange={handleChange}
                                />
                                <label htmlFor="isBusinessOwner">Business Owner</label>
                            </div>

                            {error && <p className="text-red-500">{error}</p>}
                            {success && <p className="text-green-500">{success}</p>}

                            <Button color={"#C95A23"} className="w-full bg-[#C95A23] h-15 border-none text-black py-1 text-xl" type="submit" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create Account"}
                            </Button>
                            <a href="../LoginUser"><p className='hover:underline mt-5 text-blue-400 mx-auto'>Already have an account?</p></a>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
