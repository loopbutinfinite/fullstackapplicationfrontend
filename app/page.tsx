'use client';

import { Button, TextInput, Dropdown, Card, Badge } from 'flowbite-react';
import Image from "next/image";
import MapComponent from '@/components/MapBox/MapComponent';
import { useEffect, useState } from "react";
import { getAllBusinesses } from "@/data/lib//business-services";
import { BusinessModel } from '@/data/Interfaces/Interfaces';

export default function Home() {
  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      // const token = localStorage.getItem("token"); // or however you store it
      // if (!token) return;

      const data = await getAllBusinesses();
      setBusinesses(data);
    };

    fetchBusinesses();
  }, []);
  return (
    <div className="min-h-screen bg-[#2D2D2D] p-4 antialiased">
      <nav className="flex flex-wrap items-center justify-between mb-6 gap-4 px-6">
        <div className="grid items-center gap-2">
          <Image src="/assets/MunchrLogo.png" className="mx-auto" width={70} height={70} alt={"Munchr Logo"}></Image>
          <span className="text-3xl font-extrabold text-[#C95A23]">Munchr</span>
        </div>
        <div className="w-full md:max-w-xl">
          <TextInput
            type="text"
            placeholder="Search"
            required
            color="gray"
            className="rounded-[20px] [&_input]:bg-[#484848] text-2xl"
          />
        </div>
        <div className="flex gap-2">
          <Button href='../LoginUser' color="#484848" className='bg-[#484848]'>Log in</Button>
          <Button href='../CreateUserAccount' color="#C95A23" className="bg-[#C95A23]">Sign Up</Button>
        </div>
      </nav>
      <div className="grid grid-cols-1 pb-10 lg:grid-cols-12 gap-6 max-w-screen min-h-[90vh] mx-5">
        <div className="lg:col-span-7 bg-[#484848] rounded-2xl  shadow-xl p-6">
          <div className="flex items-center gap-4 mb-8">
            <Dropdown label="Category" color="#2D2D2D" size="md" className='bg-[#2D2D2D] text-xl'>
              <div className='grid grid-rows-auto gap-2 bg-[#2D2D2D]'>
                <div className='bg-[#C95A23]'>
                  <p className='py-2 text-center font-bold'>Mexican</p>
                </div>
                <div className='bg-[#C95A23]'>
                  <p className='py-2 text-center font-bold'>Korean</p>
                </div>
              </div>
            </Dropdown>
            <Badge size="xl" color='#C95A23' className="justify-center px-6 py-2 bg-[#C95A23] text-white border-none rounded-lg text-[32px] mx-auto">
              Mexican
            </Badge>
          </div>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 bg-[#484848] custom-scrollbar">
            {
              businesses.map((business, index) => (
                <Card key={index} color='#2D2D2D' className="dark:bg-[#2D2D2D] border-none">
                  <div className="flex flex-col sm:flex-row gap-5 bg-[#2D2D2D]">
                    <div className="w-full sm:w-32 h-32 rounded-lg flex items-center justify-center">
                      <Image src="/assets/mexican-food-stock-image.jpg" className="mx-auto" width={180} height={180} alt={"Munchr Logo"}></Image>
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h5 className="text-4xl font-bold tracking-tight text-white">
                          {business.businessName}
                        </h5>
                        <div className='grid'>
                          <div className="flex items-center gap-1 text-white text-lg mt-1">
                            {business.streetName}, {business.city}, {business.state} {business.zipCode}
                          </div>
                          <div className="flex items-center gap-1 text-white text-lg">
                            {business.businessPhoneNumber}
                          </div>
                          <div className="flex items-center gap-1 text-white text-lg">
                            {business.businessHours}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
        <div className="lg:col-span-5 relative h-[800px] lg:h-full w-full rounded-2xl overflow-hidden shadow-2xl">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}