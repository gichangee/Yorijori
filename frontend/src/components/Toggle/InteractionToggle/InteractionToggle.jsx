import * as S from "./InteractionToggle.styled";
import PropTypes from "prop-types";

import {
    ActiveHeartToggle,
    InactiveHeartToggle,
    ActiveBookmarkToggle,
    InactiveBookmarkToggle,
    CommentButton,
} from "../../../util/get-button-icon";

/**
 * InteractionToggle 컴포넌트는 하트 또는 북마크 아이콘을 토글하는 버튼입니다.
 *
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 props.
 * @param {"heart" | "bookmark"} props.type - 토글 아이콘의 타입 ("heart" 또는 "bookmark").
 * @param {string} [props.size="20px"] - 아이콘의 크기 (기본값: "20px").
 * @param {boolean} [props.active=false] - 초기 활성화 상태 (기본값: false).
 * @returns {JSX.Element} - InteractionToggle 컴포넌트.
 *
 * @example
 * <InteractionToggle type="heart" size="30px" active={true} />
 */
const InteractionToggle = ({ type, size, onClick, isActive }) => {
    const getToggleIcon = () => {
        switch (type) {
            case "heart":
                return isActive ? (
                    <ActiveHeartToggle size={size} />
                ) : (
                    <InactiveHeartToggle size={size} />
                );
            case "bookmark":
                return isActive ? (
                    <ActiveBookmarkToggle size={size} />
                ) : (
                    <InactiveBookmarkToggle size={size} />
                );
            case "comment":
                return <CommentButton size={size} />;
            default:
                return <div></div>;
        }
    };

    return (
        <S.InteractionToggle onClick={onClick}>
            {getToggleIcon()}
        </S.InteractionToggle>
    );
};

InteractionToggle.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.string,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
};

export default InteractionToggle;
