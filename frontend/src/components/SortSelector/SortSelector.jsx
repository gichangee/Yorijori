import PropTypes from "prop-types";
import { ButtonContainer, SortButton } from "./SortSelector.styled"; // 스타일드 컴포넌트 가져오기

const SortSelector = ({ sortOrder, onSortChange }) => {
    return (
        <ButtonContainer>
            <SortButton
                active={sortOrder === "최신순"}
                onClick={() => onSortChange("최신순")}
            >
                최신순
            </SortButton>
            <SortButton
                active={sortOrder === "추천순"}
                onClick={() => onSortChange("추천순")}
            >
                추천순
            </SortButton>
            <SortButton
                active={sortOrder === "댓글순"}
                onClick={() => onSortChange("댓글순")}
            >
                댓글순
            </SortButton>
        </ButtonContainer>
    );
};

SortSelector.propTypes = {
    sortOrder: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default SortSelector;
