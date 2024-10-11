import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import Button from "../../Button/Button";
import { useUserStore } from "../../../store/userStore";
import { useUpdateReview } from "../../../hooks/useRecipe";
import PropTypes from "prop-types";
import * as S from "./ReviewRegist.styled";
import useUser from "../../../hooks/useUser";

const ReviewRegist = ({ onClose, id }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleReviewChange = (event) => {
        setContent(event.target.value);
    };

    const { mutate } = useUpdateReview();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const { isLoading: isUserLoading } = useUser();
    const user = useUserStore((state) => state.user);

    const handleSubmit = async () => {
        if (!title || !content || rating === 0) {
            return;
        }
        const data = JSON.stringify({
            title,
            rating,
            content,
        });
        const formData = new FormData();
        const reviewBlob = new Blob([data], { type: "application/json" });
        formData.append("review", reviewBlob);
        if (selectedFile) {
            formData.append("reviewImage", selectedFile);
        }
        if (!isUserLoading && !user) onClose();
        mutate(
            { formData, id },
            {
                onSuccess: () => {
                    setTitle("");
                    setContent("");
                    setRating(0);
                    setSelectedFile(null);
                    setImagePreview("");
                    onClose();
                },
            },
        );
    };

    return (
        <S.ReviewContainer>
            <S.RatingWrapper>
                <Rating
                    onClick={handleRating}
                    ratingValue={rating}
                    size={60}
                    label
                    transition
                    emptyColor="gray"
                />
            </S.RatingWrapper>
            <S.Label htmlFor="title">제목</S.Label>
            <S.Input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
            />
            <S.Label htmlFor="content">내용</S.Label>
            <S.TextArea
                id="content"
                value={content}
                onChange={handleReviewChange}
            />
            <S.Label htmlFor="file">사진</S.Label>
            <S.FileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            {imagePreview && (
                <S.PreviewImage src={imagePreview} alt="Selected Preview" />
            )}
            <Button text="리뷰 등록" onClick={handleSubmit} />
        </S.ReviewContainer>
    );
};

ReviewRegist.propTypes = {
    onClose: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};
export default ReviewRegist;
