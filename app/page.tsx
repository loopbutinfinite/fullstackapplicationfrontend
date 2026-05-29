"use client";

import { Button, TextInput, Dropdown, Card, Badge, DropdownItem, Avatar } from 'flowbite-react';
import Image from "next/image";
import MapComponent from '@/components/MapBox/MapComponent';
import { useEffect, useState, useMemo } from "react";
import { getAllBusinesses } from "@/data/lib//business-services";
import { BusinessModel, ReviewModel } from '@/data/Interfaces/Interfaces';
import { getReviewsByBusinessId } from '@/data/lib/review-services';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import RatingStars from './components/StarRatings/page';

export default function Home() {
  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchEntry, setSearchEntry] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "reviewScore">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [reviewScores, setReviewScores] = useState<Record<number, number>>({});
  const [reviewCounts, setReviewCounts] = useState<Record<number, number>>({});

  const { isLoggedIn, isCheckingAuth } = useAuth();

  const getCategoryImage = (category: string) => {
    switch (category.toLowerCase()) {
      case "american":
      case "american food":
        return "/assets/AmericanFoodStockImage.jpg";

      case "chinese":
      case "chinese food":
        return "/assets/ChineseFoodStockImage.jpg";

      case "mexican":
      case "mexican food":
        return "/assets/mexican-food-stock-image.jpg";

      case "all":
      default:
        return "/assets/food-truck-bg.jpg";
    }
  };

  const calculateAverageRating = (reviews: ReviewModel[]): number => {
    if (!reviews.length) return 0;

    const total = reviews.reduce((sum, review) => sum + review.reviewScore, 0);
    return Math.ceil(total / reviews.length);
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      const data = await getAllBusinesses();

      setBusinesses(data);

      const reviewData = await Promise.all(
        data.map(async (business: BusinessModel) => {
          const reviews: ReviewModel[] = await getReviewsByBusinessId(
            business.businessId
          );

          return {
            businessId: business.businessId,
            averageRating: calculateAverageRating(reviews),
            reviewCount: reviews.length,
          };
        })
      );

      const scores: Record<number, number> = {};
      const counts: Record<number, number> = {};

      reviewData.forEach((item) => {
        scores[item.businessId] = item.averageRating;
        counts[item.businessId] = item.reviewCount;
      });

      setReviewScores(scores);
      setReviewCounts(counts);
    };

    fetchBusinesses();
  }, []);

  const getBusinessReviewScore = (business: BusinessModel) => {
    return reviewScores[business.businessId] ?? 0;
  };

  const filteredBusinesses = useMemo(() => {
    return selectedCategory === "All"
      ? businesses
      : businesses.filter(
        (business) =>
          business.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
  }, [businesses, selectedCategory]);

  const searchedBusinesses = useMemo(() => {
    const searched = filteredBusinesses.filter((business) =>
      business.businessName.toLowerCase().includes(searchEntry.toLowerCase())
    );

    return [...searched].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.businessName.localeCompare(b.businessName);
      }

      if (sortBy === "reviewScore") {
        comparison = getBusinessReviewScore(a) - getBusinessReviewScore(b);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredBusinesses, searchEntry, sortBy, sortOrder, reviewScores]);

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
    <div className="min-h-screen grid bg-[#2D2D2D] p-4 antialiased">
      <nav className="flex items-center justify-between mb-6 gap-4 px-6 flex-col md:flex-row">
        <div className="grid items-center gap-2 order-1">
          <Image src="/assets/MunchrLogo.png" className="mx-auto" width={70} height={70} alt={"Munchr Logo"}></Image>
          <span className="text-3xl font-extrabold text-[#C95A23]">Munchr</span>
        </div>
        <div className="w-full md:max-w-xl order-3 md:order-2">
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
        <div className="flex gap-2 items-center order-2 md:order-3">
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
      <div className="grid grid-cols-1 pb-10 lg:grid-cols-12 gap-6 max-w-screen min-h-[100vh] mx-5">
        <div className="lg:col-span-7 bg-[#484848] rounded-2xl shadow-xl p-6">
          <div className="flex items-center mb-8">
            <div className="relative flex items-start w-full min-h-[80px]">
              <div className="absolute left-0 top-0">
                <Dropdown label="Category" color="#2D2D2D" size="md" className="bg-[#2D2D2D] md:text-xl text-sm px-2 md:px-6">
                  <DropdownItem onClick={() => setSelectedCategory("All")} className="bg-[#C95A23] font-bold text-lg dark:bg-[#C95A23]">
                    All
                  </DropdownItem>
                  <DropdownItem onClick={() => setSelectedCategory("Mexican")} className="bg-[#C95A23] font-bold text-lg">
                    Mexican
                  </DropdownItem>
                  <DropdownItem onClick={() => setSelectedCategory("Chinese")} className="bg-[#C95A23] font-bold text-lg">
                    Chinese
                  </DropdownItem>
                  <DropdownItem onClick={() => setSelectedCategory("American")} className="bg-[#C95A23] font-bold text-lg">
                    American
                  </DropdownItem>
                </Dropdown>
              </div>
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <Badge size="xl" color="#C95A23" className="justify-center md:px-6 px-1.5 py-2 bg-[#C95A23] text-white border-none rounded-lg md:text-[24px] sm:text-[16px]">
                  {selectedCategory}
                </Badge>
              </div>
              <div className="absolute right-0 top-0 flex flex-col items-end gap-3">
                <Dropdown
                  label={sortBy === "name" ? "Sort: Name" : "Sort: Review Score"}
                  color="#2D2D2D"
                  size="md"
                  className="bg-[#2D2D2D] md:text-xl text-sm px-2 md:px-6"
                >
                  <DropdownItem onClick={() => setSortBy("name")} className="bg-[#C95A23] font-bold text-lg">
                    Name
                  </DropdownItem>
                  <DropdownItem onClick={() => setSortBy("reviewScore")} className="bg-[#C95A23] font-bold text-lg">
                    Review Score
                  </DropdownItem>
                </Dropdown>
                <Dropdown
                  label={sortOrder === "asc" ? "Order: Ascending" : "Order: Descending"}
                  color="#2D2D2D"
                  size="md"
                  className="bg-[#2D2D2D] md:text-xl text-sm px-2 md:px-6"
                >
                  <DropdownItem onClick={() => setSortOrder("asc")} className="bg-[#C95A23] font-bold text-lg">
                    Ascending
                  </DropdownItem>
                  <DropdownItem onClick={() => setSortOrder("desc")} className="bg-[#C95A23] font-bold text-lg">
                    Descending
                  </DropdownItem>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto bg-[#484848] custom-scrollbar order-2">
            {searchedBusinesses.map((business) => {
              const reviewScore = getBusinessReviewScore(business);
              const reviewCount = reviewCounts[business.businessId] ?? 0;
              return (
                <Link
                  key={business.businessId}
                  href={`/Business/${business.businessId}`}
                  className="block"
                >
                  <Card
                    id={business.businessId.toLocaleString()}
                    color="#2D2D2D"
                    className="dark:bg-[#2D2D2D] bg-[#2D2D2D] border-none rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-200"
                  >
                    <div className="bg-[#2D2D2D] rounded-md overflow-hidden">
                      <div className="w-full h-40 rounded-sm overflow-hidden mb-4">
                        <Image
                          src={getCategoryImage(selectedCategory)}
                          width={500}
                          height={300}
                          alt={business.businessName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-2xl font-bold tracking-tight text-white">
                            {highlightMatch(business.businessName, searchEntry)}
                          </h5>
                          <div className="flex items-center gap-2 mt-2">
                            <RatingStars rating={reviewScore} size={20} />
                            <span className="text-sm font-semibold text-gray-300">
                              {reviewCount > 0
                                ? `${reviewScore.toLocaleString()}/5 (${reviewCount} ${reviewCount === 1 ? "review" : "reviews"
                                })`
                                : "No reviews yet"}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-white text-sm leading-relaxed">
                            {business.streetName}, {business.city}, {business.state}{" "}
                            {business.zipCode}
                          </p>
                          <p className="text-white text-sm">
                            {business.businessPhoneNumber}
                          </p>
                          <p className="text-white text-sm">
                            {business.businessHours}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-5 relative md:h-[300px] h-[300px] lg:h-full w-full rounded-2xl overflow-hidden shadow-2xl -order-1 lg:order-2">
          <MapComponent businesses={searchedBusinesses} />
        </div>
      </div>
    </div>
  );
}