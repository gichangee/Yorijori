import PropTypes from "prop-types";
import {
    ModalOverlay,
    ModalContainer,
    Message,
    ButtonContainer,
    CloseButton,
    Emoji,
} from "./LoginModal.styled";

const LoginModal = ({ message, onClose }) => {
    return (
        <ModalOverlay>
            <ModalContainer>
                <Message>
                    <Emoji>🔑</Emoji>
                    {message}
                </Message>
                <ButtonContainer>
                    <CloseButton onClick={onClose}>확인</CloseButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

LoginModal.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LoginModal;
