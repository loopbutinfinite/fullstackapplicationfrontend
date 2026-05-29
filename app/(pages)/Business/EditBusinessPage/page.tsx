"use client";

import { useState } from "react";
import { BusinessModel } from "@/data/Interfaces/Interfaces";
import { editBusiness } from "@/data/lib/business-services";
import UseMyLocationButton from "@/components/UseMyLocationButton/page";
import { ReverseGeocodeResult } from "@/data/lib/geocoding-services";
import MenuItemsManager from "@/components/MenuItemsManager/page";

interface EditBusinessPanelProps {
  business: BusinessModel;
  onSave: (updatedBusiness: BusinessModel) => void;
  onClose: () => void;
  // Called when the owner adds/removes a menu item, so the public page can refresh.
  onMenuChange?: () => void;
}

type EditMode = "details" | "location" | "menu";

export default function EditBusinessPanel({
  business,
  onSave,
  onClose,
  onMenuChange,
}: EditBusinessPanelProps) {
  const [activeTab, setActiveTab] = useState<EditMode>("location");

  // Location fields
  const [streetName, setStreetName] = useState(business.streetName || "");
  const [city, setCity] = useState(business.city || "");
  const [state, setState] = useState(business.state || "");
  const [zipCode, setZipCode] = useState(String(business.zipCode || ""));

  // Details fields
  const [businessName, setBusinessName] = useState(business.businessName || "");
  const [businessHours, setBusinessHours] = useState(business.businessHours || "");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState(
    business.businessPhoneNumber || ""
  );
  const [businessDescription, setBusinessDescription] = useState(
    business.businessDescription || ""
  );

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleUseLocation = (location: ReverseGeocodeResult) => {
    setError("");
    if (location.streetName) setStreetName(location.streetName);
    if (location.city) setCity(location.city);
    if (location.state) setState(location.state);
    if (location.zipCode) setZipCode(String(location.zipCode));
    setSuccessMsg("Location detected — review the address and save.");
  };

  const handleSave = async () => {
    setError("");
    setSuccessMsg("");

    const parsedZip = Number(zipCode);
    if (Number.isNaN(parsedZip) || parsedZip === 0) {
      setError("Please enter a valid zip code.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please log in again.");
      return;
    }

    const updatedBusiness: BusinessModel = {
      ...business,
      businessName: businessName.trim(),
      businessHours: businessHours.trim(),
      businessPhoneNumber: businessPhoneNumber.trim(),
      businessDescription: businessDescription.trim(),
      streetName: streetName.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: parsedZip,
    };

    try {
      setIsSaving(true);
      await editBusiness(updatedBusiness, token);
      setSuccessMsg("Changes saved!");
      onSave(updatedBusiness);
    } catch {
      setError("Could not save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "w-full bg-[#5a5a5a] border border-[#6a6a6a] rounded-lg px-3 py-2.5 text-white placeholder-[#999] focus:outline-none focus:border-[#C95A23] focus:ring-1 focus:ring-[#C95A23] transition-colors text-sm";
  const labelClass = "block text-xs font-semibold text-[#bbb] mb-1 uppercase tracking-wide";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#2a2a2a] z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#444] bg-[#222]">
          <div>
            <h2 className="text-lg font-bold text-white">Edit Business</h2>
            <p className="text-xs text-[#aaa] mt-0.5">{business.businessName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#3a3a3a] hover:bg-[#4a4a4a] flex items-center justify-center text-[#aaa] hover:text-white transition-colors"
            aria-label="Close panel"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#444] bg-[#222]">
          <button
            onClick={() => setActiveTab("location")}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "location"
                ? "text-[#C95A23] border-b-2 border-[#C95A23]"
                : "text-[#888] hover:text-white"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Location
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "details"
                ? "text-[#C95A23] border-b-2 border-[#C95A23]"
                : "text-[#888] hover:text-white"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Details
          </button>
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "menu"
                ? "text-[#C95A23] border-b-2 border-[#C95A23]"
                : "text-[#888] hover:text-white"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/>
              <path d="M5 2v20"/>
              <path d="M19 2v20a0 0 0 0 1 0 0c-2 0-4-1-4-4V7c0-3 2-5 4-5z"/>
            </svg>
            Menu
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {activeTab === "location" && (
            <>
              <p className="text-xs text-[#999] -mt-1 mb-4">
                Update your truck's current location. The map will refresh automatically once saved.
              </p>

              <UseMyLocationButton
                onLocationResolved={handleUseLocation}
                onError={(msg) => setError(msg)}
              />

              <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#777] my-1">
                <span className="h-px flex-1 bg-[#3a3a3a]" />
                or enter manually
                <span className="h-px flex-1 bg-[#3a3a3a]" />
              </div>

              <div>
                <label className={labelClass}>Street Address</label>
                <input
                  className={inputClass}
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  placeholder="e.g. 123 Main St"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    className={inputClass}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Oakland"
                  />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input
                    className={inputClass}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. CA"
                    maxLength={2}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Zip Code</label>
                <input
                  className={inputClass}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="e.g. 94612"
                  type="number"
                />
              </div>

              <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg p-3 mt-2">
                <p className="text-xs text-[#888] leading-relaxed">
                  <span className="text-[#C95A23] font-semibold">📍 Tip:</span> Enter your truck's current address. Customers will see the updated pin on the map right away.
                </p>
              </div>
            </>
          )}

          {activeTab === "details" && (
            <>
              <p className="text-xs text-[#999] -mt-1 mb-4">
                Update your business information shown to customers.
              </p>

              <div>
                <label className={labelClass}>Business Name</label>
                <input
                  className={inputClass}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Business name"
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  className={inputClass}
                  value={businessPhoneNumber}
                  onChange={(e) => setBusinessPhoneNumber(e.target.value)}
                  placeholder="e.g. (555) 123-4567"
                  type="tel"
                />
              </div>

              <div>
                <label className={labelClass}>Hours</label>
                <input
                  className={inputClass}
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  placeholder="e.g. Mon–Fri 11AM–8PM"
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  placeholder="Tell customers about your food truck..."
                  rows={4}
                />
              </div>
            </>
          )}

          {activeTab === "menu" && (
            <>
              <p className="text-xs text-[#999] -mt-1 mb-4">
                Add or remove items on your menu. Changes save immediately.
              </p>
              {business.businessId ? (
                <MenuItemsManager
                  businessId={business.businessId}
                  onChange={onMenuChange}
                />
              ) : (
                <p className="text-[#999] text-sm">
                  Save your business first to start adding menu items.
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#444] bg-[#222] space-y-2">
          {error && (
            <p className="text-[#ff6b6b] text-xs text-center font-medium">{error}</p>
          )}
          {successMsg && (
            <p className="text-[#4ade80] text-xs text-center font-medium">{successMsg}</p>
          )}
          {activeTab !== "menu" && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-[#C95A23] hover:bg-[#b34e1f] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full text-[#888] hover:text-white text-sm py-2 transition-colors"
          >
            {activeTab === "menu" ? "Done" : "Cancel"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}