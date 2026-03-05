import { Button, Card, Rating, Avatar } from 'flowbite-react'
import React from 'react'
import Image from "next/image";

const Business = () => {
    return (
        <div className="min-h-screen bg-[#2D2D2D] text-whitemd:p-8">
            <header className='flex pt-5 px-10'>
                <div className='flex justify-center flex-col mx-auto'>
                    <Image src="/assets/MunchrLogo.png" className="mx-auto" width={70} height={70} alt={"Munchr Logo"}></Image>
                    <span className="text-3xl font-extrabold text-[#C95A23]">Munchr</span>
                </div>
                <div className='flex my-auto gap-5'>
                    <Button color={"#484848"} className='bg-[#484848]'>Log in</Button>
                    <Button color={"#C95A23"} className='bg-[#C95A23]'>Sign Up</Button>
                </div>
            </header>
            <div className="mx-10 bg-gray-700 mt-5 rounded-lg overflow-hidden shadow-xl">
                <header className="relative h-64 md:h-96 w-full">
                    <img
                        src="/api/placeholder/1200/400"
                        alt="Food Trucks"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                        <h1 className="text-3xl md:text-4xl font-bold">La Kora Taco Truck</h1>
                        <div className="flex items-center mt-2 gap-2">
                            <Rating>
                            </Rating>
                            <span>4/5</span>
                        </div>
                        <p className="mt-2 text-sm"><p className="inline mr-1" /> Alitalia and Arch Rd Stockton, CA 95206</p>
                        <p className="text-sm"><p className="inline mr-1" /> (209) 594-5758</p>
                        <p className="text-sm"><p className="inline mr-1" /> 9:00 AM - 5:00 PM</p>
                    </div>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-[#484848]">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="flex gap-4 border-b border-gray-600">
                            <Button color="#C95A23" className='bg-[#C95A23]'>Leave a review</Button>
                            <Button color="#C95A23" className='bg-[#C95A23]'>Favorite</Button>
                        </div>
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">Menu</h2>
                            <div className="rounded-lg overflow-hidden border border-gray-600">
                                <img src="/api/placeholder/800/500" alt="Menu Board" className="w-full h-auto" />
                            </div>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                            <div className="space-y-6">
                                <div className="border-b border-gray-600 pb-6">
                                    <Rating size="sm">
                                    </Rating>
                                    <div className="flex items-center gap-3 my-3">
                                        <Avatar img="/api/placeholder/40/40" rounded />
                                        <span className="font-medium text-white">Jeremy B.</span>
                                    </div>
                                    <p className="text-white leading-relaxed">
                                        Customer service is great. The staff make the food right the first time. We have order up 30 plates and it's correct each time we go. Very fast service. Best taco in town if you get the hot sauce not mild. Try the savage nachos if you're really hungry.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="border-b border-gray-600 pb-6">
                                    <Rating size="sm">
                                    </Rating>
                                    <div className="flex items-center gap-3 my-3">
                                        <Avatar img="/api/placeholder/40/40" rounded />
                                        <span className="font-medium text-white">Jeremy B.</span>
                                    </div>
                                    <p className="text-white leading-relaxed">
                                        Tacos were really good. The meat had really good flavor and tasted so fresh. After trying to decide food trucks in the area I'm so happy I found this food truck because the tacos were so good. Workers were also very nice. The only complaint I have was the wait time but the flavor of the tortilla. The tacos made up for it. I recommend calling in and ordering ahead

                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="border-b border-gray-600 pb-6">
                                    <Rating size="sm">
                                    </Rating>
                                    <div className="flex items-center gap-3 my-3">
                                        <Avatar img="/api/placeholder/40/40" rounded />
                                        <span className="font-medium text-white">Brett M.</span>
                                    </div>
                                    <p className="text-white leading-relaxed">
                                        My coworker suggested I try these guys out. I ordered three super tacos. I ordered Asada and chicken and they were both flavorful. Give them a try, pretty good! Cash Only.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-xl font-bold mb-4">Today's Location</h3>
                            <div className="rounded-lg overflow-hidden h-48 bg-gray-600">
                                <div className="w-full h-full flex items-center justify-center italic text-white">
                                    [Google Maps Embed Here]
                                </div>
                            </div>
                        </section>
                        <section>
                            <h3 className="text-[32px] font-bold mb-4">About the Business</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <Avatar img="/api/placeholder/50/50" rounded />
                                <div>
                                    <p className="font-bold">Bartholomew H.</p>
                                    <p className="text-xs text-white">Owner</p>
                                </div>
                            </div>
                            <p className="text-white text-sm leading-relaxed">
                                La Kora Taco Truck is a local favorite celebrated for its authentic Mexican street food and its commitment to traditional flavors. We are most famous for our signature house-made tortillas, which are pressed and cooked fresh to order for every guest. From our perfectly seasoned Carne Asada and Al Pastor.  We take pride in offering delicious, affordable, and honest food that keeps our community coming back for more.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Business



{/* <div className='bg-[#2D2D2D] min-h-screen'>
            <header className='flex pt-5 px-10'>
                <div className='flex justify-center flex-col mx-auto'>
                    <Image src="/assets/MunchrLogo.png" className="mx-auto" width={70} height={70} alt={"Munchr Logo"}></Image>
                    <span className="text-3xl font-extrabold text-[#C95A23]">Munchr</span>
                </div>
                <div className='flex my-auto gap-5'>
                    <Button color={"#484848"} className='bg-[#484848]'>Log in</Button>
                    <Button color={"#C95A23"} className='bg-[#C95A23]'>Sign Up</Button>
                </div>
            </header>
            <div className=''>
                <div className='bg-[#2d2d2d7e] ps-20'>
                    <h3>La Kora Taco Truck</h3>
                    <div className='flex'>
                        <Image src="/assets/rating-icon-colored-outline.png" className="" width={30} height={35} alt={"Munchr Logo"}></Image>
                        <Image src="/assets/rating-icon-colored-outline.png" className="" width={30} height={35} alt={"Munchr Logo"}></Image>
                        <Image src="/assets/rating-icon-colored-outline.png" className="" width={30} height={35} alt={"Munchr Logo"}></Image>
                        <Image src="/assets/rating-icon-colored-outline.png" className="" width={30} height={35} alt={"Munchr Logo"}></Image>
                        <Image src="/assets/rating-icon-colored-outline.png" className="" width={30} height={35} alt={"Munchr Logo"}></Image>
                        <p className='my-auto ms-5 '>4/5</p>
                    </div>
                    <p className=''>Alitalia and Arch Rd Stockton, CA 95206</p>
                    <p>(209) 594-5758</p>
                    <p>9:00 AM - 5:00 PM</p>
                </div>
                <div className='bg-[#484848] flex '>
                    <div className='flex gap-5'>
                        <Button color={"#C95A23"} className='bg-[#C95A23]'>Leave a review</Button>
                        <Button color={"#C95A23"} className='bg-[#C95A23]'>Favorite</Button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div> */}