"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Bookmark } from "lucide-react";
import { FavoritesModel } from "@/data/Interfaces/Interfaces";
import {
  AddFavorite,
  DeleteFavorite,
  GetFavoritesByUserId,
} from "@/data/lib/favorite-services";
import { useAuth } from "@/context/AuthContext";

type FavoriteButtonProps = {
  businessId: number;
};

const FavoriteButton = ({ businessId }: FavoriteButtonProps) => {
  const { user, isLoggedIn, isCheckingAuth } = useAuth();

  const [favorite, setFavorite] = useState<FavoritesModel | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("isLoggedIn:", isLoggedIn);
  console.log("user:", user);
  console.log("userId:", user?.userId);
  console.log("businessId:", businessId);
  console.log("token:", localStorage.getItem("token"));

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  const loadFavoriteStatus = useCallback(async () => {
    if (!isLoggedIn || !user) {
      setFavorite(null);
      return;
    }

    if (!user.userId) {
      console.log("Missing userId from AuthContext user:", user);
      setFavorite(null);
      return;
    }

    const token = getToken();

    if (!token) {
      console.log("Missing token from localStorage");
      setFavorite(null);
      return;
    }

    try {
      const userFavorites: FavoritesModel[] = await GetFavoritesByUserId(
        token,
        user.userId
      );

      const existingFavorite = userFavorites.find(
        (fav) => fav.businessId === businessId
      );

      setFavorite(existingFavorite || null);
    } catch (error) {
      console.error("Could not load favorite status:", error);
      setFavorite(null);
    }
  }, [businessId, isLoggedIn, user]);

  useEffect(() => {
    loadFavoriteStatus();
  }, [loadFavoriteStatus]);

  const handleFavoriteClick = async () => {
    setMessage("");

    if (!isLoggedIn || !user?.userId) {
      setMessage("Please log in or create an account to favorite this business.");
      return;
    }

    const token = getToken();

    if (!token) {
      setMessage("Please log in or create an account to favorite this business.");
      return;
    }

    setIsLoading(true);

    const newFavorite: FavoritesModel = {
      id: 0,
      userId: user.userId,
      businessId: businessId,
    };

    const success = await AddFavorite(newFavorite, token);

    if (success) {
      setMessage("Business added to your favorites.");
      console.log("Business added to favorites:" + success)
      await loadFavoriteStatus();
    } else {
      setMessage("Could not add this business to your favorites.");
    }

    setIsLoading(false);
  };

  const handleUnfavoriteClick = async () => {
    setMessage("");

    if (!isLoggedIn || !user?.userId) {
      setMessage("Please log in or create an account to unfavorite this business.");
      return;
    }

    const token = getToken();

    if (!token) {
      setMessage("Please log in or create an account to unfavorite this business.");
      return;
    }

    if (!favorite) {
      setMessage("This business is not currently in your favorites.");
      return;
    }

    setIsLoading(true);

    const success = await DeleteFavorite(favorite, token);

    if (success) {
      setFavorite(null);
      console.log("Business removed from favorites" + success)
      setMessage("Business removed from your favorites.");
    } else {
      setMessage("Could not remove this business from your favorites.");
    }

    setIsLoading(false);
  };

  if (isCheckingAuth) {
    return (
      <Button color="#C95A23" className="bg-[#C95A23]" disabled>
        Checking...
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {favorite ? (
        <Button
          color="#C95A23"
          className="bg-[#C95A23]"
          onClick={handleUnfavoriteClick}
          disabled={isLoading}
        >
          <Bookmark strokeWidth="1px" fill="white" className="mr-2" />
          {isLoading ? "Removing..." : "Unfavorite"}
        </Button>
      ) : (
        <Button
          color="#C95A23"
          className="bg-[#C95A23]"
          onClick={handleFavoriteClick}
          disabled={isLoading}
        >
          <Bookmark strokeWidth="1px" className="mr-2" />
          {isLoading ? "Adding..." : "Favorite"}
        </Button>
      )}

      {message && (
        <p className="text-sm text-white bg-black/30 px-3 py-2 rounded-md">
          {message}
        </p>
      )}
    </div>
  );
};

export default FavoriteButton;