'use client';

import { Button, TextInput, Dropdown, Card, Badge } from 'flowbite-react';
import Image from "next/image";

export default function Home() {

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
            className="rounded-[20px] text-2xl"
          />
        </div>
        <div className="flex gap-2">
          <Button color="#484848" className='bg-[#484848]'>Log in</Button>
          <Button color="#C95A23" className="bg-[#C95A23]">Sign Up</Button>
        </div>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-screen mx-5">
        <div className="lg:col-span-7 bg-[#484848] rounded-2xl  shadow-xl p-6">
          <div className="grid grid-cols-2 items-center gap-4 mb-8">
            <Dropdown label="Category" color="#2D2D2D" size="md" className='bg-[#2D2D2D] text-xl'>
            </Dropdown>
            <Badge size="xl" color='#C95A23' className="px-6 py-2 bg-[#C95A23] text-white border-none rounded-lg text-[32px] mx-auto">
              Mexican
            </Badge>
          </div>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 bg-[#484848] custom-scrollbar">
            <Card color='#2D2D2D' className="dark:bg-[#2D2D2D] border-none">
              <div className="flex flex-col sm:flex-row gap-5 bg-[#2D2D2D]">
                <div className="w-full sm:w-32 h-32 rounded-lg flex items-center justify-center">
                  <Image src="/assets/mexican-food-stock-image.jpg" className="mx-auto" width={180} height={180} alt={"Munchr Logo"}></Image>
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h5 className="text-4xl font-bold tracking-tight text-white">
                      La Kora Taco Truck
                    </h5>
                    <div className='grid'>

                      <div className="flex items-center gap-1 text-white text-sm mt-1">
                        Alitalia and Arch Rd Stockton, CA 95206
                      </div>
                      <div className="flex items-center gap-1 text-white text-sm">
                        (209) 594-5758
                      </div>
                      <div className="flex items-center gap-1 text-white text-sm">
                        9:00 AM - 5:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card color='#2D2D2D' className="dark:bg-[#2D2D2D] border-none">
              <div className="flex flex-col sm:flex-row gap-5 bg-[#2D2D2D]">
                <div className="w-full sm:w-32 h-32 rounded-lg flex items-center justify-center">
                  <Image src="/assets/mexican-food-stock-image.jpg" className="mx-auto" width={180} height={180} alt={"Munchr Logo"}></Image>
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h5 className="text-4xl font-bold tracking-tight text-white">
                      La Kora Taco Truck
                    </h5>
                    <div className='grid'>

                      <div className="flex items-center gap-1 text-white text-sm mt-1">
                        Alitalia and Arch Rd Stockton, CA 95206
                      </div>
                      <div className="flex items-center gap-1 text-white text-sm">
                        (209) 594-5758
                      </div>
                      <div className="flex items-center gap-1 text-white text-sm">
                        9:00 AM - 5:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card color='#2D2D2D' className="dark:bg-[#2D2D2D] border-none">
              <div className="flex flex-col sm:flex-row gap-5 bg-[#2D2D2D]">
                <div className="w-full sm:w-32 h-32 bg-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs italic">Food Image</span>
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h5 className="text-4xl font-bold tracking-tight text-white">
                      La Kora Taco Truck
                    </h5>
                    <div className='grid'>

                      <div className="flex items-center gap-1 text-white text-sm mt-1">
                        Alitalia and Arch Rd Stockton, CA 95206
                      </div>
                      <div className="flex items-center gap-1 text-white text-sm">
                        (209) 594-5758
                      </div>
                      <div className="flex items-center gap-1 text-white text-sm">
                        9:00 AM - 5:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card color='#2D2D2D' className="dark:bg-[#2D2D2D] border-none">
              <div className="flex flex-col sm:flex-row gap-5 bg-[#2D2D2D]">
                <div className="w-full sm:w-32 h-32 bg-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs italic">Food Image</span>
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h5 className="text-4xl font-bold tracking-tight text-white">
                      La Kora Taco Truck
                    </h5>
                    <div className='grid'>

                      <div className="flex items-center gap-1 text-white text-sm mt-1">
                        Alitalia and Arch Rd Stockton, CA 95206
                      </div>
                      <div className="flex items-center gap-1 text-white text-sm">
                        (209) 594-5758
                      </div>
                      <div className="flex items-center gap-1 text-white text-sm">
                        9:00 AM - 5:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="lg:col-span-5 relative min-h-[500px] lg:min-h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800">
          <div className="absolute inset-0 bg-[#cbd5e1] flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-2">Google Maps Embed API</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}