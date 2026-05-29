"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import HeaderAuthButtons from "@/app/components/HeaderAuthButtons/page";
import RatingStars from "@/app/components/StarRatings/page";
import BusinessMenu from "@/components/BusinessMenu/page";
import SingleBusinessMapComponent from "@/components/MapBox/SIngleBusinessMapComponent";
import { BusinessModel, ReviewModel } from "@/data/Interfaces/Interfaces";
import { getBusinessById } from "@/data/lib/business-services";
import { getReviewsByBusinessId } from "@/data/lib/review-services";
import { getUserById } from "@/data/lib/user-services";
import { useAuth } from "@/context/AuthContext";
import { Button, Avatar } from "flowbite-react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EditBusinessPanel from "../EditBusinessPage/page";

const Business = () => {
  const params = useParams();
  const businessId = Number(params.businessId);
  const { user, isLoggedIn, isCheckingAuth } = useAuth();

  const [businessData, setBusinessData] = useState<BusinessModel | null>(null);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  // Bumped when the owner edits the menu so the public list re-fetches.
  const [menuRefreshKey, setMenuRefreshKey] = useState(0);

  // Determine ownership from the backend-provided OwnerId on the business
  // record, compared against the logged-in user's id. No more localStorage.
  // Number() guards against either id arriving as a string from JSON.
  const isOwner =
    isLoggedIn &&
    !isCheckingAuth &&
    user?.isBusinessOwner === true &&
    businessData?.ownerId != null &&
    user?.userId != null &&
    Number(businessData.ownerId) === Number(user.userId);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [biz, revs] = await Promise.all([
          getBusinessById(businessId),
          getReviewsByBusinessId(businessId),
        ]);
        setBusinessData(biz);
        setReviews(revs);
      } catch (err) {
        console.error("Failed to load business data", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (businessId) fetchData();
  }, [businessId]);

  // Look up the owner's name once we know which user owns this business.
  useEffect(() => {
    const ownerId = businessData?.ownerId;
    if (ownerId == null) {
      setOwnerName("");
      return;
    }

    let cancelled = false;
    const fetchOwner = async () => {
      try {
        const owner = await getUserById(Number(ownerId));
        if (cancelled || !owner) return;
        const fullName = `${owner.firstName ?? ""} ${owner.lastName ?? ""}`.trim();
        setOwnerName(fullName || owner.username || "");
      } catch (err) {
        console.error("Failed to load business owner", err);
      }
    };

    fetchOwner();
    return () => {
      cancelled = true;
    };
  }, [businessData?.ownerId]);

  const calculateAverageRating = (reviews: ReviewModel[]): number => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + r.reviewScore, 0);
    return total / reviews.length;
  };

  const handleBusinessUpdated = (updated: BusinessModel) => {
    setBusinessData(updated);
    // Keep the panel open briefly to show success, then auto-close
    setTimeout(() => setShowEditPanel(false), 1200);
  };

  if (isLoading || !businessData) {
    return (
      <div className="min-h-screen bg-[#2D2D2D] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#C95A23] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#aaa] text-sm">Loading business...</p>
        </div>
      </div>
    );
  }

  const averageRating = calculateAverageRating(reviews);
  const displayRating = Math.ceil(Math.round(averageRating * 10) / 10);

  return (
    <div className="min-h-screen bg-[#2D2D2D] text-white md:p-8 pb-10">
      <header className="relative flex items-center px-10 pt-10 flex-col md:flex-row-reverse">
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center order-1 md:order-2">
          <a href="/" className="flex flex-col items-center">
            <Image
              src="/assets/MunchrLogo.png"
              className="mx-auto"
              width={70}
              height={70}
              alt="Munchr Logo"
            />
            <h1 className="text-3xl mb-10 font-extrabold text-[#C95A23]">
              Munchr
            </h1>
          </a>
        </div>
        <div className="order-2 mt-25 md:mt-0 md:order-1">
          <HeaderAuthButtons />
        </div>
      </header>

      <div className="mx-10 bg-gray-700 mt-5 rounded-lg overflow-hidden shadow-xl">
        {/* Hero Banner */}
        <header className="relative h-64 md:h-70 lg:h-96 w-full">
          <img
            src="/assets/food-truck-bg.jpg"
            alt="Food Trucks"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute bottom-0 left-0 p-4 sm:p-5 md:p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
            <div className="flex items-start justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {businessData.businessName}
                </h1>
                <div className="flex items-center mt-2 gap-3">
                  <RatingStars rating={averageRating} size={30} />
                  <span className="text-lg font-semibold">
                    {displayRating}/5
                  </span>
                  <span className="text-sm text-gray-300">
                    ({reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"})
                  </span>
                </div>
                <div className="mt-2 text-md">
                  {businessData.streetName} {businessData.city},{" "}
                  {businessData.state} {businessData.zipCode}
                </div>
                <div className="text-md">{businessData.businessPhoneNumber}</div>
                <div className="text-md">{businessData.businessHours}</div>
              </div>
            </div>
          </div>

          {/* Edit button — pinned to the bottom-right corner of the banner, owner only */}
          {isOwner && (
            <button
              onClick={() => setShowEditPanel(true)}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-10 flex items-center justify-center gap-2 bg-[#C95A23] hover:bg-[#b34e1f] text-white text-xs sm:text-sm font-semibold p-2 sm:px-4 sm:py-2.5 rounded-lg transition-colors shadow-lg"
              title="Edit your business"
            >
              <Pencil size={15} className="shrink-0" />
              <span className="hidden sm:inline">Edit Business</span>
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-[#484848]">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex gap-4">
              <Link href={`/LeaveAReview/${businessId}`}>
                <Button color="#C95A23" className="bg-[#C95A23]">
                  Leave a review
                </Button>
              </Link>
            </div>

            <BusinessMenu
              businessId={businessData.businessId}
              refreshKey={menuRefreshKey}
            />

            <section>
              <h2 className="text-[28px] lg:text-[32px] font-bold mb-4">
                Reviews
              </h2>
              {reviews.length === 0 ? (
                <p className="text-white">No reviews yet.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="pb-6 border-b border-gray-600"
                    >
                      <div className="mb-3">
                        <RatingStars rating={review.reviewScore} size={20} />
                      </div>
                      <div className="flex items-center gap-3 my-3">
                        <Avatar rounded />
                        <div>
                          <span className="font-medium text-white block">
                            {review.reviewerName}
                          </span>
                          <span className="text-sm text-gray-300">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {review.reviewTitle}
                      </h3>
                      <p className="text-white leading-relaxed">
                        {review.reviewDescription}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            {/* Map section — receives live businessData so it re-geocodes when location updates */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Today's Location</h3>
                {isOwner && (
                  <button
                    onClick={() => setShowEditPanel(true)}
                    className="text-xs text-[#C95A23] hover:text-[#e06928] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Pencil size={12} />
                    Update location
                  </button>
                )}
              </div>
              <div className="rounded-lg overflow-hidden h-48 xl:h-68 bg-gray-600">
                <div className="rounded-lg overflow-hidden h-64 bg-gray-600 relative xl:h-68">
                  {/* Key on businessData address so map remounts when location changes */}
                  <SingleBusinessMapComponent
                    key={`${businessData.streetName}-${businessData.city}-${businessData.zipCode}`}
                    business={businessData}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[28px] lg:text-[32px] font-bold mb-4">
                About the Business
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <Avatar rounded />
                <div>
                  <p className="font-bold">{ownerName || "Unknown"}</p>
                  <p className="text-xs text-white">Owner</p>
                </div>
              </div>
              <p className="text-white text-md leading-relaxed">
                {businessData.businessDescription}
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Edit Panel — rendered outside the card so it overlays the full page */}
      {showEditPanel && businessData && (
        <EditBusinessPanel
          business={businessData}
          onSave={handleBusinessUpdated}
          onClose={() => setShowEditPanel(false)}
          onMenuChange={() => setMenuRefreshKey((k) => k + 1)}
        />
      )}
    </div>
  );
};

export default Business;