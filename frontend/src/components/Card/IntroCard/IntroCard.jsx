import * as S from "./IntroCard.styled";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/**
 * IntroCard 컴포넌트는 이미지, 제목 및 텍스트로 구성된 카드를 렌더링합니다.
 *
 * @component
 * @param {Object} props - IntroCard의 속성.
 * @param {string} props.imgUrl - 카드에 표시될 이미지의 URL. 이미지가 없을 경우 기본 대체 이미지가 사용됩니다.
 * @param {string} props.title - 카드의 제목.
 * @param {string} props.text - 카드의 텍스트.
 *
 * @returns {JSX.Element} - IntroCard 컴포넌트.
 *
 * @example
 * const title = "Sample Title";
 * const text = "Sample text for the card";
 * const imgUrl = "/images/sample.jpg";
 * return <IntroCard title={title} text={text} imgUrl={imgUrl} />;
 */
const IntroCard = ({ recipe }) => {
    const placeholderImage = "/images/placeholder-img.jpg";
    const navigate = useNavigate();
    return (
        <S.IntroCard onClick={() => navigate(`/recipe/${recipe.recipeId}`)}>
            <S.Thumnail
                src={recipe.image || placeholderImage}
                onError={(e) => (e.target.src = placeholderImage)}
            />
            <S.TextArea>
                <S.Title>{recipe.title}</S.Title>
                <S.Text>{recipe.intro}</S.Text>
            </S.TextArea>
        </S.IntroCard>
    );
};

IntroCard.propTypes = {
    recipe: PropTypes.shape({
        recipeId: PropTypes.string.isRequired,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        intro: PropTypes.string.isRequired,
    }).isRequired,
};

export default IntroCard;
