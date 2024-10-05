import { Button, Switch } from "@mantine/core";
import { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "react-toastify";
import NextLink from "next/link";
import { useMutation } from "react-query";
import {
	makeBlogPublicApi,
	removeBlogFromPublicApi,
} from "packages/api/blogApi";

const AccessComponent = ({ blog, refetch }) => {
	const [isPublic, setPublic] = useState(blog?.public);

	const makePublicMutation = useMutation(
		async () => {
			return await makeBlogPublicApi(blog.id);
		},
		{
			onSuccess: () => {
				setPublic(true);
				refetch();
				toast.success("Blog is public");
			},
			onError: (e) => {
				setPublic(false);
				console.log(e, "can't public the blog");
				toast.error("Can't make it public");
			},
		}
	);

	const removePublicMutation = useMutation(
		async () => {
			return await removeBlogFromPublicApi(blog.id);
		},
		{
			onSuccess: () => {
				setPublic(false);
				refetch();
				toast.success("This blog is private");
			},
			onError: () => {
				toast.error("Can't make it private");
			},
		}
	);

	const handlePublicPrivateSwitch = (event) => {
		const val = event.currentTarget.checked;
		setPublic(!isPublic);
		if (val) {
			makePublicMutation.mutate();
		} else {
			removePublicMutation.mutate();
		}
	};

	return (
		<div className="">
			{blog?.title?.length === 0 && (
				<span className="text-xs text-gray-800">
					Please add title to make this blog public
				</span>
			)}
			<div className="flex justify-start gap-1 items-center hover:bg-gray-50 cursor-pointer rounded-md px-2 py-1">
				<Switch
					checked={isPublic ? isPublic : false}
					color="dark"
					disabled={blog?.title?.length <= 0}
					onChange={handlePublicPrivateSwitch}
					classNames={{
						input: "bg-gray-50",
						root: "cursor-pointer",
					}}
				/>
				<p>Public</p>
			</div>
			{isPublic && (
				<div className="px-2 my-2 gap-1 flex justify-start items-center rounded-md flex-wrap">
					<NextLink
						href={`${window.location.origin}/blogs/p/${blog?.id}`}
						passHref
					>
						<a target="_blank" rel="noopener noreferrer">
							<Button variant="filled" color="dark" size="xs">
								Read blog
							</Button>
						</a>
					</NextLink>
					<Button
						variant="outline"
						color="dark"
						size="xs"
						my="xs"
						leftIcon={
							<BsLink45Deg color="black" style={{ color: "black" }} size={20} />
						}
						onClick={() => {
							navigator.clipboard.writeText(
								`${window.location.origin}/blogs/p/${blog?.id}`
							);
							toast.success("Link copied");
						}}
					>
						Copy Link
					</Button>
				</div>
			)}
		</div>
	);
};
export default AccessComponent;
