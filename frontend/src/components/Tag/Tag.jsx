import PropTypes from "prop-types";
import * as S from "./Tag.styled";
import { emoji } from "../../constants/emoji";

/**
 * Tag 컴포넌트
 *
 * 주어진 태그 이름에 따라 텍스트와 해당하는 이모지를 렌더링하고, 클릭 시 이벤트 처리를 지원하는 컴포넌트입니다.
 * `emoji` 객체에는 사전에 정의된 태그와 이모지 매핑 정보가 포함되어 있으며, 특정 태그에 매칭되는 이모지가 없는 경우 텍스트만 표시됩니다.
 * `isClicked` prop을 통해 클릭 여부에 따른 스타일 변경이 가능하며, 태그를 클릭할 때 `onClick` 콜백 함수가 호출됩니다.
 *
 * @component
 * @example
 * // Tag 컴포넌트 사용 예시
 * return <Tag tag="간식" isClicked={true} onClick={handleClick} />
 *
 * @param {Object} props - Tag 컴포넌트의 props 객체입니다.
 * @param {string} props.tag - 렌더링할 태그의 이름으로, 텍스트 및 이모지 표시를 결정합니다. (필수)
 * @param {boolean} [props.isClicked=true] - 태그의 클릭(선택) 여부를 나타내는 상태입니다. (선택, 기본값: true)
 * @param {function} props.onClick - 태그를 클릭할 때 호출되는 콜백 함수입니다. (선택)
 * @returns {JSX.Element} 태그 텍스트와 해당 이모지를 렌더링하는 Tag 컴포넌트입니다.
 */

function Tag({ tag, isClicked = true, onClick }) {
    const handleClick = () => {
        if (onClick === undefined) return;
        onClick();
    };
    return (
        <S.TagWrapper onClick={() => handleClick()} isClicked={isClicked}>
            <S.TagName isClicked={isClicked}>{tag}</S.TagName>
            {emoji[tag] && <S.TagEmoji> {emoji[tag]}</S.TagEmoji>}
        </S.TagWrapper>
    );
}

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    isClicked: PropTypes.bool,
    onClick: PropTypes.func,
};
export default Tag;
