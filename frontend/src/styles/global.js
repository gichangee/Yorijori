import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import SUITBold from "../fonts/SUIT-Bold.ttf";
import SUITExtraBold from "../fonts/SUIT-ExtraBold.ttf";
import SUITExtraLight from "../fonts/SUIT-ExtraLight.ttf";
import SUITHeavy from "../fonts/SUIT-Heavy.ttf";
import SUITLight from "../fonts/SUIT-Light.ttf";
import SUITMedium from "../fonts/SUIT-Medium.ttf";
import SUITRegular from "../fonts/SUIT-Regular.ttf";
import SUITSemiBold from "../fonts/SUIT-SemiBold.ttf";
import SUITThin from "../fonts/SUIT-Thin.ttf";
import TossFaceFont from "../fonts/TossFaceFontMac.ttf";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'SUITBold';
    src: local('SUITBold'), url(${SUITBold}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'SUITExtraBold';
    src: local('SUITExtraBold'), url(${SUITExtraBold}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'SUITExtraLight';
    src: local('SUITExtraLight'), url(${SUITExtraLight}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'SUITHeavy';
    src: local('SUITHeavy'), url(${SUITHeavy}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'SUITLight';
    src: local('SUITLight'), url(${SUITLight}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'SUITMedium';
    src: local('SUITMedium'), url(${SUITMedium}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'SUITRegular';
    src: local('SUITRegular'), url(${SUITRegular}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'SUITSemiBold';
    src: local('SUITSemiBold'), url(${SUITSemiBold}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'SUITThin';
    src: local('SUITThin'), url(${SUITThin}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'TossFace';
    src: local('TossFaceFont'), url(${TossFaceFont}) format('truetype');
  }

  @font-face {
    font-family: 'LOTTERIADDAG';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/LOTTERIADDAG.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

  body {
    font-family: 'SUITRegular', sans-serif;
  }
`;

export default GlobalStyle;
