import PropTypes from "prop-types";
import { useTheme } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { CircleNumber } from "./Recipe.styled";
import * as S from "./RecipeModal.styled";
import AudioVisualizer from "react-audio-visualize";

function RecipeStepModal({ recipe }) {
    const [blob, setBlob] = useState();
    const [isClicked, setIsClicked] = useState(false);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

    const visualizerRef = useRef(null);

    const alertMessage = `"다음단계", "이전단계" ,"다시 말해줘", "타이머 1분" 명령어를 말해보세요 !`;

    const theme = useTheme();

    const handleNextStep = () => {
        setCurrentRecipeIndex((prev) => (prev + 1) % recipe.length);
    };

    const handleBeforeStep = () => {
        setCurrentRecipeIndex(
            (prev) => (prev - 1 + recipe.length) % recipe.length,
        );
    };

    const handleRecordClick = () => {
        setIsClicked((prev) => !prev);
    };

    useEffect(() => {
        setBlob(null);
    }, []);

    return (
        <S.RecipeContentWrapper>
            <S.AlertMessageContainer>
                <S.AlertIcon>📣</S.AlertIcon>
                <S.AlertMessage>{alertMessage}</S.AlertMessage>
            </S.AlertMessageContainer>
            <S.RecipeNavigationContainer>
                <S.LeftArrow
                    onClick={handleBeforeStep}
                    isVisible={currentRecipeIndex > 0}
                />
                <S.RecipeImg src={recipe[currentRecipeIndex].img} />
                <S.RightArrow
                    onClick={handleNextStep}
                    isVisible={currentRecipeIndex < recipe.length - 1}
                />
            </S.RecipeNavigationContainer>

            <S.RecipeInfo>
                <CircleNumber>{currentRecipeIndex + 1}</CircleNumber>
                <S.RecipeText>{recipe[currentRecipeIndex].text}</S.RecipeText>
            </S.RecipeInfo>

            <S.RecordWrapper>
                <S.AudioVisualizerWrapper>
                    {isClicked && blob && (
                        <AudioVisualizer
                            ref={visualizerRef}
                            blob={blob}
                            width={680}
                            height={75}
                            barWidth={1}
                            gap={0}
                            barColor={theme.color.point.green}
                        />
                    )}
                </S.AudioVisualizerWrapper>
                <S.Record onClick={handleRecordClick} isClicked={isClicked} />
            </S.RecordWrapper>
        </S.RecipeContentWrapper>
    );
}

RecipeStepModal.propTypes = {
    recipe: PropTypes.array.isRequired,
};

export default RecipeStepModal;
