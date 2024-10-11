import PropTypes from "prop-types";
import { Rating } from "react-simple-star-rating";
import * as S from "./ReviewOverview.styled";
const ReviewOverview = ({ review, onClick, isSelected }) => {
    const placeholderImage = "/images/placeholder-img.jpg";

    return (
        <S.ReviewOverviewWrapper onClick={onClick} $isSelected={isSelected}>
            <S.ReviewImg
                src={review.reviewImage || placeholderImage}
                alt="리뷰 이미지"
            />
            <S.ReviewOverviewRight>
                <Rating
                    initialValue={review.rating}
                    readonly
                    allowFraction
                    size={20}
                />
                <S.ReviewWrapper>
                    <S.ReviewTitle>{review.title}</S.ReviewTitle>
                    <S.ReviewContent>{review.content}</S.ReviewContent>
                </S.ReviewWrapper>
            </S.ReviewOverviewRight>
        </S.ReviewOverviewWrapper>
    );
};
ReviewOverview.propTypes = {
    review: PropTypes.shape({
        reviewImage: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
};

export default ReviewOverview;
