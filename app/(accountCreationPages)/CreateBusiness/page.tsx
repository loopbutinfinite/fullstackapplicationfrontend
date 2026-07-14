'use client';

import React, { useEffect, useState } from 'react';
import { TextInput, Button, Select, Textarea } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BusinessModel } from '@/data/Interfaces/Interfaces';
import { createBusiness } from '@/data/lib/business-services';
import { LoggedInUser } from '@/data/lib/user-services';

type FoodCategory = 'Chinese' | 'American' | 'Mexican';

const CreateBusiness = () => {
    const router = useRouter();
    const { user, isLoggedIn, isCheckingAuth } = useAuth();

    const [businessName, setBusinessName] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [category, setCategory] = useState<FoodCategory>('Chinese');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isCheckingAuth && !isLoggedIn) {
            router.push('/LoginUser');
        }
    }, [isCheckingAuth, isLoggedIn, router]);

    const handleCreateBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');

        if (!isLoggedIn || !user) {
            setMessage('You must be logged in to create a business.');
            router.push('/LoginUser');
            return;
        }

        if (!user.isBusinessOwner) {
            setMessage('Only business owner accounts can create a business.');
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            setMessage('Your login session could not be found. Please log in again.');
            router.push('/LoginUser');
            return;
        }

        if (!user.userId) {
            setMessage('Could not identify your account. Please log in again.');
            router.push('/LoginUser');
            return;
        }

        const parsedZipCode = Number(zipCode);

        if (Number.isNaN(parsedZipCode)) {
            setMessage('Postal code must be a number.');
            return;
        }

        const newBusiness = {
            ownerId: user.userId,
            businessName: businessName.trim(),
            businessHours: businessHours.trim(),
            businessPhoneNumber: businessPhoneNumber.trim(),
            businessDescription: businessDescription.trim(),
            category,
            streetName: streetName.trim(),
            city: city.trim(),
            state: state.trim(),
            zipCode: parsedZipCode,
        };

        try {
            setIsSubmitting(true);

            const result = await createBusiness(newBusiness, token);

            if (result.success) {
                setMessage("Business created successfully!");
                router.push("/");
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            console.error(error);
            setMessage('Something went wrong while creating the business.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-[#2D2D2D] text-white flex items-center justify-center">
                <p>Checking login status...</p>
            </div>
        );
    }

    if (isLoggedIn && user && !user.isBusinessOwner) {
        return (
            <div className="min-h-screen bg-[#2D2D2D] text-white flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold text-[#C95A23]">Access Denied</h1>
                <p>Only business owner accounts can create a business.</p>
                <Button className="bg-[#C95A23] dark:bg-[#C95A23] hover:bg-[#C95A23] dark:hover:bg-[#4a4a49]" onClick={() => router.push('/')}>
                    Go Home
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20">
            <header className="flex pt-5 px-10 bg-[#191818]">
                <div className="flex justify-center flex-col mx-auto">
                    <a href="/">
                        <img
                            src="/assets/MunchrLogo.png"
                            className="mx-auto rounded-4xl"
                            width={70}
                            height={70}
                            alt="Munchr Logo"
                        />
                        <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
                    </a>
                </div>
            </header>

            <main>
                <div className="bg-[#191818] ps-35 lg:ps-80">
                    <h2 className="py-12 text-5xl font-extralight text-neutral-100">
                        Let's Set Up Your Business!
                    </h2>

                    <nav className="flex justify-start gap-3 text-[16px] font-extralight">
                        <p className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white">
                            Create Business
                        </p>
                    </nav>
                </div>

                <div className="mx-40 lg:mx-110 p-8 bg-[#484848] text-white rounded-lg mt-15">
                    <h2 className="text-2xl font-normal border-b-2 border-[#ffffff77]">
                        Profile
                    </h2>

                    <div className="flex flex-col items-center mt-6">
                        <form onSubmit={handleCreateBusiness} className="w-full space-y-4">
                            <div>
                                <p className="mb-2 block">Business Name</p>
                                <TextInput
                                    id="businessName"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    required
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Business Hours</p>
                                <TextInput
                                    id="businessHours"
                                    value={businessHours}
                                    onChange={(e) => setBusinessHours(e.target.value)}
                                    required
                                    sizing="lg"
                                    placeholder="Example: Mon-Fri 9AM - 8PM"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Business Phone Number</p>
                                <TextInput
                                    id="businessPhoneNumber"
                                    value={businessPhoneNumber}
                                    onChange={(e) => setBusinessPhoneNumber(e.target.value)}
                                    required
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Food Category</p>
                                <Select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as FoodCategory)}
                                    required
                                    sizing="lg"
                                    className="[&_select]:bg-[#969696] [&_select]:border-none [&_select]:rounded-none [&_select]:text-white"
                                    color="gray"
                                >
                                    <option value="Chinese">Chinese</option>
                                    <option value="American">American</option>
                                    <option value="Mexican">Mexican</option>
                                </Select>
                            </div>

                            <div>
                                <p className="mb-2 block">Business Description</p>
                                <Textarea
                                    id="businessDescription"
                                    value={businessDescription}
                                    onChange={(e) => setBusinessDescription(e.target.value)}
                                    required
                                    rows={4}
                                    className="bg-[#969696] border-none rounded-none text-white placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Business State</p>
                                <TextInput
                                    id="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Business City</p>
                                <TextInput
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Business Street Name</p>
                                <TextInput
                                    id="streetName"
                                    value={streetName}
                                    onChange={(e) => setStreetName(e.target.value)}
                                    required
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            <div>
                                <p className="mb-2 block">Business Postal Code</p>
                                <TextInput
                                    id="zipCode"
                                    type="number"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    required
                                    sizing="lg"
                                    className="[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-none [&_input]:text-white [&_input]:placeholder-[#434343]"
                                    color="gray"
                                />
                            </div>

                            {message && (
                                <p className="text-center text-sm text-[#C95A23] font-semibold">
                                    {message}
                                </p>
                            )}

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    color="#C95A23"
                                    className="w-full bg-[#C95A23] h-15 border-none text-black py-1 disabled:opacity-60"
                                >
                                    <span className="text-xl font-medium">
                                        {isSubmitting ? 'Creating...' : 'Create Business'}
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateBusiness;