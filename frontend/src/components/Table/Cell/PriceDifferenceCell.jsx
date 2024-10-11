import PropTypes from "prop-types";
import PriceDifference from "../../IngredientPrices/PriceChart/PriceDifference";

const PriceDifferenceCell = ({ cell: { value } }) => (
    <PriceDifference value={value} />
);
PriceDifferenceCell.propTypes = {
    cell: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
    }).isRequired,
};

export default PriceDifferenceCell;
