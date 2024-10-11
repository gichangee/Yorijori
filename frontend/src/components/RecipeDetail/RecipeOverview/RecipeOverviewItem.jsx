import PropTypes from "prop-types";
import * as S from "./RecipeOverview.styled";

function RecipeOverviewItem({ icon, label, detail }) {
    return (
        <S.RecipeOverviewWrapper>
            <S.Icon>{icon}</S.Icon>
            <S.Label>{label}</S.Label>
            <S.Detail>{detail}</S.Detail>
        </S.RecipeOverviewWrapper>
    );
}

RecipeOverviewItem.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
};

export default RecipeOverviewItem;
