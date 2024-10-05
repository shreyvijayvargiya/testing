import React from "react";
import { UserProfile } from "components";
import Head from "next/head";
import "firebase/firestore";
import { useSelector } from "react-redux";

const ProfilePage = () => {
	const {
		userReducer: { loggedInUserData },
	} = useSelector((state) => state);
	return (
		<div className="w-full h-full">
			<Head>
				<title>{loggedInUserData?.userName} Blogit profile</title>
			</Head>
			<UserProfile />
		</div>
	);
};

export default ProfilePage;
