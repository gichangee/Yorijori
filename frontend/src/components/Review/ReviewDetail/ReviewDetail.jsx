import PropTypes from "prop-types";
import UserProfileImage from "../../UserProfile/UserProfileImage/UserProfileImage";
import { Rating } from "react-simple-star-rating";
import * as S from "./ReviewDetail.styled";
const ReviewDetail = ({ review, recipe, totalRating }) => {
    const placeholderImage = "/images/placeholder-img.jpg";
    return (
        <S.Wrapper>
            <S.FlexLayout>
                <UserProfileImage
                    imageUrl={recipe.image || placeholderImage}
                    size={"2.5em"}
                />
                <S.FlexInside>
                    <S.RecipeName>{recipe.name}</S.RecipeName>
                    <S.FlexCenter>
                        <Rating
                            initialValue={1}
                            readonly
                            iconsCount={1}
                            size={25}
                        />
                        <S.RecipeTotalRating>{totalRating}</S.RecipeTotalRating>
                    </S.FlexCenter>
                </S.FlexInside>
            </S.FlexLayout>

            <S.ReviewImg
                src={review.reviewImage || placeholderImage}
                alt="리뷰 이미지"
            />
            <S.FlexLayout>
                <UserProfileImage
                    imageUrl={review.profileImage}
                    size={"2rem"}
                />
                <S.FlexInside>
                    <S.UserName>{review.nickname}</S.UserName>
                    <S.FlexBetween>
                        <Rating
                            initialValue={review.rating}
                            readonly
                            allowFraction
                            size={17}
                        />
                    </S.FlexBetween>
                </S.FlexInside>
            </S.FlexLayout>

            <S.ReviewWrapper>
                <S.ReviewTitle>{review.title}</S.ReviewTitle>
                <S.ReviewContent>{review.content}</S.ReviewContent>
            </S.ReviewWrapper>
        </S.Wrapper>
    );
};

ReviewDetail.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.number.isRequired,
        profileImage: PropTypes.string,
        reviewImage: PropTypes.string,
        nickname: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        totalRating: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    totalRating: PropTypes.number.isRequired,
};
export default ReviewDetail;
