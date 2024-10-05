/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Avatar, Button } from "@mantine/core";
import router from "next/router";
import { useSelector } from "react-redux";
import LoginModal from "modules/Login/LoginModal";
import colors from "tailwindcss/colors";
import { PencilIcon } from "lucide-react";

const Navbar = ({ removeLogin, removeContact }) => {
	const {
		userReducer: { isUserLoggedIn, loggedInUserData },
	} = useSelector((state) => state);

	const openContactEmail = () => {
		const emailAddress = "mailto:shreyvijayvargiya26@gmail.com";
		window.open(emailAddress, "_blank");
	};

	const [show, setShow] = useState(false);

	const handleLoginClick = () => {
		if (isUserLoggedIn) {
			router.push("/");
		} else {
			setShow(!show);
		}
	};

	return (
		<div
			className={`py-2 px-4 lg:w-1/2 mx-auto md:border md:border-gray-200 md:w-full overflow-x-scroll rounded-full bg-white`}
			style={{ zIndex: 400 }}
		>
			<div className="flex justify-between items-center md:w-full mx-auto rounded-sm sm:w-full xxs:w-full xs:w-full">
				<div>
					<p
						className="text-2xl cursor-pointer py-0"
						onClick={() => router.push("/")}
					>
						Blogit
					</p>
				</div>
				<div className="flex justify-between items-center gap-2">
					<Button
						variant="filled"
						color="dark"
						onClick={handleLoginClick}
						className="rounded-full"
						size="sm"
						leftIcon={
							<PencilIcon
								size={14}
								color={colors.gray[300]}
								className="hover:text-white"
							/>
						}
					>
						{isUserLoggedIn ? "Write" : "Try"} Blogit
					</Button>
					{removeContact ? null : (
						<Button variant="unstyled" color="gray" onClick={openContactEmail}>
							Email me
						</Button>
					)}
					{removeLogin ? null : (
						<Button variant="filled" color="dark" onClick={handleLoginClick}>
							Login
						</Button>
					)}
					{isUserLoggedIn && (
						<Avatar
							src={loggedInUserData?.userImage}
							className="rounded-full border-2 border-black cursor-pointer"
							alt={loggedInUserData?.userImage}
							size="md"
							onClick={() => router.push("/dashboard")}
						/>
					)}
				</div>
			</div>
			<LoginModal
				open={show}
				setOpen={setShow}
				title="Please login to use blogit"
			/>
		</div>
	);
};

export default Navbar;
