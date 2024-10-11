import * as S from "./Footer.styled";

const Footer = () => {
    return (
        <S.Section>
            <S.FooterLogo src="/logo/logo_dark_green.svg" />
            <S.Info>
                <div>SSAFY 11기 특화 프로젝트 빅데이터 분산 C206</div>
                <div>김민주 이지영 김정민 박기창 남보우 신재건</div>
            </S.Info>
            <a
                href="https://ineedalotofmoney.notion.site/C206-75b122583009492eacf1d6147ad21937?pvs=4"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/logo/notion-logo.svg" />
            </a>
        </S.Section>
    );
};

export default Footer;
