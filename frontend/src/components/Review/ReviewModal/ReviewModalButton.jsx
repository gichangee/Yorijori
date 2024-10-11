import PropTypes from "prop-types";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import Modal from "../../Modal/Modal";
import * as S from "./ReviewModal.styled";
const ReviewModalButton = ({ reviews, recipe }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <S.MoreReviews onClick={onClick}>더보기 {">"}</S.MoreReviews>

            {isModalOpen && (
                <Modal
                    context={<ReviewModal reviews={reviews} recipe={recipe} />}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

ReviewModalButton.propTypes = {
    reviews: PropTypes.array.isRequired,
    recipe: PropTypes.object.isRequired,
};

export default ReviewModalButton;
