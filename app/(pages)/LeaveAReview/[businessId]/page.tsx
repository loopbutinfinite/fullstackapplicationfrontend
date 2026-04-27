// import React from 'react'
// import Image from "next/image";
// import { Button, TextInput } from 'flowbite-react';

// const LeaveAReview = () => {
//   return (
//     <div className='bg-[#2D2D2D] min-h-screen pb-20'>
//       <div className=''>
//         <a href="/">
//           <Image src="/assets/MunchrLogo.png" className="mx-auto pt-5" width={70} height={70} alt={"Munchr Logo"}></Image>
//           <h3 className='text-[#C95A23] flex justify-center text-[30px] font-extrabold'>Munchr</h3>
//         </a>
//       </div>
//       <div className='bg-[#484848] min-h-screen mt-10 mx-20 rounded-[20px] p-10'>
//         <div className='flex gap-10'>
//           <div className=''>
//             <Image src="/assets/mexican-food-stock-image.jpg" className="rounded-[20px]" width={100} height={100} alt={"Munchr Logo"}></Image>
//           </div>
//           <div className='my-auto'>
//             <h3 className='text-[44px] font-bold'>La Kora Taco Truck</h3>
//             <h5 className='text-[24px] opacity-50'>Stockton, CA</h5>
//           </div>
//         </div>
//         <div className='mt-10'>
//           <h3 className='text-[36px] font-bold'>How would you rate the business?</h3>
//           <div>
//             <div className='flex'>
//               <Image src="/assets/rating-icon-colored-outline.png" className="" width={50} height={55} alt={"Munchr Logo"}></Image>
//               <Image src="/assets/rating-icon-colored-outline.png" className="" width={50} height={55} alt={"Munchr Logo"}></Image>
//               <Image src="/assets/rating-icon-colored-outline.png" className="" width={50} height={55} alt={"Munchr Logo"}></Image>
//               <Image src="/assets/rating-icon-colored-outline.png" className="" width={50} height={55} alt={"Munchr Logo"}></Image>
//               <Image src="/assets/rating-icon-colored-outline.png" className="" width={50} height={55} alt={"Munchr Logo"}></Image>
//               <p className='opacity-50 my-auto ms-5'>Select your rating</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <h3 className='text-[36px] font-bold mt-10'>How was your experience?</h3>
//           <input type="text" placeholder='Start your review...' className='bg-[#D9D9D9] text-black w-full ps-5 h-[300px] rounded-[20px]' />
//         </div>
//         <div>
//           <Button color={"#C95A23"} className='bg-[#C95A23] h-[80px] w-[300px] mt-5 text-[30px] font-bold'>Post Review</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LeaveAReview

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, TextInput } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { AddReview } from "@/data/lib/review-services";
import { getBusinessById } from "@/data/lib/business-services";
import { BusinessModel, ReviewDataRequest } from "@/data/Interfaces/Interfaces";
import { useAuth } from "@/context/AuthContext";

const LeaveAReview = () => {
  const router = useRouter();
  const params = useParams();

  const businessId = Number(params.businessId);

  const { user, isLoggedIn, isCheckingAuth } = useAuth();

  const [business, setBusiness] = useState<BusinessModel | null>(null);
  const [reviewScore, setReviewScore] = useState<number>(0);
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewDescription, setReviewDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isCheckingAuth && !isLoggedIn) {
      router.push("/LoginUser");
    }
  }, [isCheckingAuth, isLoggedIn, router]);

  useEffect(() => {
    const loadBusiness = async () => {
      if (!businessId || Number.isNaN(businessId)) return;

      try {
        const data = await getBusinessById(businessId);
        setBusiness(data);
      } catch (error) {
        console.log(error);
        setError("Could not load business information.");
      }
    };

    loadBusiness();
  }, [businessId]);

  const handleSubmitReview = async () => {
    setError("");

    if (!isLoggedIn || !user) {
      router.push("/LoginUser");
      return;
    }

    if (!businessId || Number.isNaN(businessId)) {
      setError("Invalid business.");
      return;
    }

    if (reviewScore === 0) {
      setError("Please select a rating.");
      return;
    }

    if (!reviewTitle.trim()) {
      setError("Please enter a review title.");
      return;
    }

    if (!reviewDescription.trim()) {
      setError("Please enter your review.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/LoginUser");
      return;
    }

    const newReview: ReviewDataRequest = {
      businessId: businessId,
      date: new Date().toISOString(),
      reviewerName: user.username,
      reviewTitle: reviewTitle,
      reviewDescription: reviewDescription,
      reviewScore: reviewScore,
      userId: user.userId,
    };

    try {
      setIsSubmitting(true);

      const success = await AddReview(newReview, token);

      if (!success) {
        setError("Review could not be posted.");
        return;
      }

      router.push(`/Business/${businessId}`);
    } catch (error) {
      console.log(error);
      setError("Something went wrong while posting your review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="bg-[#2D2D2D] min-h-screen flex items-center justify-center text-white">
        Checking login status...
      </div>
    );
  }

  return (
    <div className="bg-[#2D2D2D] min-h-screen pb-20 text-white">
      <div>
        <a href="/">
          <Image
            src="/assets/MunchrLogo.png"
            className="mx-auto pt-5"
            width={70}
            height={70}
            alt="Munchr Logo"
          />
          <h3 className="text-[#C95A23] flex justify-center text-[30px] font-extrabold">
            Munchr
          </h3>
        </a>
      </div>

      <div className="bg-[#484848] min-h-screen mt-10 mx-20 rounded-[20px] p-10">
        <div className="flex gap-10">
          <div>
            <Image
              src="/assets/mexican-food-stock-image.jpg"
              className="rounded-[20px]"
              width={100}
              height={100}
              alt="Business image"
            />
          </div>

          <div className="my-auto">
            <h3 className="text-[44px] font-bold">
              {business?.businessName || "Business"}
            </h3>
            <h5 className="text-[24px] opacity-50">
              {business
                ? `${business.city}, ${business.state}`
                : "Loading location..."}
            </h5>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-[36px] font-bold">
            How would you rate the business?
          </h3>

          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setReviewScore(star)}
                className="cursor-pointer"
              >
                <Image
                  src={
                    star <= reviewScore
                      ? "/assets/rating-icon-colored.png"
                      : "/assets/rating-icon-colored-outline.png"
                  }
                  width={50}
                  height={55}
                  alt={`${star} star rating`}
                />
              </button>
            ))}

            <p className="opacity-50 my-auto ms-5">
              {reviewScore === 0
                ? "Select your rating"
                : `${reviewScore}/5 selected`}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-[36px] font-bold mt-10">Review title</h3>

          <TextInput
            type="text"
            placeholder="Give your review a title..."
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className="[&_input]:bg-[#D9D9D9] [&_input]:text-black"
          />
        </div>

        <div>
          <h3 className="text-[36px] font-bold mt-10">
            How was your experience?
          </h3>

          <textarea
            placeholder="Start your review..."
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
            className="bg-[#D9D9D9] text-black w-full ps-5 pt-5 h-[300px] rounded-[20px]"
          />
        </div>

        {error && <p className="text-red-400 mt-5">{error}</p>}

        <div>
          <Button
            color="#C95A23"
            className="bg-[#C95A23] h-[80px] w-[300px] mt-5 text-[30px] font-bold"
            onClick={handleSubmitReview}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Review"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaveAReview;