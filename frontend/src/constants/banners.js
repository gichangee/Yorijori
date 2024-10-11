import PizzaImg from "../img/pizza.png";
import BibimImg from "../img/bibim.png";
import TacoImg from "../img/taco.png";

export const getBanners = () => [
    {
        subTitle: "쉽게 만드는 홈메이드",
        title: "페퍼로니 피자",
        navLink: "#",
        imgUrl: PizzaImg,
        backgroundColor: "#d42525",
        pointColor: "#f7d860",
    },
    {
        subTitle: "비빔 비빔 ♪ 비트 주세요",
        title: "간단식사 비빔밥",
        navLink: "#",
        imgUrl: BibimImg,
        backgroundColor: "#f7d860",
        pointColor: "#4b8f29",
    },
    {
        subTitle: "집 안에서 세계 일주",
        title: "하드 타코",
        navLink: "#",
        imgUrl: TacoImg,
        backgroundColor: "#4b8f29",
        pointColor: "#d42525",
        fontColor: "#ffec8b",
    },
];
