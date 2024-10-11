import { css } from "styled-components";

const createFlexStyle = (
    justifyContent = "center",
    alignItems = "center",
    flexDirection = "row",
) => css`
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    flex-direction: ${flexDirection};
`;

export const flexCenterStyle = createFlexStyle();
export const flexBetweenStyle = createFlexStyle("space-between");
export const flexAroundStyle = createFlexStyle("space-around");
export const flexStartStyle = createFlexStyle("flex-start");
export const flexAlignStartStyle = createFlexStyle("center", "flex-start");
export const flexAlignEndStyle = createFlexStyle("center", "flex-end");
export const IconClickStyle = css`
    cursor: pointer;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;
export const IconStyle = css`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
`;
