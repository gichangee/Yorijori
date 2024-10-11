import PropTypes from "prop-types";
import { Rating } from "react-simple-star-rating";
import ReviewRatingBar from "./ReviewRatingBar";
import { scoreAvg } from "../../../util/review-rating";
import * as S from "./ReviewRating.styled";

const ReviewRating = ({ rating }) => {
    const avg = scoreAvg(rating);
    return (
        <>
            <S.Wrapper>
                <S.RatingWrapper>
                    <S.RatingLabel>{avg}</S.RatingLabel>
                    <Rating
                        initialValue={avg}
                        readonly
                        allowFraction
                        size={15}
                    />
                </S.RatingWrapper>
                <S.BarWrapper>
                    <ReviewRatingBar rating={rating} />
                </S.BarWrapper>
            </S.Wrapper>
        </>
    );
};

ReviewRating.propTypes = {
    rating: PropTypes.number.isRequired,
};
export default ReviewRating;
