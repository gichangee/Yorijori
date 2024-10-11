import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LowestPrice from "./LowestPrice";
import * as S from "./LowestPrice.styled";
import { getIngredientLowPrices } from "../../../api/ingredientApi";
const LowestPrices = ({ name }) => {
    const [prices, setPrices] = useState();

    useEffect(() => {
        const fetchPrices = async () => {
            const data = await getIngredientLowPrices(name);
            setPrices(data);
        };
        fetchPrices();
    }, [name]);

    return (
        <S.LowestPriceWrapper>
            {prices && (
                <>
                    {prices.map((price, index) => {
                        return <LowestPrice key={index} data={price} />;
                    })}
                </>
            )}
        </S.LowestPriceWrapper>
    );
};

LowestPrices.propTypes = {
    name: PropTypes.string.isRequired,
};

export default LowestPrices;
