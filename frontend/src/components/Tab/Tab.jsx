import * as S from "./Tab.styled";
import PropTypes from "prop-types";
import { useState } from "react";

const Tab = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <S.TabContainer>
            <S.TabButtons>
                {tabs.map((tab, index) => (
                    <S.TabButton
                        key={index}
                        onClick={() => setActiveTab(index)}
                        isActive={activeTab === index}
                    >
                        {tab.label}
                    </S.TabButton>
                ))}
            </S.TabButtons>
            <div>{tabs[activeTab].content}</div>
        </S.TabContainer>
    );
};

Tab.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
        }),
    ).isRequired,
};

export default Tab;
