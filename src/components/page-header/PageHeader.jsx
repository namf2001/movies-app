import React from "react";
// import scss
import "./page-header.scss";
import bg from "../../assets/image/bg.jpeg";

const PageHeader = (props) => {
	return <div className="page-header" style={{backgroundImage: `url(${bg})`}}>
        <h2>{props.children}</h2>
    </div>;
};

export default PageHeader;
