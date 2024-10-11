import PropTypes from "prop-types";
import * as S from "./Comment.styled";
import { useAuthStore } from "../../store/userStore";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Slide, ToastContainer, toast } from "react-toastify";
import useUser from "../../hooks/useUser";
import { useUpdateComment } from "../../hooks/useRecipe";
import Button from "../Button/Button";
function CommentInput({ id }) {
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const CustomToastContainer = styled(ToastContainer)`
        .Toastify__toast {
            font-family: "SUITMedium";
            font-size: 15px;
            letter-spacing: 0.02rem;
        }
    `;

    const { isLoading } = useUser();
    const { isLoggedIn } = useAuthStore.getState();

    const { mutate: updateComment } = useUpdateComment();
    const submitComment = () => {
        if (!isLoading && !isLoggedIn) {
            toast.error("로그인이 필요해요.", {
                position: "top-center",
                transition: Slide,
                autoClose: 2000,
                onClose: () => {
                    navigate("/login");
                },
            });
        }
        const content = inputRef.current.value.trim();

        if (!content) return;
        updateComment({ id, content });
        inputRef.current.value = "";
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitComment();
        }
    };

    return (
        <S.TextAreaWrapper>
            <S.TextAreaBox
                type="text"
                placeholder="댓글을 입력하세요"
                ref={inputRef}
                onKeyDown={handleKeyPress}
            />
            <S.ButtonWrapper>
                <Button
                    width="5rem"
                    height="2rem"
                    type="small"
                    onClick={() => submitComment()}
                    text="등록"
                />
            </S.ButtonWrapper>
            <CustomToastContainer stacked />
        </S.TextAreaWrapper>
    );
}

CommentInput.propTypes = {
    id: PropTypes.number.isRequired,
};

export default CommentInput;
