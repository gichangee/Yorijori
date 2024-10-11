import styled from "styled-components";
import UserSvg from "../../../assets/icons/user.svg";

export const DefaultIcon = styled(UserSvg)`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    color: ${({ theme }) => theme.color.gray.darker};

    border-radius: 50%;
    fill: currentColor;
`;

export const ProfileImageIcon = styled.img`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.08);
    object-position: center;
`;
