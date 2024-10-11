import { useState } from "react";
import Modal from "../../Modal/Modal";
import ReviewRegist from "./ReviewRegist";
import PropTypes from "prop-types";

const ReviewRegistButton = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div onClick={onClick}>리뷰 등록</div>

            {isModalOpen && (
                <Modal
                    context={<ReviewRegist id={id} onClose={closeModal} />}
                    onClose={closeModal}
                />
            )}
        </>
    );
};
ReviewRegistButton.propTypes = {
    id: PropTypes.number.isRequired,
};
export default ReviewRegistButton;
