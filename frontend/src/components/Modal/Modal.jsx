import PropTypes from "prop-types";
import * as S from "./Modal.styled";
function Modal({ context, onClose }) {
    const onClick = (event) => {
        event.stopPropagation();
        onClose();
    };
    return (
        <S.ModalContainer>
            <S.Modal>
                <S.CloseButton onClick={onClick}>닫기</S.CloseButton>
                {context}
            </S.Modal>
        </S.ModalContainer>
    );
}

Modal.propTypes = {
    context: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
