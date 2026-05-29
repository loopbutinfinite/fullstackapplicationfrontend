"use client";
 
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, TextInput, Select, Textarea, Avatar } from "flowbite-react";
import { Store, MapPin, Phone, Clock, FileText, Tag, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  editBusiness,
  createBusiness,
  getBusinessByOwnerId,
} from "@/data/lib/business-services";
import { BusinessModel, CreateBusinessRequest } from "@/data/Interfaces/Interfaces";
import UseMyLocationButton from "@/components/UseMyLocationButton/page";
import { ReverseGeocodeResult } from "@/data/lib/geocoding-services";
import MenuItemsManager from "@/components/MenuItemsManager/page";

type FoodCategory = "Chinese" | "American" | "Mexican" | "Indian" | "Italian" | "Korean" | "Other";
 
const CATEGORIES: FoodCategory[] = ["American", "Chinese", "Indian", "Italian", "Korean", "Mexican", "Other"];
 
const inputClass =
  "[&_input]:bg-[#969696] [&_input]:border-none [&_input]:rounded-lg [&_input]:text-white [&_input]:placeholder-[#555]";
const textareaClass =
  "bg-[#969696] border-none rounded-lg text-white placeholder-[#555] focus:ring-1 focus:ring-[#C95A23] w-full p-3 resize-none";
const selectClass =
  "[&_select]:bg-[#969696] [&_select]:border-none [&_select]:rounded-lg [&_select]:text-white";
const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
 
// ─── Shared field-row component ────────────────────────────────────────────
function FieldIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa] pointer-events-none">
      <Icon size={15} />
    </span>
  );
}
 
