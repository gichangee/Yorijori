import PropTypes from "prop-types";
import * as S from "./PriceChart.styled";
const PriceDifference = ({ value }) => {
    return (
        <>
            <S.PriceLabel flag={value.flag}>{value.price}</S.PriceLabel>
            {value.flag === "up" && <S.Up />}
            {value.flag === "down" && <S.Down />}
        </>
    );
};

PriceDifference.propTypes = {
    value: PropTypes.object.isRequired,
};

export default PriceDifference;
