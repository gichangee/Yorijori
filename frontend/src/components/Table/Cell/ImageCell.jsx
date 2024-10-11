import PropTypes from "prop-types";

const ImageCell = ({ cell: { value } }) => (
    <img src={value} alt="profile" width="50" height="50" />
);
ImageCell.propTypes = {
    cell: PropTypes.shape({
        value: PropTypes.string.isRequired,
    }).isRequired,
};

export default ImageCell;
