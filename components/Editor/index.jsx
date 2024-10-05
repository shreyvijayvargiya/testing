import React, { useState, useEffect, useCallback } from "react";
import colors from "utils/config/colors";
import { toast } from "react-toastify";
import { convertDataToHtml } from "utils/hooks/convertDataToHtml";
import { getCurrentDate } from "utils/hooks/currentDate";
import { useSelector } from "react-redux";
import LoginModal from "modules/Login/LoginModal";
import ExportComponent from "./ExportComponent";
import { Divider, Drawer, Text, createStyles } from "@mantine/core";
import AccessComponent from "modules/AccessComponent";
import router from "next/router";
import BlogEditor from "./BlogEditor";
import { useQuery } from "react-query";
import { useClickOutside } from "@mantine/hooks";
import {
	createBlogApi,
	getBlogByIdApi,
	updateBlogDetailsApi,
} from "packages/api/blogApi";

const AppEditor = ({ props }) => {
	const { isUserLoggedIn, loggedInUserData } = useSelector(
		(state) => state.userReducer
	);
	const clickRef = useClickOutside(() => setShowWingBar(false));
	const [blogId, setBlogId] = useState(props?.id);
	const [activeBlog, setActiveBlog] = useState(props);
	const [blocks, setBlocks] = useState(props?.editorContent);
	const [saveLoader, setSaveLoader] = useState(false);
	const [dateValue, setDateValue] = useState(
		props?.createdAt ? props?.createdAt : getCurrentDate(Date.now())
	);
	const [showModal, setShowModal] = useState(false);
	const [showWingBar, setShowWingBar] = useState(false);
	const { classes } = useStyles({ showWingBar });
	const currentDateAndTime = getCurrentDate(dateValue);

	const {
		data: blogData,
		isLoading,
		refetch,
	} = useQuery(
		[`${router.query.id}`, router.query.id],
		async () => {
			const response = await getBlogByIdApi(
				router.query.id,
				loggedInUserData?.userId
			);
			return response;
		},
		{
			enabled: isUserLoggedIn && loggedInUserData.userId !== undefined,
		}
	);

	useEffect(() => {
		const fetchData = async () => {
			if (blogData) {
				const { id, ...res } = blogData;
				setBlocks(res?.editorContent);
				setBlogId(id);
				setActiveBlog(res);
			}
		};
		fetchData();
	}, [loggedInUserData?.userId, router.query.id, isLoading, blogData]);

	const handleBlogSaveWithDelay = useCallback(
		async (blocksData) => {
			if (!isUserLoggedIn) {
				setShowModal(true);
			} else {
				setBlocks(blocksData.blocksData);
				setActiveBlog((prevState) => ({
					...prevState,
					title: blocksData?.title,
					description: blocksData?.description,
					bannerImage: blocksData?.bannerImage,
				}));
				handleBlogSave(blocksData);
			}
		},
		[blocks?.blocks]
	);

	const handleBlogSave = async (blocksData) => {
		setSaveLoader(true);
		const newBlog = {
			editorContent: blocksData.blocksData ? blocksData.blocksData : null,
			htmlContent: convertDataToHtml(blocksData?.blocksData?.blocks)
				? convertDataToHtml(blocksData?.blocksData?.blocks)
				: null,

			title: blocksData?.title ? blocksData?.title : null,
			description: blocksData?.description ? blocksData?.description : null,
			bannerImage: blocksData?.bannerImage ? blocksData?.bannerImage : null,
		};
		if (!dateValue) {
			toast.error("Please select a date");
			setSaveLoader(false);
			return;
		} else {
			try {
				if (blogId !== null || blogId !== undefined) {
					await updateBlogDetailsApi(blogId, {
						createdAt: currentDateAndTime ? currentDateAndTime : null,
						...newBlog,
					});
					return {
						...newBlog,
						createdAt: currentDateAndTime ? currentDateAndTime : null,
					};
				}
			} catch (error) {
				console.error("Error saving blog", error);
			} finally {
				if (!blogId) {
					const newBlog = await createBlogApi(loggedInUserData.userId);
					setBlogId(newBlog.id);
				}
				setSaveLoader(false);
			}
		}
	};

	const SettingsComponent = () => {
		return (
			<div
				className="flex justify-start items-center flex-col w-full h-screen border-t border-gray-200"
				ref={clickRef}
			>
				<div className="w-full">
					<div className="xl:px-4 md:px-4 sm:px-2 xxs:px-1 xs:px-1">
						<Text>Let's share your blog with others</Text>
						<AccessComponent
							blog={{
								id: blogId,
								htmlContent: blocks ? convertDataToHtml(blocks?.blocks) : "",
								editorContent: blocks,
								activeBlog,
								public: activeBlog?.public,
							}}
							refetch={refetch}
						/>
					</div>
					<Divider
						color={colors.gray[300]}
						my="sm"
						className="w-full"
						size="xs"
					/>
				</div>
				<ExportComponent
					blog={{
						id: blogId,
						htmlContent: blocks ? convertDataToHtml(blocks?.blocks) : "",
						editorContent: blocks,
						activeBlog,
						public: activeBlog?.public,
					}}
				/>
			</div>
		);
	};

	return (
		<div>
			<div className={classes.body}>
				<BlogEditor
					data={blocks}
					dateValue={dateValue}
					activeBlog={activeBlog}
					saveLoader={saveLoader}
					showSettings={showWingBar}
					setShowSettings={setShowWingBar}
					onSave={handleBlogSaveWithDelay}
				/>
			</div>
			<Drawer
				opened={showWingBar}
				position="right"
				classNames={{
					title: "text-xl",
					header: "px-2 mt-4",
					drawer: "overflow-scroll border-l border-gray-400",
				}}
				onClose={() => setShowWingBar(false)}
				title="Settings"
			>
				<SettingsComponent />
			</Drawer>
			<LoginModal
				removeCarousel
				setOpen={setShowModal}
				open={showModal}
				title="Please login to save the blog"
			/>
		</div>
	);
};
export default AppEditor;

const breakpoints = {
	xs: 480,
	sm: 768,
	md: 992,
	lg: 1200,
	xl: 1600,
};

const useStyles = createStyles((theme, props) => ({
	body: {
		height: "100%",
		padding: ".5rem",
		width: "100%",
	},
	wingBar: {
		position: "fixed",
		top: 0,
		bottom: 0,
		right: 0,
		height: "100vh",
		overflowY: "scroll",
		transition: "width 0.2s ease",
		[`@media (min-width: ${breakpoints.md}px)`]: {
			width: props.showWingBar ? "20%" : "0%",
		},
		[`@media (min-width: ${breakpoints.lg}px)`]: {
			width: props.showWingBar ? "19%" : 0,
		},
		[`@media (min-width: ${breakpoints.xl}px)`]: {
			width: props.showWingBar ? "15%" : 0,
		},
		[`@media (min-width: 1600px)`]: {
			width: props.showWingBar ? "16%" : 0,
		},
	},
	drawer: {
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		backgroundColor: "rgb(10, 10 ,10)",
		height: "70vh",
		border: `1px solid ${colors.gray[800]}`,
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: theme.spacing.md,
		},
	},
}));
