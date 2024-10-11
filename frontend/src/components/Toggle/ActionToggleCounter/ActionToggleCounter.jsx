import * as S from "./ActionToggleCounter.styled";
import PropTypes from "prop-types";

const ActionToggleCounter = ({ Toggle, count = 0 }) => {
    const displayCount = count > 999 ? "999+" : count;

    return (
        <S.ActionToggleCounter>
            <Toggle />
            {displayCount}
        </S.ActionToggleCounter>
    );
};

ActionToggleCounter.propTypes = {
    Toggle: PropTypes.elementType,
    count: PropTypes.number,
};

export default ActionToggleCounter;
