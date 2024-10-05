import React, { useRef, useState } from "react";
import { Avatar, Button, createStyles, Tabs } from "@mantine/core";
import { LoadingSkeletonCard } from "modules";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import router from "next/router";
import colors from "tailwindcss/colors";
import { toast } from "react-toastify";
import { LayoutGrid, PlusCircleIcon, RabbitIcon, Rss } from "lucide-react";
import { BlogCards } from "./BlogCards";
import {
	createBlogApi,
	getAllBlogsApi,
	deleteBlogApi,
} from "packages/api/blogApi";

const DashboardPage = () => {
	const {
		userReducer: { loggedInUserData, isUserLoggedIn },
	} = useSelector((state) => state);

	const containerRef = useRef(null);
	const { classes } = useStyles();

	const [removeBlog, setRemoveBlog] = useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [newBlogLoader, setNewBlogLoader] = useState(false);

	const {
		data: userAllBlogs,
		isLoading,
		refetch,
	} = useQuery(
		[`${loggedInUserData.userId}-allBlogs`],
		async () => await getAllBlogsApi(),
		{ enabled: isUserLoggedIn }
	);

	const handleRemoveBlog = async () => {
		await deleteBlogApi(removeBlog.id);
		setShowDeleteConfirm(false);
		toast.success("blog removed");
		refetch();
	};

	const createNewBlog = async () => {
		setNewBlogLoader(true);
		const newBlogId = await createBlogApi();
		router.push(`/blog/${newBlogId}`);
		setNewBlogLoader(false);
	};

	const PublicBlogCards = () => {
		const data = userAllBlogs?.filter((item) => item.public);
		if (data.length === 0) {
			return (
				<div className="flex justify-center items-center flex-col py-20">
					<RabbitIcon className="animate-bounce" size={44} />
					<span>No public blogs found</span>
					<Button
						variant="filled"
						onClick={createNewBlog}
						loading={newBlogLoader}
						color="dark"
						my="xs"
						size="xs"
						leftIcon={<PlusCircleIcon size={18} color={colors.gray[100]} />}
					>
						Create blog
					</Button>
				</div>
			);
		}
		return (
			<BlogCards
				data={data}
				showDeleteConfirm={showDeleteConfirm}
				setShowDeleteConfirm={setShowDeleteConfirm}
				setRemoveBlog={setRemoveBlog}
				removeBlog={handleRemoveBlog}
				refetch={refetch}
			/>
		);
	};

	const DraftsBlogCards = () => {
		const data = userAllBlogs?.filter((item) => !item.public);
		if (data.length === 0) {
			return (
				<div className="flex justify-center items-center flex-col py-20">
					<RabbitIcon className="animate-bounce" size={44} />
					<span>No drafts found</span>
					<Button
						variant="filled"
						onClick={createNewBlog}
						color="dark"
						loading={newBlogLoader}
						my="xs"
						size="xs"
						leftIcon={<PlusCircleIcon size={18} color={colors.gray[100]} />}
					>
						Create blog
					</Button>
				</div>
			);
		}
		return (
			<BlogCards
				data={data}
				showDeleteConfirm={showDeleteConfirm}
				setShowDeleteConfirm={setShowDeleteConfirm}
				setRemoveBlog={setRemoveBlog}
				removeBlog={handleRemoveBlog}
				refetch={refetch}
			/>
		);
	};

	return (
		<div className="md:w-full bg-whiteText sm:w-full xxs:w-full xs:w-full border border-gray-200 rounded-xl">
			<div className={classes.container} ref={containerRef}>
				<div className={`${classes.body}`}>
					<div className="md:w-1/2 sm:w-full xxs:w-full xs:w-full mx-auto ">
						<div className="w-full px-4 py-8 rounded-md">
							<img
								src={loggedInUserData?.userImage}
								className="rounded-full cursor-pointer w-10 h-10"
								alt={loggedInUserData?.userName}
							/>
							<p>{loggedInUserData.userName}</p>
						</div>
					</div>
					<Tabs
						defaultValue="drafts"
						color="dark"
						variant="outline"
						className="md:w-full sm:w-full xxs:w-full xs:w-full mx-auto"
					>
						<Tabs.List className="md:w-1/2 sm:w-full xxs:w-full xs:w-full mx-auto">
							<Tabs.Tab value="drafts" icon={<LayoutGrid size={18} />}>
								Drafts
							</Tabs.Tab>
							<Tabs.Tab value="published" icon={<Rss size={18} />}>
								Published
							</Tabs.Tab>
						</Tabs.List>
						<Tabs.Panel
							value="drafts"
							pt="xs"
							className="md:w-1/2 sm:w-full xxs:w-full xs:w-full mx-auto"
						>
							{isLoading
								? [1, 2, 3, 4, 5, 6].map((item) => (
										<div
											className="mx-auto shadow-xl bg-white border border-gray-300 my-6 px-3"
											key={item}
										>
											<LoadingSkeletonCard />
										</div>
									))
								: !isLoading && userAllBlogs && <DraftsBlogCards />}
						</Tabs.Panel>

						<Tabs.Panel
							value="published"
							pt="xs"
							className="md:w-1/2 sm:w-full xxs:w-full xs:w-full mx-auto"
						>
							{isLoading
								? [1, 2, 3, 4, 5, 6].map((item) => (
										<div
											className="mx-auto shadow-xl bg-white border border-gray-300 my-6 p-3"
											key={item}
										>
											<LoadingSkeletonCard />
										</div>
									))
								: !isLoading && userAllBlogs && <PublicBlogCards />}
						</Tabs.Panel>
					</Tabs>
					<div className="md:w-1/2 my-2 sm:w-full xxs:w-full xs:w-full mx-auto"></div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;

const useStyles = createStyles(() => ({
	container: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	body: {
		height: "100%",
		width: "100%",
		overflowY: "scroll",
	},
	contentContainer: {
		"&> p > a": {
			color: colors.indigo[600],
			textDecoration: "underline",
			fontWeight: 700,
			"&:hover": {
				color: colors.indigo[600],
			},
		},
		"&> ul >li > a": {
			color: colors.indigo[600],
			textDecoration: "underline",
			"&:hover": {
				color: colors.indigo[800],
			},
		},
	},
}));
