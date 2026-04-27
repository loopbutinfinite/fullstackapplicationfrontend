'use client';

import { Button, TextInput, Dropdown, Card, Badge, DropdownItem, Avatar } from 'flowbite-react';
import Image from "next/image";
import MapComponent from '@/components/MapBox/MapComponent';
import { useEffect, useState } from "react";
import { getAllBusinesses } from "@/data/lib//business-services";
import { BusinessModel } from '@/data/Interfaces/Interfaces';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchEntry, setSearchEntry] = useState("");
  const [searchError, setSearchError] = useState(false);

  const { isLoggedIn, isCheckingAuth } = useAuth();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const data = await getAllBusinesses();

      setBusinesses(data);
    };

    fetchBusinesses();
  }, []);

  const filteredBusinesses =
    selectedCategory === "All"
      ? businesses
      : businesses.filter(
        (business) =>
          business.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const searchedBusinesses = filteredBusinesses.filter((business) =>
    business.businessName.toLowerCase().includes(searchEntry.toLowerCase())
  );

  useEffect(() => {
    if (searchEntry.trim() === "") {
      setSearchError(false);
      return;
    }

    if (searchedBusinesses.length === 0) {
      setSearchError(true);
    } else {
      setSearchError(false);
    }
  }, [searchEntry, searchedBusinesses]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-[#C95A23] text-white px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#2D2D2D] p-4 antialiased">
      <nav className="flex items-center justify-between mb-6 gap-4 px-6">
        <div className="grid items-center gap-2">
          <Image src="/assets/MunchrLogo.png" className="mx-auto" width={70} height={70} alt={"Munchr Logo"}></Image>
          <span className="text-3xl font-extrabold text-[#C95A23]">Munchr</span>
        </div>
        <div className="w-full md:max-w-xl">
          <TextInput
            type="text"
            placeholder="Search"
            value={searchEntry}
            onChange={(e) => {
              setSearchEntry(e.target.value);
              setSearchError(false);
            }}
            color={searchError ? "failure" : "gray"}
            className="rounded-[20px] [&_input]:bg-[#484848] text-2xl"
          />
          {searchError && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              No business found. Please try again.
            </p>
          )}
        </div>
        <div className="flex gap-2 items-center">
          {!isCheckingAuth && (
            isLoggedIn ? (
              <Link href="/UserProfilePage">
                <Avatar rounded />
              </Link>
            ) : (
              <>
                <Link href="/LoginUser">
                  <Button color="gray" className="bg-[#484848]">
                    Log in
                  </Button>
                </Link>
                <Link href="/CreateUserAccount">
                  <Button color="warning" className="bg-[#C95A23]">
                    Sign Up
                  </Button>
                </Link>
              </>
            )
          )}
        </div>
      </nav>
      <div className="grid grid-cols-1 pb-10 lg:grid-cols-12 gap-6 max-w-screen min-h-[90vh] mx-5">
        <div className="lg:col-span-7 bg-[#484848] rounded-2xl  shadow-xl p-6">
          <div className="flex items-center gap-4 mb-8">
            <Dropdown
              label="Category"
              color="#2D2D2D"
              size="md"
              className="bg-[#2D2D2D] text-xl"
            >
              <DropdownItem onClick={() => setSelectedCategory("All")} className='bg-[#C95A23] font-bold text-lg'>
                All
              </DropdownItem>
              <DropdownItem onClick={() => setSelectedCategory("Mexican")} className='bg-[#C95A23] font-bold text-lg'>
                Mexican
              </DropdownItem>
              <DropdownItem onClick={() => setSelectedCategory("Chinese")} className='bg-[#C95A23] font-bold text-lg'>
                Chinese
              </DropdownItem>
              <DropdownItem onClick={() => setSelectedCategory("American")} className='bg-[#C95A23] fnot-bold text-lg'>
                American
              </DropdownItem>
            </Dropdown>
            <Badge size="xl" color='#C95A23' className="justify-center px-6 py-2 bg-[#C95A23] text-white border-none rounded-lg text-[32px] mx-auto">
              {selectedCategory}
            </Badge>
          </div>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 bg-[#484848] custom-scrollbar">
            {searchedBusinesses.map((business, index) => (
              <Link key={business.businessId} href={`/Business/${business.businessId}`} className="block">
                <Card key={index} id={business.businessId.toLocaleString()} color='#2D2D2D' className="dark:bg-[#2D2D2D] border-none">
                  <div className="flex flex-col sm:flex-row gap-5 bg-[#2D2D2D]">
                    <div className="w-full sm:w-32 h-32 rounded-lg flex items-center justify-center">
                      <Image src="/assets/mexican-food-stock-image.jpg" className="mx-auto" width={180} height={180} alt={"Munchr Logo"}></Image>
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h5 className="text-4xl font-bold tracking-tight text-white">
                          {highlightMatch(business.businessName, searchEntry)}
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
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 relative h-[800px] lg:h-full w-full rounded-2xl overflow-hidden shadow-2xl">
          <MapComponent businesses={searchedBusinesses} />
        </div>
      </div>
    </div>
  );
}
