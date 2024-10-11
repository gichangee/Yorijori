import { useEffect, useState } from "react";
import * as S from "./Review.styled";
import ReviewModalButton from "./ReviewModal/ReviewModalButton";
import ReviewOverview from "./ReviewOverview/ReviewOverview";
import ReviewRating from "./ReviewRating/ReviewRating";
import EmptyPlaceHolder from "../EmptyPlaceholder/EmptyPlaceHolder";
import PropTypes from "prop-types";
import ReviewRegistButton from "./ReviewRegist/ReviewRegistButton";
import { useReview } from "../../hooks/useRecipe";
import { useAuthStore } from "../../store/userStore";

const Review = ({ recipe }) => {
    const [rating, setRating] = useState(Array(5).fill(0));
    const { data: reviews = [], isLoading } = useReview(recipe.id);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    useEffect(() => {
        if (reviews.length > 0 && !isLoading) {
            const ratingCounts = reviews.reduce((acc, review) => {
                acc[5 - review.rating] += 1;
                return acc;
            }, Array(5).fill(0));
            setRating(ratingCounts);
        }
    }, [reviews, isLoading]);
    return (
        <S.ReviewSection>
            {!isLoading && reviews.length > 0 ? (
                <>
                    <S.ReviewSectionTop>
                        <S.ReviewTitle>리뷰 {reviews.length}개</S.ReviewTitle>
                        {isLoggedIn && <ReviewRegistButton id={recipe.id} />}
                    </S.ReviewSectionTop>
                    <S.ReviewSectionBottom>
                        <ReviewRating rating={rating} />
                        {reviews.slice(0, 2).map((review, index) => (
                            <ReviewOverview key={index} review={review} />
                        ))}
                    </S.ReviewSectionBottom>
                    <S.ReviewRegistButtonWrapper>
                        {reviews.length >= 3 && (
                            <ReviewModalButton
                                reviews={reviews}
                                recipe={recipe}
                            />
                        )}
                    </S.ReviewRegistButtonWrapper>
                </>
            ) : (
                <S.NoReviewsMessage>
                    <EmptyPlaceHolder
                        button={
                            isLoggedIn && <ReviewRegistButton id={recipe.id} />
                        }
                        content="등록된 리뷰가 없습니다."
                        height={"15rem"}
                        width={"100%"}
                    />
                </S.NoReviewsMessage>
            )}
        </S.ReviewSection>
    );
};
Review.propTypes = {
    id: PropTypes.number.isRequired,
    reviews: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired,
    recipe: PropTypes.object.isRequired,
};
export default Review;
