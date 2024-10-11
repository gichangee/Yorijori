import * as S from "./FollowingModal.styled";
import UserProfileImage from "../UserProfileImage/UserProfileImage";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUnfollowUser } from "../../../hooks/useUser";
import { useEffect, useState } from "react";
import useUser, { useFollowUser } from "../../../hooks/useUser";
import { useUserStore } from "../../../store/userStore";

const isFollowing = (user, id) => {
    if (!user || !user.followings) return false;
    return user.followings.some(
        (following) => String(following.id) === String(id),
    );
};

const FollowingItem = ({ member }) => {
    const navigate = useNavigate();

    const { isLoading: isLoadingUser } = useUser();

    const { mutate: followUser } = useFollowUser(member.id);
    const { mutate: unfollowUser } = useUnfollowUser(member.id);
    const user = useUserStore((state) => state.user);

    const [isFollow, setIsFollow] = useState(false);
    const [buttonText, setButtonText] = useState("팔로우");

    useEffect(() => {
        if (user && user.followings && member.id) {
            const followingStatus = isFollowing(user, member.id);
            setIsFollow(followingStatus);
            setButtonText(followingStatus ? "팔로잉" : "팔로우");
        }
    }, [user, member.id]);

    if (isLoadingUser) return <div>Loading...</div>;

    const handleButtonClick = () => {
        if (!user) {
            return;
        }

        if (isFollow) {
            unfollowUser();
            setIsFollow(false);
            setButtonText("팔로우");
        } else {
            followUser();
            setIsFollow(true);
            setButtonText("팔로잉");
        }
    };

    return (
        <S.UserListItem key={member.id}>
            <UserProfileImage imageUrl={member.profileImage} size="42px" />
            <S.UserNickname onClick={() => navigate(`/user/${member.id}`)}>
                {member.nickname}
            </S.UserNickname>
            <S.FollowButton onClick={handleButtonClick}>
                {buttonText}
            </S.FollowButton>
        </S.UserListItem>
    );
};

FollowingItem.propTypes = {
    member: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        profileImage: PropTypes.string,
        nickname: PropTypes.string.isRequired,
    }).isRequired,
};

export default FollowingItem;
