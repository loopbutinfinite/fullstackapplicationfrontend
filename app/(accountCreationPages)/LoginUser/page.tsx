import { Avatar, TextInput, Button } from 'flowbite-react'
import React from 'react'

const LoginUser = () => {
    return (
        <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20">
            <header className='flex pt-5 px-10 bg-[#191818]'>
                <div className='flex justify-center flex-col mx-auto'>
                    <a href="/">
                        <img src="/assets/MunchrLogo.png" className="mx-auto rounded-4xl" width={70} height={70} alt={"Munchr Logo"}></img>
                        <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
                    </a>
                </div>
                <div className='flex my-auto gap-5'>
                    {/* <img src="/assets/stock-image-avatar2.jpg" className="mx-auto" width={40} height={40} alt={"Avatar"}></img> */}
                </div>
            </header>
            <main>
                <div className='bg-[#191818] ps-35 lg:ps-80'>
                    <h2 className="py-12 text-5xl font-extralight text-neutral-100">
                        Let's Get You Logged In!
                    </h2>
                    <nav className="flex justify-start gap-3 text-[16px ] font-extralight">
                        <p className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white">Logging in...</p>
                    </nav>
                </div>
                <div className="mx-40 lg:mx-110 p-8 bg-[#484848] text-white rounded-lg mt-15">
                    <h2 className="text-2xl font-normal border-b-2 border-[#ffffff77]">Profile</h2>
                    <div className="flex flex-col items-center mt-6">
                        <form className="w-full space-y-4">
                            <div>
                                <p className="mb-2 block">
                                    Username
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
                                    Password
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
                                    <span className="text-xl font-medium">Sign In</span>
                                </Button>
                                <a href="../CreateUserAccount"><p className='text-blue-400 hover:underline mt-5'>Don't have an account?</p></a>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LoginUser