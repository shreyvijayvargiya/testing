import { useQuery } from "react-query";
import React from "react";
import colors from "tailwindcss/colors";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import iconGenerator from "utils/hooks/iconGenerator";
import { getAllPublishedBlogsApi } from "packages/api/blogApi";
import { createStyles, Divider, Skeleton } from "@mantine/core";

const UserProfile = () => {
	const { classes } = useStyles();
	const router = useRouter();
	const {
		userReducer: { loggedInUserData },
	} = useSelector((state) => state);

	const { data: userAllBlogs, isLoading } = useQuery(
		["userAllPublicBlogs"],
		async () => {
			const data = await getAllPublishedBlogsApi();
			return data;
		}
	);

	return (
		<div className="px-4 h-full w-full">
			<div className="rounded-md xl:w-3/4 lg:w-full md:w-full mx-auto sm:w-full xxs:w-full xs:w-full">
				<div className={classes.container}>
					<div className={`p-4`}>
						<div>
							{isLoading && userAllBlogs === null ? (
								<>
									<Skeleton height={100} width={100} my={"sm"} radius="full" />
									<Skeleton height={12} my={"sm"} radius="xl" />
									<Skeleton height={12} my={"sm"} radius="xl" />
								</>
							) : (
								<div>
									<img
										className="w-24 h-24 rounded-md"
										src={loggedInUserData?.userImage}
										alt={loggedInUserData?.userName}
									/>
									<p className={`text-2xl my-2 font-handwritten `}>
										{loggedInUserData?.userName}
									</p>
									<p className={`text-sm my-2 font-light`}>
										{loggedInUserData?.userDescription}
									</p>
								</div>
							)}
							{isLoading ? (
								<div>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
										<Skeleton height={12} my={"sm"} radius="xl" key={item} />
									))}
								</div>
							) : (
								<>
									<br />
									<p className="text-md font-sans">Blogs</p>
									{userAllBlogs &&
										userAllBlogs?.map((item) => {
											const RandomIcon = React.memo(
												iconGenerator(Math.floor(Math.random() * 50) + 1)
											);
											return (
												<div
													key={item.id}
													className="flex justify-between items-center my-2 hover:border group rounded-md p-2 cursor-pointer hover:scale-105"
													onClick={() => {
														router.push(
															`/blogs/p/${item.id}?title=${item?.createdAt?.replaceAll(" ", "-")}`
														);
													}}
												>
													<div className="flex justify-start items-center gap-2 ">
														<RandomIcon size={12} color={colors.gray[800]} />
														<p className="text-md font-serif text-gray-700 group-hover:text-black">
															{item.title ? item.title : item.createdAt}
														</p>
													</div>
													<Divider
														color={colors.gray[800]}
														variant="dashed"
														size="xs"
														className="w-60"
													/>
													<div
														className={`text-xs font-mono text-gray-700 group-hover:text-black`}
													>
														{item.createdAt}
													</div>
												</div>
											);
										})}
								</>
							)}
						</div>
					</div>
				</div>
				{!isLoading && (
					<div className="p-4">
						{userAllBlogs && userAllBlogs?.length === 0
							? "No data found"
							: null}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserProfile;

const useStyles = createStyles((theme) => ({
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
}));
