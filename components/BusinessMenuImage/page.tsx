"use client";

import { useState } from "react";
import { Button, FileInput, Label } from "flowbite-react";
import { uploadBusinessMenuImage } from "@/data/lib/business-services";
import { useAuth } from "@/context/AuthContext";

type BusinessMenuImageProps = {
  businessId: number;
  businessName: string;
  menuImageUrl?: string | null;
  ownerUsername?: string;
};

const BusinessMenuImage = ({
  businessId,
  businessName,
  menuImageUrl,
  ownerUsername,
}: BusinessMenuImageProps) => {
  const { user, isLoggedIn, isCheckingAuth } = useAuth();

  const [currentMenuImage, setCurrentMenuImage] = useState(menuImageUrl ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const isBusinessOwner =
    !isCheckingAuth &&
    isLoggedIn &&
    user?.username === ownerUsername;

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select an image first.");
      return;
    }

    try {
      setIsUploading(true);
      setMessage("");

      const uploadedImageUrl = await uploadBusinessMenuImage(
        businessId,
        selectedFile
      );

      setCurrentMenuImage(uploadedImageUrl);
      setSelectedFile(null);
      setMessage("Menu image uploaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage("There was an error uploading the menu image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section>
      <h2 className="text-[28px] lg:text-[32px] text-white font-bold mb-4">
        Menu
      </h2>

      {currentMenuImage ? (
        <div className="rounded-lg overflow-hidden">
          <img
            src={currentMenuImage}
            alt={`Menu for ${businessName}`}
            className="w-full md:w-[75%] h-auto rounded-lg"
          />
        </div>
      ) : (
        <div className="bg-[#2D2D2D] border border-gray-600 rounded-lg p-6 w-full md:w-[75%]">
          <p className="text-white text-lg">
            This business does not have a menu yet. Please come back shortly.
          </p>
        </div>
      )}

      {isBusinessOwner && (
        <div className="mt-6 bg-[#2D2D2D] border border-gray-600 rounded-lg p-4 w-full md:w-[75%]">
          <Label
            htmlFor="menuImage"
            className="text-white mb-2 block"
          >
            Add or update menu image
          </Label>

          <FileInput
            id="menuImage"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setSelectedFile(file);
            }}
          />

          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="bg-[#C95A23] mt-4"
            color="#C95A23"
          >
            {isUploading ? "Uploading..." : "Upload Menu Image"}
          </Button>

          {message && <p className="text-sm text-white mt-3">{message}</p>}
        </div>
      )}
    </section>
  );
};

export default BusinessMenuImage;