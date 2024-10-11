import * as S from "./UserProfileLevel.styled";
import PropTypes from "prop-types";
import { level, levelColor } from "../../../constants/level";

const CookingLevel = ({ score }) => {
    const maxScore = 100;
    const maxLevel = level.length - 1;
    const totalMaxScore = maxScore * level.length;

    const userLevel = Math.min(Math.floor(score / maxScore), maxLevel);
    const remainingScore = score >= totalMaxScore ? maxScore : score % maxScore;
    const progress =
        score >= totalMaxScore ? 100 : (remainingScore / maxScore) * 100;

    return (
        <S.Container>
            <S.Title>
                <S.CookingIcon>👨‍🍳</S.CookingIcon>
                요리 레벨
            </S.Title>
            <S.ProgressBarWrapper>
                <S.TextWrapper>
                    <S.Text className="level">
                        {"LEVEL " + (userLevel + 1)}
                    </S.Text>
                    <S.Text>{level[userLevel]}</S.Text>
                </S.TextWrapper>
                <S.ProgressBarContainer>
                    <S.ProgressBar
                        progress={progress === 0 ? 1 : progress}
                        color={levelColor[userLevel]}
                    />
                </S.ProgressBarContainer>
                <S.LevelInfo>
                    레벨업까지 {maxScore - remainingScore} 남았어요
                </S.LevelInfo>
            </S.ProgressBarWrapper>
        </S.Container>
    );
};

CookingLevel.propTypes = {
    score: PropTypes.number,
};

export default CookingLevel;
