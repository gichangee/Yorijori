import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReviewOverview from "../ReviewOverview/ReviewOverview";
import * as S from "./ReviewModal.styled";
import ReviewDetail from "../ReviewDetail/ReviewDetail";
import { scoreAvg } from "../../../util/review-rating";

const ReviewModal = ({ recipe, reviews }) => {
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [totalRating, setTotalRating] = useState(0);
    useEffect(() => {
        if (reviews.length > 0) {
            setSelectedReviewId(0);
            const ratingCounts = reviews.reduce((acc, review) => {
                acc[5 - review.rating] += 1;
                return acc;
            }, Array(5).fill(0));
            const data = scoreAvg(ratingCounts);
            setTotalRating(data);
        }
    }, [reviews]);

    const changeReview = (idx) => {
        setSelectedReviewId(idx);
    };

    return (
        <S.ReviewModalWrapper>
            {selectedReviewId !== null && (
                <>
                    <S.Reviews>
                        {reviews.map((review, idx) => (
                            <S.ReviewWrapper key={review.id}>
                                <ReviewOverview
                                    onClick={() => changeReview(idx)}
                                    review={review}
                                    isSelected={idx === selectedReviewId}
                                />
                            </S.ReviewWrapper>
                        ))}
                    </S.Reviews>

                    <ReviewDetail
                        totalRating={totalRating}
                        review={reviews[selectedReviewId]}
                        recipe={recipe}
                    />
                </>
            )}
        </S.ReviewModalWrapper>
    );
};

ReviewModal.propTypes = {
    recipe: PropTypes.object.isRequired,
    reviews: PropTypes.array.isRequired,
};
export default ReviewModal;
