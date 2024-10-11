import { PropTypes } from "prop-types";
import {
    ModalOverlay,
    ModalContainer,
    Message,
    ButtonContainer,
    CloseButton,
} from "./PostModal.styled";

const PostModal = ({ message, onClose, onConfirm, isError }) => {
    return (
        <ModalOverlay>
            <ModalContainer>
                <Message>{message}</Message>
                <ButtonContainer>
                    {isError ? (
                        <CloseButton onClick={onClose} isError={true}>
                            확인
                        </CloseButton>
                    ) : (
                        <>
                            <CloseButton onClick={onConfirm} isError={false}>
                                확인
                            </CloseButton>
                        </>
                    )}
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

PostModal.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    isError: PropTypes.bool,
};

PostModal.defaultProps = {
    isError: false,
};

export default PostModal;
