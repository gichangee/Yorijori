import styled from "styled-components";

const FloatingButton = () => {
    const Button = styled.button`
        font-family: "SUITSemiBold";
        position: fixed;
        bottom: 40px;
        right: 40px;
        width: 60px;
        height: 60px;
        background-color: white;
        border-radius: 50%;
        cursor: pointer;
        border: none;
        transform: rotate(90deg);
        z-index: 1000;
        box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);
        border: 0.063rem solid ${({ theme }) => theme.color.gray.lighter};
        text-align: center;
    `;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return <Button onClick={scrollToTop}>{"<"}</Button>;
};

export default FloatingButton;
