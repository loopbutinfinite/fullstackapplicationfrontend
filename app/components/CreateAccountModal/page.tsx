"use client";
import { Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react'
import { useState } from 'react'

const CreateAccountModal = () => {
    const [openModal, setOpenModal] = useState(true);
  return (
    <>
      <Modal 
        show={openModal} 
        onClose={() => setOpenModal(false)} 
        size="md"
        popup
        theme={{
          content: {
            base: "relative h-full w-full p-4 md:h-auto",
            inner: "relative rounded-lg bg-[#D9D9D9]" // Matches the light gray background
          }
        }}
      >
        <ModalHeader className='bg-[#DDDDDD] '>
          <img src="/assets/MunchrLogo.png" className="mx-38" width={70} height={70} alt={"Munchr Logo"}></img>
        </ModalHeader>
        <ModalBody className='bg-[#DDDDDD]'>
          <div className="space-y-4 pb-4 bg-[#DDDDDD]">
            {/* 1. Logo and Title Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 mb-2">
                {/* Replace with your Munchr logo component or img */}
                <div className="text-center">
                   <h2 className="text-4xl text-[#C45A2D] font-bold tracking-tighter">Munchr</h2>
                </div>
              </div>
              <p className="text-sm font-normal text-black">Create an account:</p>
            </div>

            {/* 2. Registration Form Fields */}
            <form className="flex flex-col gap-3">
              <TextInput 
                id="firstName" 
                placeholder="First Name" 
                required 
                className="[&_input]:bg-[#DDDDDD] [&_input]:border-neutral-500 [&_input]:rounded-sm"
              />
              <TextInput 
                id="lastName" 
                placeholder="Last Name" 
                required 
                className="[&_input]:bg-[#DDDDDD] [&_input]:border-neutral-500 [&_input]:rounded-sm"
              />
              <TextInput 
                id="email" 
                placeholder="E-mail" 
                type="email" 
                required 
                className="[&_input]:bg-[#DDDDDD] [&_input]:border-neutral-500 [&_input]:rounded-sm"
              />
              <TextInput 
                id="password" 
                placeholder="Password" 
                type="password" 
                required 
                className="[&_input]:bg-[#DDDDDD] [&_input]:border-neutral-500 [&_input]:rounded-sm"
              />
              <TextInput 
                id="confirmPassword" 
                placeholder="Confirm Password" 
                type="password" 
                required 
                className="[&_input]:bg-[#DDDDDD] [&_input]:border-neutral-500 [&_input]:rounded-sm"
              />

              {/* 3. Action Button */}
              <Button 
                color={"#C95A23"}
                className="mt-2 bg-[#C95A23] border-none text-white rounded-md"
                onClick={() => setOpenModal(false)}
              >
                <span className="text-lg">Create Account</span>
              </Button>
            </form>

            {/* 4. Footer Links */}
            <div className="text-center text-xs space-y-1 -mt-2">
              <p className="text-black font-medium">
                Business Owner? <a href="#" className="text-blue-600 hover:underline">Click here</a>
              </p>
              <p className="text-black font-medium">
                Have an account? <a href="#" className="text-blue-600 hover:underline">Sign in</a>
              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CreateAccountModal