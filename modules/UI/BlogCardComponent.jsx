import { ActionIcon, Avatar, Button, createStyles } from "@mantine/core";
import { CopyButton } from "./ShareButton";
import router from "next/router";
import colors from "tailwindcss/colors";
import { Hourglass, MoveLeft, Sigma } from "lucide-react";
import { stripHtml } from "string-strip-html";
import { convertDataToHtml } from "utils/hooks/convertDataToHtml";
import { useSelector } from "react-redux";

const BlogCard = ({ blog }) => {
	const {
		userReducer: { loggedInUserData },
	} = useSelector((state) => state);
	const { classes: styles } = useStyles();
	return (
		<div className="relative bg-white ">
			<div className="p-2">
				<ActionIcon onClick={() => router.push("/profile")}>
					<MoveLeft size={12} color={colors.gray[800]} />
				</ActionIcon>
			</div>
			<div className="p-2 flex justify-between gap-2 items-center my-2 ">
				<div className="flex justify-start gap-2 items-center">
					<div className="border rounded-full border-gray-200">
						<Avatar
							src={loggedInUserData?.userImage}
							className="rounded-full cursor-pointer"
							alt={loggedInUserData?.userName}
							size={32}
						/>
					</div>
					<span>{loggedInUserData?.userName}</span>
				</div>
				<div className="flex justify-start items-center gap-2 ">
					<p className="font-light text-xs flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
						<Sigma size={18} color={colors.gray[400]} />
						<span>
							{
								stripHtml(convertDataToHtml(blog?.editorContent?.blocks))
									.result.trim()
									.split(/\s+/).length
							}
						</span>{" "}
						words
					</p>
					<p className="font-light text-xs flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-md hover:bg-gray-50  cursor-pointer ">
						<Hourglass size={18} color={colors.gray[400]} />
						<span>
							{Math.round(
								stripHtml(convertDataToHtml(blog?.editorContent?.blocks))
									.result.trim()
									.split(/\s+/).length / 225
							)}
						</span>{" "}
						min read
					</p>
				</div>
			</div>
			<div className="my-4 px-4">
				<p className="text-4xl font-handwritten">
					{blog.title ? blog?.title : blog?.publicAt}
				</p>
				{blog?.description && (
					<p className="text-2xl">
						{blog?.description ? blog?.description : null}
					</p>
				)}
				{blog?.bannerImage && (
					<img
						src={blog.bannerImage}
						alt="Banner"
						className="w-full max-h-96 min-h-40 object-cover mb-4"
					/>
				)}
				{blog?.publicAt && (
					<p className="text-xs font-light">{blog?.publicAt}</p>
				)}
			</div>
			<div className="px-4 min-h-screen mb-4">
				<div
					dangerouslySetInnerHTML={{
						__html: blog?.htmlContent,
					}}
					className={styles.content}
				/>
			</div>
			<div className="p-3 flex justify-between items-center">
				<CopyButton
					size={24}
					text={`https://localhost:3001/${router.asPath}`}
				/>
				<Button
					size="xs"
					onClick={() => router.push("/")}
					variant="subtle"
					color="gray"
					className="text-gray-800 hover:text-black"
				>
					Blog
				</Button>
			</div>
		</div>
	);
};

export default BlogCard;

const useStyles = createStyles((theme) => ({
	content: {
		"& a": {
			color: colors.indigo[500],
		},
		"& a:hover": {
			color: colors.indigo[800],
		},
		"& ul li a": {
			color: colors.indigo[500],
		},
		"& ul li a:hover": {
			color: colors.indigo[800],
		},
	},
}));
