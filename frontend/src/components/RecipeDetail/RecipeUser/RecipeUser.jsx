import PropTypes from "prop-types";
import Button from "../../Button/Button";
import UserProfileImage from "../../UserProfile/UserProfileImage/UserProfileImage";
import * as S from "./RecipeUser.styled";
import { useUserStore } from "../../../store/userStore";
import { followUser, unFollowUser } from "../../../api/userApi";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeUser({ user }) {
    const { isLoading } = useUserStore();
    const [flag, setFlag] = useState(false);
    const me = useUserStore((state) => state.user);
    const navigate = useNavigate();
    const handleFollow = async () => {
        if (!flag) {
            await followUser(user.id);
            setFlag(true);
        } else {
            await unFollowUser(user.id);
            setFlag(false);
        }
    };

    const checkIfFollowing = useCallback(() => {
        if (!me || !me.followings) return;

        const isFollowing = me.followings.some(
            (follower) => follower.id === user.id,
        );

        setFlag((prevFlag) => {
            if (prevFlag !== isFollowing) {
                return isFollowing;
            }
            return prevFlag;
        });
    }, [me, user]);

    useEffect(() => {
        if (!isLoading) {
            checkIfFollowing();
        }
    }, [isLoading, checkIfFollowing]);

    return (
        <S.UserContainer>
            <UserProfileImage imageUrl={user.profileImage} size={"6rem"} />
            <S.UserDetails>
                <S.UserInfo>
                    <S.UserName>{user.nickname}</S.UserName>
                    <S.UserHome onClick={() => navigate(`/user/${user.id}`)}>
                        {"🏠"}
                    </S.UserHome>
                    {me && me.id !== user.id && (
                        <Button
                            width={"4rem"}
                            height={"1.5rem"}
                            text={flag ? "팔로잉" : "팔로우"}
                            onClick={handleFollow}
                            type={"small"}
                        />
                    )}
                </S.UserInfo>
                <S.UserTalk>{user.summary}</S.UserTalk>
            </S.UserDetails>
        </S.UserContainer>
    );
}

RecipeUser.propTypes = {
    user: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        summary: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
};

export default RecipeUser;
