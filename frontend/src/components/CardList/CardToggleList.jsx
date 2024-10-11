import CardToggle from "../Toggle/CardToggle/CardToggle";
import * as S from "./CardList.styled";
import PropTypes from "prop-types";
import { getAllergyImage } from "../../util/get-allergy-image";

const CardToggleList = ({ data, userAllergyList }) => {
    return (
        <S.CardList>
            {data.map((item) => (
                <CardToggle
                    key={item.commonCodeNum}
                    code={item.commonCodeNum}
                    imgUrl={getAllergyImage(item.commonCodeNum)}
                    text={item.commonCodeName}
                    isClicked={userAllergyList.includes(item.commonCodeNum)}
                />
            ))}
        </S.CardList>
    );
};

CardToggleList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
    userAllergyList: PropTypes.arrayOf(PropTypes.string),
};

export default CardToggleList;
