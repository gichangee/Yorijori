import PropTypes from "prop-types";
import * as S from "./EmptyPlaceHolder.styled";

/**
 * EmptyPlaceHolder 컴포넌트
 *
 * 데이터가 없을 때 사용자에게 안내 메시지와 함께 버튼을 제공하여 특정 행동을 유도하는 컴포넌트입니다.
 * 이 컴포넌트는 너비와 높이를 설정할 수 있으며, 사용자에게 이모지와 메시지, 추천 문구, 그리고 추가적인 버튼을 표시할 수 있습니다.
 *
 * @component
 * @param {string} width - 컴포넌트의 너비 값 (예: "300px").
 * @param {string} height - 컴포넌트의 높이 값 (예: "150px").
 * @param {string} content - 데이터가 없을 때 표시할 메시지 (예: "등록된 식재료가 없습니다.").
 * @param {string} recommend - 사용자가 취할 수 있는 추천 행동 메시지 (예: "관심 있는 식재료에 좋아요를 눌러보세요!").
 * @param {React.ReactNode} button - 사용자가 클릭할 수 있는 버튼 컴포넌트 (예: <Button>추가하기</Button>).
 * @example
 * // 기본 사용 예시
 * <EmptyPlaceHolder
 *   width="300px"
 *   height="150px"
 *   content="등록된 식재료가 없습니다."
 *   recommend="관심 있는 식재료에 좋아요를 눌러보세요!"
 *   button={<Button/>}  버튼 컴포넌트 참고
 * />
 */
const EmptyPlaceHolder = ({ width, height, content, recommend, button }) => {
    return (
        <S.Wrapper width={width} height={height}>
            <S.Emoji>🥺</S.Emoji>
            <S.Content>{content}</S.Content>
            <S.Recommend>{recommend}</S.Recommend>
            {button}
        </S.Wrapper>
    );
};

EmptyPlaceHolder.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    content: PropTypes.string,
    recommend: PropTypes.string,
    button: PropTypes.node,
};

export default EmptyPlaceHolder;