// ─── Main Page ──────────────────────────────────────────────────────────────
const MyBusinessPage = () => {
  const router = useRouter();
  const { user, isLoggedIn, isCheckingAuth } = useAuth();
 
  const [isLoadingBusiness, setIsLoadingBusiness] = useState(true);
  const [existingBusiness, setExistingBusiness] = useState<BusinessModel | null>(null);
 
  // Shared form state (used for both edit & create)
  const [businessName, setBusinessName] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [category, setCategory] = useState<FoodCategory>("American");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
 
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [justSaved, setJustSaved] = useState(false);
 
  // ── Auth guard ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isCheckingAuth && !isLoggedIn) {
      router.push("/LoginUser");
    }
  }, [isCheckingAuth, isLoggedIn, router]);
 
  // ── Load existing business if owner has one ────────────────────────────
  useEffect(() => {
    if (!user || isCheckingAuth) return;
 
    if (!user.isBusinessOwner || !user.userId) {
      setIsLoadingBusiness(false);
      return;
    }

    const fetchBusiness = async () => {
      try {
        // Look up this owner's business directly from the backend by their userId.
        const biz: BusinessModel | null = await getBusinessByOwnerId(user.userId);
        if (biz && biz.businessId) {
          setExistingBusiness(biz);
          // Pre-fill form with current values
          setBusinessName(biz.businessName ?? "");
          setBusinessHours(biz.businessHours ?? "");
          setBusinessPhoneNumber(biz.businessPhoneNumber ?? "");
          setBusinessDescription(biz.businessDescription ?? "");
          setCategory((biz.category as FoodCategory) ?? "American");
          setStreetName(biz.streetName ?? "");
          setCity(biz.city ?? "");
          setState(biz.state ?? "");
          setZipCode(String(biz.zipCode ?? ""));
        }
      } catch (err) {
        console.error("Could not load business:", err);
      } finally {
        setIsLoadingBusiness(false);
      }
    };
 
    fetchBusiness();
  }, [user, isCheckingAuth]);
 
  // ── Fill address fields from the device's current location ─────────────
  const handleUseLocation = (location: ReverseGeocodeResult) => {
    setErrorMessage("");
    if (location.streetName) setStreetName(location.streetName);
    if (location.city) setCity(location.city);
    if (location.state) setState(location.state);
    if (location.zipCode) setZipCode(String(location.zipCode));
    setSuccessMessage("Location detected — review the address and save.");
  };

  // ── Validate shared fields ─────────────────────────────────────────────
  const validate = (): string | null => {
    if (!businessName.trim()) return "Business name is required.";
    if (!businessHours.trim()) return "Business hours are required.";
    if (!businessPhoneNumber.trim()) return "Phone number is required.";
    if (!streetName.trim()) return "Street address is required.";
    if (!city.trim()) return "City is required.";
    if (!state.trim()) return "State is required.";
    const zip = Number(zipCode);
    if (!zipCode || Number.isNaN(zip) || zip === 0) return "A valid zip code is required.";
    return null;
  };
 
  // ── Save edits to existing business ────────────────────────────────────
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
 
    const validationError = validate();
    if (validationError) { setErrorMessage(validationError); return; }
 
    const token = localStorage.getItem("token");
    if (!token) { setErrorMessage("Session expired. Please log in again."); return; }
    if (!existingBusiness) return;
 
    const updated: BusinessModel = {
      ...existingBusiness,
      businessName: businessName.trim(),
      businessHours: businessHours.trim(),
      businessPhoneNumber: businessPhoneNumber.trim(),
      businessDescription: businessDescription.trim(),
      category,
      streetName: streetName.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: Number(zipCode),
    };
 
    try {
      setIsSaving(true);
      const result = await editBusiness(updated, token);
      if (!result.success) {
        setErrorMessage(result.message ?? "Could not save changes. Please try again.");
        return;
      }
      setExistingBusiness(updated);
      setSuccessMessage("Business details updated successfully!");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 3000);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
 
  // ── Create a new business ───────────────────────────────────────────────
  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
 
    const validationError = validate();
    if (validationError) { setErrorMessage(validationError); return; }
 
    const token = localStorage.getItem("token");
    if (!token) { setErrorMessage("Session expired. Please log in again."); return; }

    if (!user?.userId) { setErrorMessage("Could not identify your account. Please log in again."); return; }

    const newBusiness: CreateBusinessRequest = {
      ownerId: user.userId,
      businessName: businessName.trim(),
      businessHours: businessHours.trim(),
      businessPhoneNumber: businessPhoneNumber.trim(),
      businessDescription: businessDescription.trim(),
      category,
      streetName: streetName.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: Number(zipCode),
    };

    try {
      setIsSaving(true);
      const result = await createBusiness(newBusiness, token);
      if (!result.success) {
        setErrorMessage(result.message ?? "Could not create business. Please try again.");
        return;
      }

      setSuccessMessage("Business registered successfully! Redirecting to your business page...");
      setTimeout(() => {
        if (result.data?.businessId) {
          router.push(`/Business/${result.data.businessId}`);
        } else {
          router.push("/");
        }
      }, 1800);
    } catch {
      setErrorMessage("Something went wrong while creating the business.");
    } finally {
      setIsSaving(false);
    }
  };
 
  // ── Guards ─────────────────────────────────────────────────────────────
  if (isCheckingAuth || isLoadingBusiness) {
    return (
      <div className="min-h-screen bg-[#2D2D2D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#C95A23] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#aaa] text-sm">Loading your business...</p>
        </div>
      </div>
    );
  }
 
  if (!isLoggedIn || !user) return null;
 
  // Non-business accounts shouldn't reach this page — redirect them
  if (!user.isBusinessOwner) {
    return (
      <div className="min-h-screen bg-[#2D2D2D] flex flex-col items-center justify-center gap-6 text-white">
        <Store size={48} className="text-[#C95A23]" />
        <h1 className="text-3xl font-bold">Business Owners Only</h1>
        <p className="text-[#aaa] text-center max-w-sm">
          This page is for business owner accounts. Your account is registered as a customer.
        </p>
        <Button className="bg-[#C95A23] dark:bg-[#C95A23]" onClick={() => router.push("/UserProfilePage")}>
          Go to My Account
        </Button>
      </div>
    );
  }
 
  const hasRegisteredBusiness = !!existingBusiness;
  const pageTitle = hasRegisteredBusiness ? "My Business" : "Register Your Business";
  const navTitle = hasRegisteredBusiness ? "My Business" : "Register Business";
 
  // ── Shared form body ────────────────────────────────────────────────────
  const formBody = (
    <div className="space-y-5">
      {/* Business Info section */}
      <div className="pb-2 border-b border-[#ffffff22]">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C95A23] mb-4">Business Info</p>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Business Name</label>
            <div className="relative">
              <FieldIcon icon={Store} />
              <TextInput
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                sizing="lg"
                placeholder="e.g. Seoul Street Eats"
                className={`${inputClass} [&_input]:pl-9`}
              />
            </div>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Phone Number</label>
              <div className="relative">
                <FieldIcon icon={Phone} />
                <TextInput
                  id="businessPhoneNumber"
                  value={businessPhoneNumber}
                  onChange={(e) => setBusinessPhoneNumber(e.target.value)}
                  required
                  sizing="lg"
                  type="tel"
                  placeholder="(555) 123-4567"
                  className={`${inputClass} [&_input]:pl-9`}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Business Hours</label>
              <div className="relative">
                <FieldIcon icon={Clock} />
                <TextInput
                  id="businessHours"
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  required
                  sizing="lg"
                  placeholder="Mon–Fri 11AM–8PM"
                  className={`${inputClass} [&_input]:pl-9`}
                />
              </div>
            </div>
          </div>
 
          <div>
            <label className={labelClass}>Food Category</label>
            <div className="relative">
              <FieldIcon icon={Tag} />
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as FoodCategory)}
                sizing="lg"
                className={`${selectClass} [&_select]:pl-9`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
          </div>
 
          <div>
            <label className={labelClass}>About Your Business</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-[#aaa] pointer-events-none">
                <FileText size={15} />
              </span>
              <textarea
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                rows={4}
                placeholder="Tell customers what makes your food truck special..."
                className={`${textareaClass} pl-9`}
              />
            </div>
          </div>
        </div>
      </div>
 
      {/* Location section */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C95A23] mb-4">Current Location</p>
        <div className="space-y-4">
          <UseMyLocationButton
            onLocationResolved={handleUseLocation}
            onError={(msg) => setErrorMessage(msg)}
          />
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-[#888]">
            <span className="h-px flex-1 bg-[#ffffff22]" />
            or enter manually
            <span className="h-px flex-1 bg-[#ffffff22]" />
          </div>
          <div>
            <label className={labelClass}>Street Address</label>
            <div className="relative">
              <FieldIcon icon={MapPin} />
              <TextInput
                id="streetName"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                required
                sizing="lg"
                placeholder="123 Main St"
                className={`${inputClass} [&_input]:pl-9`}
              />
            </div>
          </div>
 
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 sm:col-span-1">
              <label className={labelClass}>City</label>
              <TextInput
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                sizing="lg"
                placeholder="Oakland"
                className={inputClass}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <label className={labelClass}>State</label>
              <TextInput
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                sizing="lg"
                placeholder="CA"
                maxLength={2}
                className={inputClass}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <label className={labelClass}>Zip Code</label>
              <TextInput
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                sizing="lg"
                type="number"
                placeholder="94612"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#2D2D2D] font-sans text-neutral-200 pb-20 overflow-x-hidden">
      {/* Header */}
      <header className="flex pt-5 px-10 bg-[#191818]">
        <div className="flex justify-center flex-col mx-auto">
          <Link href="/">
            <Image
              src="/assets/MunchrLogo.png"
              className="mx-auto"
              width={70}
              height={70}
              alt="Munchr Logo"
            />
            <h1 className="text-3xl font-extrabold text-[#C95A23]">Munchr</h1>
          </Link>
        </div>
      </header>
 
      <main>
        {/* Hero banner + nav */}
        <div className="bg-[#191818] ps-35 lg:ps-70 w-full">
          <h2 className="py-12 text-5xl font-extralight text-neutral-100">
            Hello, {user.username}
          </h2>
 
          <nav className="flex justify-start gap-3 text-[16px] font-extralight flex-wrap pb-0">
            <Link
              href="/UserProfilePage"
              className="hover:border-b-[#C95A23] border-b-[#3A3A3A] border-b-2 pb-1"
            >
              My Account
            </Link>
            <Link
              href="/ChangePassword"
              className="hover:border-b-[#C95A23] border-b-[#3A3A3A] border-b-2 pb-1"
            >
              Change Password
            </Link>
            {/* Business tab — active */}
            <Link
              href="/MyBusiness"
              className="border-b-2 border-[#C95A23] pb-1 text-neutral-50 hover:text-white"
            >
              {navTitle}
            </Link>
          </nav>
        </div>
 
        {/* ── EDIT EXISTING BUSINESS ─────────────────────────────────────── */}
        {hasRegisteredBusiness ? (
          <>
          <div className="mx-8 md:mx-20 lg:mx-40 xl:mx-56 p-8 bg-[#484848] text-white rounded-lg mt-12">
            <div className="flex items-center justify-between border-b-2 border-[#ffffff22] pb-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Business Details</h2>
                <p className="text-sm text-[#aaa] mt-1">
                  Update your info — changes reflect live on your public page.
                </p>
              </div>
              {existingBusiness?.businessId && (
                <Link
                  href={`/Business/${existingBusiness.businessId}`}
                  className="text-xs text-[#C95A23] hover:text-[#e06928] font-semibold flex items-center gap-1 transition-colors shrink-0"
                >
                  View public page →
                </Link>
              )}
            </div>
 
            {/* Avatar + name row */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-[#3a3a3a] rounded-lg">
              <Avatar rounded size="lg" />
              <div>
                <p className="font-bold text-lg">{existingBusiness.businessName}</p>
                <p className="text-xs text-[#aaa]">
                  {existingBusiness.category} · {existingBusiness.city}, {existingBusiness.state}
                </p>
              </div>
            </div>
 
            <form onSubmit={handleSaveEdit} className="space-y-6">
              {formBody}
 
              {errorMessage && (
                <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={14} /> {successMessage}
                </p>
              )}
 
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  color="#C95A23"
                  className={`w-full h-14 border-none text-white py-1 transition-all disabled:opacity-60 ${
                    justSaved ? "bg-green-600 dark:bg-green-600" : "bg-[#C95A23] dark:bg-[#C95A23]"
                  }`}
                >
                  <span className="text-lg font-semibold flex items-center gap-2">
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : justSaved ? (
                      <>
                        <CheckCircle size={18} />
                        Saved!
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </div>

          {existingBusiness?.businessId && (
            <div className="mx-8 md:mx-20 lg:mx-40 xl:mx-56 p-8 bg-[#484848] text-white rounded-lg mt-8">
              <MenuItemsManager businessId={existingBusiness.businessId} />
            </div>
          )}
          </>
        ) : (
          /* ── REGISTER NEW BUSINESS ─────────────────────────────────────── */
          <div className="mx-8 md:mx-20 lg:mx-40 xl:mx-56 p-8 bg-[#484848] text-white rounded-lg mt-12">
            {/* Empty state callout */}
            <div className="flex flex-col items-center text-center py-6 mb-8 border-b border-[#ffffff22]">
              <div className="w-16 h-16 rounded-full bg-[#3a3a3a] flex items-center justify-center mb-4">
                <Store size={32} className="text-[#C95A23]" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Register Your Food Truck</h2>
              <p className="text-[#aaa] text-sm max-w-sm leading-relaxed">
                You have a business owner account but haven't registered your truck yet.
                Fill out the details below to get on the map!
              </p>
            </div>
 
            <form onSubmit={handleCreateBusiness} className="space-y-6">
              {formBody}
 
              {errorMessage && (
                <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={14} /> {successMessage}
                </p>
              )}
 
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  color="#C95A23"
                  className="w-full bg-[#C95A23] dark:bg-[#C95A23] h-14 border-none text-white py-1 disabled:opacity-60"
                >
                  <span className="text-lg font-semibold flex items-center gap-2">
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Store size={18} />
                        Register Business
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
 
export default MyBusinessPage;
