/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import cookie from "cookie-cutter";
import firebase from "firebase";
import { setUserInStore } from "redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Button, createStyles } from "@mantine/core";
import { storeUserInDatabaseApi } from "packages/api/userApi";
import colors from "tailwindcss/colors";

const LoginComponent = ({ setOpen }) => {
	const dispatch = useDispatch();
	const { isUserLoggedIn } = useSelector((state) => state.userReducer);
	const { classes: styles } = useStyles();

	const [error, setError] = useState({
		status: false,
		message: "Error message",
	});

	async function googleLogin() {
		const auth = firebase.auth();
		const googleProvider = new firebase.auth.GoogleAuthProvider();
		auth
			.signInWithPopup(googleProvider)
			.then(async (user) => {
				if (error.status) {
					setError({ status: false, message: "" });
				}
				cookie.set("uid", user.user.uid);
				if (user?.additionalUserInfo?.isNewUser) {
					await storeUserInDatabaseApi({
						id: user?.user?.uid,
						userEmail: user?.user?.email,
						userName: user?.user?.displayName,
						userImage: user?.user?.photoURL,
						userId: user?.user?.uid,
						phoneNumber: user?.user?.phoneNumber,
						...user?.credential,
						lastLoggedIn: Date.now(),
						profile: user?.additionalUserInfo?.profile,
					});
				}
				const userData = {
					userEmail: user.user.email,
					userName: user.user.displayName,
					userImage: user.user.photoURL,
					userId: user.user.uid,
					phoneNumber: user.user.phoneNumber,
				};
				dispatch(
					setUserInStore({
						userData,
						isUserLoggedIn: true,
					})
				);
				setOpen(false);
			})
			.catch((error) => {
				setError({
					status: true,
					message: "Error in logging",
				});
				console.log(error);
			});
	}

	return (
		<div className={styles.root}>
			<div className="pb-2 w-full">
				{!isUserLoggedIn ? (
					<div className="sm:pt-10 xxs:p-0 xs:pt-10 w-full">
						{error.status ? (
							<p className="text-red-500 mb-4 rounded-md text-sm text-center bg-red-200 my-1 p-2">
								{error.message}
							</p>
						) : null}
						<Button
							size="md"
							variant="gradient"
							fullWidth
							disabled={error.status}
							gradient={{ from: "black", to: colors.gray[900] }}
							onClick={googleLogin}
							classNames={{
								root: "text-white w-full",
							}}
							leftIcon={
								<AiFillGoogleCircle
									size={24}
									color={error.status ? colors.gray[400] : colors.gray[50]}
								/>
							}
						>
							Login with Google
						</Button>
					</div>
				) : (
					<p className="text-gray-300 text-center py-10">
						Your are already logged in....
					</p>
				)}
			</div>
		</div>
	);
};
export default LoginComponent;

export const useStyles = createStyles((theme) => ({
	root: {
		width: "100%",
		height: "auto",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		[`@media (max-width: ${theme.breakpoints.xs}px)`]: {
			flexDirection: "column",
		},
	},
	image: {
		opacity: "0.5",
		maxWidth: "30rem",
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			display: "none",
		},
	},
}));
