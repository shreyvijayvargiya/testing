import React, { useState, useRef, useEffect } from "react";
import {
	Button,
	Avatar,
	Divider,
	Modal,
	Menu,
	ActionIcon,
	TextInput,
	Tooltip,
} from "@mantine/core";
import {
	Home,
	Search,
	CirclePlus,
	Trash2Icon,
	Ellipsis,
	Edit2Icon,
	PersonStanding,
	BinaryIcon,
} from "lucide-react";
import router from "next/router";
import NextLink from "next/link";
import colors from "tailwindcss/colors";
import LoginModal from "modules/Login/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import cookie from "cookie-cutter";
import { useMutation, useQuery } from "react-query";
import SearchSpotlight from "./SearchSpotlight";
import { toast } from "react-toastify";
import { removeUserFromStore } from "redux/action/action";
import { BsPerson } from "react-icons/bs";
import {
	createBlogApi,
	deleteBlogApi,
	getAllBlogsApi,
	updateBlogDetailsApi,
} from "packages/api/blogApi";
import { USER_ALL_BLOGS } from "redux/constants";

const Sidebar = () => {
	const {
		userReducer: { isUserLoggedIn, loggedInUserData },
	} = useSelector((state) => state);
	const inputRef = useRef(null);

	const [newTitle, setNewTitle] = useState("");
	const [isEditing, setIsEditing] = useState(null);

	const [searchModal, setSearchModal] = useState(false);
	const [showListDropdown, setShowListDropdown] = useState();
	const [loginModalShow, setLoginModalShow] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const { data: userAllBlogs, refetch } = useQuery(
		[`${loggedInUserData.userId}-allBlogs`],
		async () => await getAllBlogsApi(),
		{ enabled: isUserLoggedIn }
	);

	const deleteBlog = async (id) => {
		deleteBlogMutation.mutate(id);
	};

	const deleteBlogMutation = useMutation({
		mutationFn: (id) => deleteBlogApi(id),
		onSuccess: (id) => {
			setShowDeleteConfirm(false);
			refetch();
			toast.success("Blog deleted successfully");
		},
		onError: (error) => {
			setShowDeleteConfirm(false);
			toast.error(`Error deleting blog: ${error.message}`);
		},
	});

	const renameBlogMutation = useMutation(
		async (activeBlog) => {
			const { title, ...remainingValues } = activeBlog;
			const newBlog = { ...remainingValues, title: newTitle };
			return await updateBlogDetailsApi(
				activeBlog.id,
				loggedInUserData.userId,
				newBlog
			);
		},
		{
			onSuccess: () => {
				toast.success("Title updated");
				refetch();
				setIsEditing(null);
			},
			onError: () => {
				toast.error("Error updating title");
			},
		}
	);

	const handleRename = (blogId, title) => {
		setIsEditing(blogId);
		setNewTitle(title);
	};

	const handleSaveRename = (activeBlog) => {
		renameBlogMutation.mutate(activeBlog);
	};

	const LatestBlogs = () => {
		const result = userAllBlogs?.slice(0, 8);
		if (result && result?.length > 0) {
			return (
				<ul className="space-y-1 text-md px-2 list-disc">
					{result?.map((blog) => {
						useEffect(() => {
							if (isEditing == blog?.id && inputRef.current) {
								inputRef.current.focus();
							}
						}, [isEditing]);
						return (
							<li
								key={blog?.id}
								className="flex justify-between items-start text-md text-gray-800 cursor-pointer w-full hover:bg-gray-50 px-2 list-disc"
							>
								<div className="flex justify-start gap-1 items-center ">
									{isEditing === blog?.id ? (
										<TextInput
											ref={inputRef}
											size="md"
											variant="sublte"
											color="dark"
											value={newTitle}
											onChange={(e) => {
												const val = e.target.value;
												setNewTitle(val);
											}}
											onKeyPress={(e) => {
												if (e.key === "Enter") handleSaveRename(blog);
											}}
										/>
									) : (
										<div onClick={() => router.push(`/blog/${blog?.id}`)}>
											{blog?.title
												? blog?.title.substring(0, 50)
												: blog?.createdAt}
										</div>
									)}
								</div>
								<div>
									<Menu
										opened={showListDropdown === blog?.id}
										onClose={() => setShowListDropdown(false)}
										classNames="hover:bg-none"
										width={200}
									>
										<Menu.Target>
											<ActionIcon
												variant="subtle"
												color="gray"
												onClick={() => setShowListDropdown(blog?.id)}
											>
												<Ellipsis size={12} color={colors.gray[400]} />
											</ActionIcon>
										</Menu.Target>
										<Menu.Dropdown className="hover:bg-none">
											<Menu.Item
												onClick={() =>
													handleRename(blog?.id, blog?.title || blog?.createdAt)
												}
											>
												<div className="flex justify-start items-center gap-1 text-xs">
													<Edit2Icon size={12} color={colors.gray[800]} />
													Rename
												</div>
											</Menu.Item>
											<Menu.Item
												className="hover:bg-none"
												onClick={() => setShowDeleteConfirm(true)}
											>
												<div className="flex justify-start items-center gap-1 text-xs">
													<Trash2Icon size={12} color={colors.red[400]} />
													Delete
												</div>
											</Menu.Item>
										</Menu.Dropdown>
									</Menu>
								</div>
								<Modal
									opened={showDeleteConfirm}
									centered
									classNames={{ root: "bg-none" }}
									overlayColor="rgba(0, 0, 0, 0.02)"
									overlayOpacity={0.5}
									onClose={() => setShowDeleteConfirm(false)}
									title={<p>Are you sure you want to delete this blog</p>}
								>
									<div>
										<div className="flex justify-start items-center gap-2">
											<Button
												color="red"
												size="xs"
												variant="filled"
												onClick={() => deleteBlog(blog.id)}
											>
												Yes
											</Button>
											<Button
												onClick={() => setShowDeleteConfirm(false)}
												color="gray"
												size="xs"
												variant="outline"
											>
												No
											</Button>
										</div>
									</div>
								</Modal>
							</li>
						);
					})}
				</ul>
			);
		} else {
			return (
				<div className="text-center flex justify-start gap-2 px-4 items-center mx-auto">
					<BinaryIcon size={24} color={colors.gray[500]} />
					<p className="text-md text-gray-500">No blogs found!!</p>
				</div>
			);
		}
	};

	const { mutate: createBlogMutation, isLoading: createBlogLoader } =
		useMutation({
			mutationFn: () => {
				const data = createBlogApi(loggedInUserData?.userId);
				return data;
			},
			onSuccess: (req) => {
				const { id, ...newBlog } = req;
				dispatch({
					type: USER_ALL_BLOGS,
					payload: userAllBlogs.unshift({ id, ...newBlog }),
				});
				router.push("/blog/" + id);
				toast.success("Blog created successfully");
			},
			onError: (error) => {
				toast.error(`Error creating blog`);
			},
		});

	const createNewBlog = async () => {
		createBlogMutation();
	};

	const dispatch = useDispatch();

	return (
		<div className="w-full min-h-full sm:min-h-screen h-full hide-scrollbar relative bg-white md:border md:border-gray-200 md:rounded-2xl overflow-y-scroll flex flex-col justify-between items-start max-w-lg md:shadow-sm">
			<div className="w-full">
				<NextLink href="/">
					<p className="text-xl cursor-pointer px-3 pt-2 font-regular mt-1">
						Blogit
					</p>
				</NextLink>
				<Divider my="sm" />
				<div className="py-4">
					<Button
						color="gray"
						variant="subtle"
						size="md"
						fullWidth
						className="text-gray-700 hover:text-black rounded-none flex justify-between items-center"
						leftIcon={<Home size={20} />}
						onClick={() => router.push("/dashboard")}
					>
						Dashboard
					</Button>
					<Button
						color="gray"
						className="text-gray-700 hover:text-black flex justify-between items-center outline-none focus:outline-none"
						onClick={() => setSearchModal(true)}
						fullWidth
						size="md"
						variant="subtle"
						leftIcon={<Search size={20} />}
					>
						Search
					</Button>
					<Button
						color="gray"
						className="text-gray-700 hover:text-black flex justify-between items-center"
						fullWidth
						size="md"
						variant="subtle"
						leftIcon={<BsPerson size={20} />}
						onClick={() => router.push(`/profile`)}
					>
						Profile
					</Button>
					<Button
						color="gray"
						className="text-gray-700 hover:text-black flex justify-between items-center"
						fullWidth
						size="md"
						onClick={createNewBlog}
						variant="subtle"
						leftIcon={<CirclePlus size={18} color={colors.gray[900]} />}
					>
						Create new blog
					</Button>
				</div>
				<Divider />
				<div className="flex justify-between items-center px-2 my-3">
					<div className="flex justify-start items-center gap-2">
						<PersonStanding color={colors.gray[700]} />
						<p className="text-md">Latest Blogs</p>
					</div>
					<Tooltip label="Add new">
						<ActionIcon
							variant="subtle"
							color="gray"
							onClick={createNewBlog}
							size="lg"
							loading={createBlogLoader}
							className=""
						>
							<CirclePlus size={18} color={colors.gray[900]} />
						</ActionIcon>
					</Tooltip>
				</div>
				<LatestBlogs />
			</div>

			<div className="py-4 w-full">
				<Divider my="sm" />
				<div className="flex items-center justify-between mt-4 px-2">
					{isUserLoggedIn ? (
						<div className="flex items-center space-x-2">
							<Avatar
								className="uppercase"
								classNames={{
									placeholder: "bg-gray-50",
								}}
								radius={"xl"}
								alt={loggedInUserData?.userName}
								color="dark"
								variant="outline"
								size={"sm"}
							>
								{loggedInUserData?.userName.split("")[0] +
									loggedInUserData?.userName.split("")[1]}
							</Avatar>
							<p className="sm:text-xs">{loggedInUserData.userName}</p>
						</div>
					) : (
						<Button
							onClick={() => setLoginModalShow(true)}
							color="dark"
							size="sm"
							variant="filled"
						>
							Login
						</Button>
					)}
					{isUserLoggedIn && (
						<Button
							size="xs"
							color="dark"
							variant="subtle"
							className="hover:bg-gray-50 text-gray-800 hover:text-black"
							onClick={() => {
								dispatch(removeUserFromStore());
								cookie.set("uid", undefined);
								router.push("/");
							}}
						>
							Logout
						</Button>
					)}
				</div>
			</div>
			<LoginModal
				open={loginModalShow}
				setOpen={setLoginModalShow}
				title="Please login to use blogit"
			/>
			<Modal
				opened={searchModal}
				centered
				onClose={() => setSearchModal(false)}
				classNames={{
					title: "hidden",
					header: "hidden",
					modal:
						"opacity-100 h-3/4 overflow-scroll p-0 md:w-1/3 sm:w-full xs:w-full xxs:w-full",
				}}
			>
				<SearchSpotlight
					allBlogs={userAllBlogs}
					setSearchModal={setSearchModal}
				/>
			</Modal>
		</div>
	);
};

export default Sidebar;
