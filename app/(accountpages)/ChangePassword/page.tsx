// "use client";

// import Image from "next/image";
// import { Avatar, Button, Card, TextInput } from 'flowbite-react';
// import { LockIcon } from 'lucide-react';
// import Link from 'next/link';

// const ChangePassword = () => {
//     return (
//         <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200">
//             <header className='flex pt-5 px-10 bg-[#191818]'>
//                 <div className='flex justify-center flex-col mx-auto'>
//                     <a href="/">
//                         <Image src="/assets/MunchrLogo.png" className="mx-auto" width={70} height={70} alt={"Munchr Logo"}></Image>
//                         <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
//                     </a>
//                 </div>
//                 <div className='flex my-auto gap-5'>
//                     {/* <Image src="/assets/stock-image-avatar2.jpg" className="mx-auto" width={40} height={40} alt={"Avatar"}></Image> */}
//                     <Avatar></Avatar>
//                 </div>
//             </header>
//             <main className='grid'>
//                 <div className='bg-[#191818] ps-35 lg:ps-70'>
//                     <h2 className="py-12 text-5xl font-extralight text-neutral-100">
//                         Change Password
//                     </h2>
//                     <nav className="flex justify-start gap-3 text-[16px] font-extralight">
//                         <Link href="../UserProfilePage" className="hover:border-b-[#C95A23] hover:bg-[#2D2D2D] border-b-[#3A3A3A] border-b-2">My account</Link>
//                         <Link href="" className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white">Change Password</Link>
//                     </nav>
//                 </div>
//                 <Card color={"#484848"} className="w-full max-w-xl border-none dark:bg-[#484848] p-3 shadow-2xlm mx-auto w-[400px] mt-15">
//                     <form className="flex flex-col gap-3 bg-[#484848]">
//                         <div className=''>
//                             <TextInput
//                                 type="password"
//                                 icon={LockIcon}
//                                 placeholder="CURRENT PASSWORD"
//                                 required
//                                 className="[&_input]:bg-[#969696] [&_input]:border-b-[#000000] [&_input]:border-b-3 [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343] [&_svg]:text-white"
//                             />
//                         </div>
//                         <div>
//                             <TextInput
//                                 type="password"
//                                 icon={LockIcon}
//                                 placeholder="PASSWORD"
//                                 required
//                                 className="[&_input]:bg-[#969696] [&_input]:border-b-[#000000] [&_input]:my-4 [&_input]:border-b-3 [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343] [&_svg]:text-white"
//                             />
//                         </div>
//                         <div>
//                             <TextInput
//                                 type="password"
//                                 icon={LockIcon}
//                                 placeholder="CONFIRM PASSWORD"
//                                 required
//                                 className="[&_input]:bg-[#969696] [&_input]:border-b-[#000000] [&_input]:border-b-3 [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343] [&_svg]:text-white"
//                             />
//                         </div>
//                         <p className="text-center text-[13px] mt-3.5 text-white">
//                             To change your current password, enter the new password in both fields.
//                         </p>
//                         <Button
//                             type="submit"
//                             color={"#C95A23"}
//                             className="mt-4 flex w-full h-15 mx-auto text-black items-center justify-center gap-2 rounded-lg bg-[#C95A23] hover:bg-orange-700"
//                         >
//                             <span className="font-bold uppercase text-xl">Confirm Changes</span>
//                         </Button>
//                     </form>
//                 </Card>
//             </main>
//         </div>
//     )
// }

// export default ChangePassword



"use client";
 
import React, { useState } from "react";
import Image from "next/image";
import { Button, Card, TextInput } from "flowbite-react";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { changePassword } from "@/data/lib/user-services";
 
const ChangePassword = () => {
    const { user, isLoggedIn } = useAuth();
 
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
 
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 
        setError("");
        setSuccessMessage("");
 
        if (!isLoggedIn || !user) {
            setError("You must be logged in to change your password.");
            return;
        }
 
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill out all password fields.");
            return;
        }
 
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }
 
        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters long.");
            return;
        }
 
        try {
            setIsSubmitting(true);
 
            await changePassword({
                username: user.username,
                currentPassword: currentPassword,
                newPassword: newPassword,
            });
 
            setSuccessMessage("Password changed successfully.");
 
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setError("Current password is incorrect or password could not be changed.");
        } finally {
            setIsSubmitting(false);
        }
    };
 
    return (
        <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200">
            <header className="flex pt-5 px-10 bg-[#191818]">
                <div className="flex justify-center flex-col mx-auto">
                    <a href="/">
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
                    </a>
                </div>
            </header>
 
            <main className="grid">
                <div className="bg-[#191818] ps-35 lg:ps-70">
                    <h2 className="py-12 text-5xl font-extralight text-neutral-100">
                        Change Password
                    </h2>
 
                    <nav className="flex justify-start gap-3 text-[16px] font-extralight flex-wrap">
                        <Link href="/UserProfilePage" className="hover:border-b-[#C95A23] hover:bg-[#2D2D2D] border-b-[#3A3A3A] border-b-2">
                            My account
                        </Link>
 
                        <Link href="/ChangePassword" className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white">
                            Change Password
                        </Link>
 
                        {user?.isBusinessOwner && (
                          <Link href="/MyBusiness" className="hover:border-b-[#C95A23] hover:bg-[#2D2D2D] border-b-[#3A3A3A] border-b-2">
                            My Business
                          </Link>
                        )}
                    </nav>
                </div>
 
                <Card className="w-full max-w-xl border-none dark:bg-[#484848] p-3 shadow-2xl mx-auto w-[400px] mt-15 bg-[#484848]">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-[#484848]">
                        {error && (
                            <p className="text-center text-sm text-red-400 font-semibold">
                                {error}
                            </p>
                        )}
 
                        {successMessage && (
                            <p className="text-center text-sm text-green-400 font-semibold">
                                {successMessage}
                            </p>
                        )}
 
                        <div>
                            <TextInput
                                type="password"
                                icon={LockIcon}
                                placeholder="CURRENT PASSWORD"
                                required
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="[&_input]:bg-[#969696] [&_input]:border-b-[#000000] [&_input]:border-b-3 [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343] [&_svg]:text-white"
                            />
                        </div>
 
                        <div>
                            <TextInput
                                type="password"
                                icon={LockIcon}
                                placeholder="NEW PASSWORD"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="[&_input]:bg-[#969696] [&_input]:border-b-[#000000] [&_input]:my-4 [&_input]:border-b-3 [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343] [&_svg]:text-white"
                            />
                        </div>
 
                        <div>
                            <TextInput
                                type="password"
                                icon={LockIcon}
                                placeholder="CONFIRM NEW PASSWORD"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="[&_input]:bg-[#969696] [&_input]:border-b-[#000000] [&_input]:border-b-3 [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343] [&_svg]:text-white"
                            />
                        </div>
 
                        <p className="text-center text-[13px] mt-3.5 text-white">
                            To change your current password, enter your current password,
                            then enter your new password in both fields.
                        </p>
 
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            color={"#C95A23"}
                            className="mt-4 flex w-full h-15 mx-auto text-black items-center justify-center gap-2 rounded-lg bg-[#C95A23] hover:bg-orange-700"
                        >
                            <span className="font-bold uppercase text-xl">
                                {isSubmitting ? "Changing Password..." : "Confirm Changes"}
                            </span>
                        </Button>
                    </form>
                </Card>
            </main>
        </div>
    );
};
 
export default ChangePassword;