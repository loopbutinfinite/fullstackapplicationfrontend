import HeaderAuthButtons from '@/app/components/HeaderAuthButtons/page';
import RatingStars from '@/app/components/StarRatings/page';
import SingleBusinessMapComponent from '@/components/MapBox/SIngleBusinessMapComponent';
import { BusinessModel, ReviewModel } from '@/data/Interfaces/Interfaces';
import { getBusinessById } from '@/data/lib/business-services';
import { getReviewsByBusinessId } from '@/data/lib/review-services';
import { Button, Avatar } from 'flowbite-react';
import { Bookmark, Heart } from 'lucide-react';
import Image from "next/image";

const Business = async ({ params }: { params: Promise<{ businessId: number }> }) => {
  const { businessId } = await params;

  const calculateAverageRating = (reviews: ReviewModel[]): number => {
    if (!reviews.length) return 0;

    const total = reviews.reduce((sum, review) => sum + review.reviewScore, 0);
    return total / reviews.length;
  };

  const businessData: BusinessModel = await getBusinessById(businessId);
  const reviews: ReviewModel[] = await getReviewsByBusinessId(businessId);

  const averageRating = calculateAverageRating(reviews);
  const displayRating = Math.round(averageRating * 10) / 10;

  return (
    <div className="min-h-screen bg-[#2D2D2D] text-white md:p-8 pb-10">
      <header className="relative flex items-center pt-5 px-10 pt-10">
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <a href="/" className="flex flex-col items-center">
            <Image
              src="/assets/MunchrLogo.png"
              className="mx-auto"
              width={70}
              height={70}
              alt="Munchr Logo"
            />
            <h1 className="text-3xl mb-10 font-extrabold text-[#C95A23]">Munchr</h1>
          </a>
        </div>
        <HeaderAuthButtons></HeaderAuthButtons>
      </header>
      <div className="mx-10 bg-gray-700 mt-5 rounded-lg overflow-hidden shadow-xl">
        <header className="relative h-64 md:h-96 w-full">
          <img
            src="/assets/food-truck-bg.jpg"
            alt="Food Trucks"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
            <h1 className="text-8xl md:text-4xl font-bold">
              {businessData.businessName}
            </h1>
            <div className="flex items-center mt-2 gap-3">
              <RatingStars rating={averageRating} size={35} />
              <span className="text-lg font-semibold">
                {displayRating}/5
              </span>
              <span className="text-sm text-gray-300">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
            <div className="mt-2 text-md">
              {businessData.streetName} {businessData.city}, {businessData.state} {businessData.zipCode}
            </div>
            <div className="text-md">{businessData.businessPhoneNumber}</div>
            <div className="text-md">{businessData.businessHours}</div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-[#484848]">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex gap-4">
              <Button color="#C95A23" className='bg-[#C95A23]'>Leave a review</Button>
              {/* <Button color="#C95A23" className='bg-[#C95A23]'> <Bookmark strokeWidth={"1px"}></Bookmark> Favorite</Button> */}
              <Button color="#C95A23" className='bg-[#C95A23]'> <Bookmark strokeWidth={"1px"} fill='white'></Bookmark>Unfavorite</Button>
            </div>
            <section>
              <h2 className="text-4xl text-white font-bold mb-4">Menu</h2>
              <div className="rounded-lg overflow-hidden border border-gray-600">
                <img
                  src="/assets/food-truck-menu.png"
                  alt={`Today's Menu for ${businessData.businessName}`}
                  className="w-full h-auto"
                />
              </div>
            </section>
            <section>
              <h2 className="text-4xl font-bold mb-4">Reviews</h2>
              {reviews.length === 0 ? (
                <p className="text-white">No reviews yet.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-600">
                      <div className="mb-3">
                        <RatingStars rating={review.reviewScore} size={20} />
                      </div>

                      <div className="flex items-center gap-3 my-3">
                        <Avatar img="/api/placeholder/40/40" rounded />
                        <div>
                          <span className="font-medium text-white block">
                            {review.reviewerName}
                          </span>
                          <span className="text-sm text-gray-300">
                            {/* {review.date} */}
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
            <section>
              <h3 className="text-xl font-bold mb-4">Today's Location</h3>
              <div className="rounded-lg overflow-hidden h-48 xl:h-68 bg-gray-600">
                <div className="rounded-lg overflow-hidden h-64 bg-gray-600 relative xl:h-68">
                  <SingleBusinessMapComponent business={businessData} />
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
              <p className="text-white text-md leading-relaxed">
                {businessData.businessDescription}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;