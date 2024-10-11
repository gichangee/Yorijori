import Button from "../../Button/Button";
import * as S from "./ModifyUserInfoForm.styled";
import PropTypes from "prop-types";
import { useUpdateUser } from "../../../hooks/useUser";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModifyUserInfoForm = ({ user }) => {
    const [nickname, setNickname] = useState(user.nickname);
    const [summary, setSummary] = useState(user.summary);

    const mutation = useUpdateUser();

    const onClickButton = (e) => {
        e.preventDefault();
        mutation.mutate(
            { nickname, summary },
            {
                onSuccess: () => {
                    toast.success("프로필이 변경되었어요.");
                },
                onError: () => {
                    toast.error("프로필 변경에 실패했어요");
                },
            },
        );
    };

    return (
        <S.ModifyUserInfoForm>
            <S.InputForm>
                <S.Label>닉네임</S.Label>
                <S.Input
                    autoFocus
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </S.InputForm>
            <S.InputForm height="150px">
                <S.Label>한 줄 소개</S.Label>
                <S.TextArea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
            </S.InputForm>
            <Button
                text="저장"
                type="small"
                width="140px"
                height="38px"
                onClick={onClickButton}
            />
        </S.ModifyUserInfoForm>
    );
};

ModifyUserInfoForm.propTypes = {
    user: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
    }).isRequired,
};

export default ModifyUserInfoForm;
