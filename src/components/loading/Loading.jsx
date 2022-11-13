import React from "react";
// import scss
import "./loading.scss";

const Loading = () => {
	return (
		<div class="circ">
			<div class="load">Loading . . . </div>
			<div class="hands"></div>
			<div class="body"></div>
			<div class="head">
				<div class="eye"></div>
			</div>
		</div>
	);
};

export default Loading;
