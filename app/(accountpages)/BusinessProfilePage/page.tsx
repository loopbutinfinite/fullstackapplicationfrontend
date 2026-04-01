import React from 'react'
import Image from "next/image";
import { Button, Card, HR, TextInput, Avatar } from 'flowbite-react';
import { LockIcon } from 'lucide-react';
import Link from 'next/link';

const BusinessProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20">
            <header className='flex pt-5 px-10 bg-[#191818]'>
                <div className='flex justify-center flex-col mx-auto'>
                    <Image src="/assets/MunchrLogo.png" className="mx-auto" width={70} height={70} alt={"Munchr Logo"}></Image>
                    <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
                </div>
                <div className='flex my-auto gap-5'>
                    <Image src="/assets/stock-image-avatar2.jpg" className="mx-auto" width={40} height={40} alt={"Avatar"}></Image>
                </div>
            </header>
            <main>
                <div className='bg-[#191818] ps-25'>
                    <h2 className="py-12 text-5xl font-extralight text-neutral-100">
                        Hello, User
                    </h2>
                    <nav className="flex justify-start gap-3 text-[16px ] font-extralight">
                        <Link href="" className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white">My account</Link>
                        <Link href="../ChangePassword" className="hover:border-b-[#C95A23] hover:bg-[#2D2D2D] border-b-[#3A3A3A] border-b-2">Change Password</Link>
                    </nav>
                </div>
                <div className="mx-25 p-8 bg-[#484848] text-white rounded-lg mt-15">
                    {/* Header Section */}
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
                        <form className="w-full space-y-4">
                            <div>
                                <p className="mb-2 block">
                                    First Name
                                </p>
                                <TextInput
                                    id="firstName"
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="#969696"
                                />
                            </div>
                            <div>
                                <p className="mb-2 block">
                                    Last Name
                                </p>
                                <TextInput
                                    id="lastName"
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>
                            <div>
                                <p className="mb-2 block">
                                    Business Name
                                </p>
                                <TextInput
                                    id="firstName"
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="#969696"
                                />
                            </div>
                            <div className="pt-6">
                                <Button color={"#C95A23"} className="w-full bg-[#C95A23] h-15 border-none text-black py-1">
                                    <span className="text-xl font-medium">Save Changes</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
  )
}

export default BusinessProfilePage