import { Avatar, TextInput, Button } from 'flowbite-react'
import { Link } from 'lucide-react'
import React from 'react'

const CreateBusinessAccount = () => {
  return (
    <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20">
            <header className='flex pt-5 px-10 bg-[#191818]'>
                <div className='flex justify-center flex-col mx-auto'>
                    <img src="/assets/MunchrLogo.png" className="mx-auto rounded-4xl" width={70} height={70} alt={"Munchr Logo"}></img>
                    <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
                </div>
                <div className='flex my-auto gap-5'>
                    {/* <img src="/assets/stock-image-avatar2.jpg" className="mx-auto" width={40} height={40} alt={"Avatar"}></img> */}
                </div>
            </header>
            <main>
                <div className='bg-[#191818] ps-25'>
                    <h2 className="py-12 text-5xl font-extralight text-neutral-100">
                        Let's Set Up Your Business!
                    </h2>
                    <nav className="flex justify-start gap-3 text-[16px ] font-extralight">
                        <p className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white">Create Business</p>
                    </nav>
                </div>
                <div className="mx-25 p-8 bg-[#484848] text-white rounded-lg mt-15">
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
                                    id="lastName"
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>
                            <div>
                                <p className="mb-2 block">
                                    Business Hours
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
                                    Business Phone-Number
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
                                    Business State
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
                                    Business City
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
                                    Business StreetName
                                </p>
                                <TextInput
                                    id="lastName"
                                    required
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>
                            <div>
                                <p className="mb-2 block">
                                    Business Postal Code
                                </p>
                                <TextInput
                                    id="lastName"
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>
                            <div className="pt-6">
                                <Button color={"#C95A23"} className="w-full bg-[#C95A23] h-15 border-none text-black py-1">
                                    <span className="text-xl font-medium">Create Business Account</span>
                                </Button>
                                <a href="../CreateUserAccount"><p className='text-blue-400 hover:underline mt-5'>Not a business owner?</p></a>
                                <a href="../LoginUser"><p className='text-blue-400 hover:underline mt-5'>Already have an account?</p></a>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
  )
}

export default CreateBusinessAccount