import PropTypes from "prop-types";
import PriceChart from "../../IngredientPrices/PriceChart/PriceChart";

const PriceChartCell = ({ cell: { value }, row: { original } }) => (
    <PriceChart name={original.name} priceHistory={value} />
);
PriceChartCell.propTypes = {
    cell: PropTypes.shape({
        value: PropTypes.any.isRequired,
    }).isRequired,
    row: PropTypes.shape({
        original: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default PriceChartCell;
