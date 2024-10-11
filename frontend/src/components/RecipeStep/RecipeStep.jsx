import PropTypes from "prop-types";
import * as S from "./RecipeStep.styled";
function RecipeStep({ recipe }) {
    return (
        <S.StepContainer>
            {recipe &&
                recipe.map((step, index) => (
                    <S.StepWrapper key={index}>
                        <S.CircleNumber>{step.orderNum}</S.CircleNumber>
                        <S.StepDescription>
                            {step.orderContent}
                        </S.StepDescription>
                        <S.StepImage src={step.orderImg} />
                    </S.StepWrapper>
                ))}
        </S.StepContainer>
    );
}

RecipeStep.propTypes = {
    recipe: PropTypes.array.isRequired,
};

export default RecipeStep;
