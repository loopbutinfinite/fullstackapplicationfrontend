import Image from "next/image";

type RatingStarsProps = {
    rating: number;
    maxStars?: number;
    size?: number;
};

export default function RatingStars({
    rating,
    maxStars = 5,
    size = 35,
}: RatingStarsProps) {
    const filledStars = Math.round(rating);

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxStars }).map((_, index) => {
                const isFilled = index < filledStars;

                return (
                    <Image
                        key={index}
                        src={
                            isFilled
                                ? "/assets/rating-icon-colored.png"
                                : "/assets/rating-icon-colored-outline.png"
                        }
                        width={size}
                        height={size}
                        alt={isFilled ? "Filled star" : "Outline star"}
                    />
                );
            })}
        </div>
    );
}