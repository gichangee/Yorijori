import Button from "../../Button/Button";
import * as S from "./LowestPrice.styled";
import PropTypes from "prop-types";

const LowestPrice = ({ data }) => {
    const strippedTitle = data.title.replace(/<\/?b>/gi, "");
    const formattedTitle =
        strippedTitle.length > 12
            ? strippedTitle.slice(0, 12) + "..."
            : strippedTitle;

    const handleClick = () => {
        window.open(data.link);
    };
    return (
        <>
            {data && (
                <S.Wrapper>
                    <S.Img src={data.image} alt="lowest price" />
                    <S.Title>{formattedTitle} </S.Title>
                    <S.Price>{data.lprice}원</S.Price>
                    <Button
                        text="구매"
                        type="small"
                        width="10%"
                        height="2rem"
                        onClick={() => handleClick()}
                    />
                </S.Wrapper>
            )}
        </>
    );
};

LowestPrice.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        lprice: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
    }),
};
export default LowestPrice;
