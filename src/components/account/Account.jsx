import React from "react";
import AccountList from "../account-list/AccountList";
import PageHeader from "../page-header/PageHeader";
// import scss
import "./account.scss";

const Account = () => {
	return (
		<>
			<PageHeader>My Show</PageHeader>
			<div className="container">
				<div className="account">
					<AccountList />
				</div>
			</div>
		</>
	);
};

export default Account;
