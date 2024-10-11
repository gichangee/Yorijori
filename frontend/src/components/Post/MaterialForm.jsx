import { PropTypes } from "prop-types";
import {
    Container,
    Title,
    GroupContainer,
    InputField,
    GroupLabel,
    TitleContainer,
    SubTitle,
    InputContainer,
    AddGroupButton,
    ButtonContainer,
    RemoveButton,
} from "./MaterialForm.styled";

const MaterialForm = ({ materialGroups, setMaterialGroups }) => {
    const handleChange = (groupIndex, field, value) => {
        const newMaterialGroups = [...materialGroups];
        newMaterialGroups[groupIndex][field] = value; // groupName이나 subtitle, amount, unit을 직접 업데이트
        setMaterialGroups(newMaterialGroups);
    };

    const handleAddGroup = () => {
        setMaterialGroups([
            ...materialGroups,
            { name: "재료", subtitle: "", amount: "", unit: "" },
        ]);
    };

    const handleRemoveGroup = (groupIndex) => {
        const newMaterialGroups = [...materialGroups];
        newMaterialGroups.splice(groupIndex, 1);
        setMaterialGroups(newMaterialGroups);
    };

    return (
        <Container>
            <TitleContainer>
                <Title>재료 정보</Title>
                <SubTitle>레시피에 필요한 재료들을 입력해주세요</SubTitle>
            </TitleContainer>
            <form>
                {materialGroups.map((group, groupIndex) => (
                    <GroupContainer key={groupIndex}>
                        <GroupLabel
                            type="text"
                            placeholder="묶음 이름"
                            value={group.name}
                            onChange={(e) =>
                                handleChange(groupIndex, "name", e.target.value)
                            }
                        />
                        {groupIndex > 0 && (
                            <RemoveButton
                                type="button"
                                onClick={() => handleRemoveGroup(groupIndex)}
                            >
                                X
                            </RemoveButton>
                        )}
                        <InputContainer>
                            <InputField
                                type="text"
                                placeholder="재료명"
                                value={group.subtitle}
                                onChange={(e) =>
                                    handleChange(
                                        groupIndex,
                                        "subtitle",
                                        e.target.value,
                                    )
                                }
                            />
                            <InputField
                                type="text"
                                placeholder="수량"
                                value={group.amount}
                                onChange={(e) =>
                                    handleChange(
                                        groupIndex,
                                        "amount",
                                        e.target.value,
                                    )
                                }
                            />
                            <InputField
                                type="text"
                                placeholder="단위"
                                value={group.unit}
                                onChange={(e) =>
                                    handleChange(
                                        groupIndex,
                                        "unit",
                                        e.target.value,
                                    )
                                }
                            />
                        </InputContainer>
                    </GroupContainer>
                ))}
                <ButtonContainer>
                    <AddGroupButton type="button" onClick={handleAddGroup}>
                        묶음 추가
                    </AddGroupButton>
                </ButtonContainer>
            </form>
        </Container>
    );
};

MaterialForm.propTypes = {
    materialGroups: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            subtitle: PropTypes.string.isRequired,
            amount: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
        }),
    ).isRequired,
    setMaterialGroups: PropTypes.func.isRequired,
};

export default MaterialForm;
