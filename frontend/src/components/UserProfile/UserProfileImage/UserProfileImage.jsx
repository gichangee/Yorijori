import PropTypes from "prop-types";
import * as S from "./UserProfileImage.styled";

/**
 * UserProfileImage 컴포넌트
 *
 * 프로필 이미지가 있으면 해당 이미지를 보여주고, 없으면 기본 아이콘을 렌더링합니다.
 * `size` props를 통해 이미지 또는 아이콘의 크기를 지정할 수 있으며, 기본값은 `5rem`입니다.
 *
 * @component
 * @example
 * // 프로필 이미지가 있는 경우
 * return (
 *   <UserProfileImage imageUrl={"https://example.com/profile.jpg"} size={"6rem"} />
 * )
 *
 * // 프로필 이미지가 없는 경우 (기본 아이콘 표시)
 * return (
 *   <UserProfileImage size={"4rem"} />
 * )
 *
 * @param {Object} props - UserProfileImage 컴포넌트의 props
 * @param {string} [props.imageUrl] - 표시할 프로필 이미지의 URL (optional)
 * @param {string} [props.size="5rem"] - 이미지 또는 아이콘의 크기 (optional)
 * @returns {JSX.Element} UserProfileImage 컴포넌트
 */
function UserProfileImage({ imageUrl, size = "5rem" }) {
    const ProfileComponent = imageUrl ? S.ProfileImageIcon : S.DefaultIcon;
    return <ProfileComponent src={imageUrl} size={size} />;
}

UserProfileImage.propTypes = {
    imageUrl: PropTypes.string,
    size: PropTypes.string,
};

export default UserProfileImage;
