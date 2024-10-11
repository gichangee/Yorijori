import CardToggleList from "../../CardList/CardToggleList";
import * as S from "./AllergyListForm.styled";
import { useAllergyList, useUserAllergyList } from "../../../hooks/useAllergy";

const AllergyListForm = () => {
    const { data: allergyList, isLoading } = useAllergyList();

    const { data: userAllergyList, isLoading: userListIsLoading } =
        useUserAllergyList();
    if (isLoading || userListIsLoading) return <div></div>;

    return (
        <S.AllergyListForm>
            <CardToggleList
                data={allergyList}
                userAllergyList={userAllergyList.map(
                    (item) => item.commonCodeNum,
                )}
            />
        </S.AllergyListForm>
    );
};

export default AllergyListForm;
