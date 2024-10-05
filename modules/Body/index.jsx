import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { createStyles } from "@mantine/core";
import Sidebar from "modules/Sidebar";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { removeUserFromStore } from "redux/action/action";
import cookies from "next-cookies";

const Body = ({ children }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [showSidebar, setShowSidebar] = useState(false);
	const { classes } = useStyles({ showSidebar });

	useEffect(() => {
		const allCookies = cookies({});
		if (allCookies?.uid === undefined) {
			router.push("/");
			setShowSidebar(false);
			dispatch(removeUserFromStore());
		} else if (router.pathname === "/") {
			setShowSidebar(false);
		} else {
			setShowSidebar(true);
		}
	}, [router.pathname]);

	return (
		<div className={classes.root} tabIndex="0">
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				icon={false}
				toastClassName="border-2 border-black"
				style={{ zIndex: 500 }}
			/>
			<Analytics />
			<div className={classes.container}>
				<nav className={classes.sidebar}>
					<Sidebar />
				</nav>
				<div className={classes.body}>{children}</div>
			</div>
		</div>
	);
};

export default Body;

const useStyles = createStyles((theme, { showSidebar }) => ({
	root: {
		width: "100%",
		overflow: "hidden",
		color: "black",
		margin: "auto",
		position: "relative",
		outline: "none",
	},
	container: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start",
		height: "100vh",
		width: "100%",
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: "block",
		},
		[`@media (min-width: 2400px)`]: {
			width: showSidebar ? "60%" : "0px",
			margin: "auto",
			gap: "10px",
		},
	},
	body: {
		height: "100%",
		width: "100%",
		overflowY: "auto",
	},
	sidebar: {
		height: "98vh",
		overflowY: "hidden",
		padding: 10,
		[`@media (max-width: ${theme.breakpoints.lg}px)`]: {
			width: "0%",
		},
		[`@media (min-width: ${theme.breakpoints.lg}px)`]: {
			width: showSidebar ? "25%" : "0px",
			display: showSidebar ? "block" : "none",
		},
		transition: "all 0.5s ease",
	},
}));
