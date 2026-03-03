import { Button, TextInput } from "flowbite-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#2D2D2D] min-h-screen">
      <main className="">
        <div className="grid grid-cols-3 pt-5">
          <div>
            <Image src="/assets/MunchrLogo.png" className="" width={50} height={50} alt={"Munchr Logo"}></Image>
            <p className="text-[#C95A23] text-[20px] font-bold">Munchr</p>
          </div>
          <div className="">
            <input type="search" className="bg-white text-black rounded-[5px]" placeholder="Search" />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <Button>Login</Button>
            <Button className="bg-[#C95A23]">Sign Up</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
