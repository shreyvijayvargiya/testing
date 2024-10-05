import React from "react";
import { ActionIcon, Button, Menu, Modal } from "@mantine/core";
import { CalendarRangeIcon, EllipsisVertical, Pencil } from "lucide-react";
import { stripHtml } from "string-strip-html";
import { convertDataToHtml } from "utils/hooks/convertDataToHtml";
import colors from "tailwindcss/colors";
import { MdDelete } from "react-icons/md";
import router from "next/router";
import AccessComponent from "modules/AccessComponent";

export const BlogCards = ({
	data,
	setRemoveBlog,
	removeBlog,
	setShowDeleteConfirm,
	showDeleteConfirm,
	refetch,
}) => {
	return (
		<div className="overflow-y-auto overflow-x-hidden hide-scrollbar">
			{data?.map((blog) => {
				const readingTime = Math.round(
					stripHtml(convertDataToHtml(blog?.editorContent?.blocks))
						.result.trim()
						.split(/\s+/).length / 225
				);
				return (
					<div
						key={blog?.id}
						className={`py-4 hover:bg-gray-50 border-b border-gray-300 cursor-pointer`}
					>
						<div>
							<div className="px-4 py-2 flex justify-between items-center">
								<div className="flex justify-start gap-4 items-start">
									{blog.bannerImage && (
										<div>
											<img
												src={blog?.bannerImage}
												alt="Banner"
												className="w-20 h-20 object-cover border border-gray-400 rounded-md"
											/>
										</div>
									)}
									<div>
										<p className="text-xl font-sans">
											{blog?.title ? blog?.title : "Title is not given"}
										</p>
										<p className="text-md font-regular">
											{blog?.description
												? blog.description
												: "Please add description"}
										</p>
									</div>
								</div>
								<Menu shadow="md" width={200}>
									<Menu.Target>
										<ActionIcon size="sm" color="gray" variant="subtle">
											<EllipsisVertical />
										</ActionIcon>
									</Menu.Target>

									<Menu.Dropdown className="p-2">
										<Button
											size="sm"
											fullWidth
											color="gray"
											variant="subtle"
											className="text-gray-600 flex justify-start"
											onClick={() => {
												router.push("/blog/" + blog.id);
											}}
											leftIcon={<Pencil size={14} color={colors.gray[700]} />}
										>
											Edit blog
										</Button>

										<Button
											my="xs"
											color="gray"
											variant="subtle"
											fullWidth
											className="text-gray-600 flex justify-start"
											leftIcon={<MdDelete size={14} color={colors.gray[500]} />}
											size="sm"
											onClick={() => {
												setShowDeleteConfirm(!showDeleteConfirm);
												setRemoveBlog(blog);
											}}
										>
											Delete blog
										</Button>
										<AccessComponent blog={blog} refetch={refetch} />
									</Menu.Dropdown>
								</Menu>
							</div>
							<div className="px-4 mb-4">
								<div
									size="xs"
									color="gray"
									className="font-medium text-sm text-gray-500"
									variant="default"
									leftIcon={
										<CalendarRangeIcon size={18} color={colors.gray[900]} />
									}
								>
									{blog?.createdAt}
								</div>
								<div
									size="xs"
									color="gray"
									className="font-medium text-gray-600 text-sm"
									variant="default"
								>
									{readingTime > 0 && readingTime + "min read"}
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<Modal
				centered
				opened={showDeleteConfirm}
				onClose={() => {
					setShowDeleteConfirm(false);
					setRemoveBlog(null);
				}}
				classNames={{ root: "bg-none bg-opacity-100", close: "hidden" }}
				title={<p>Are you sure you want to delete this blog</p>}
			>
				<div className="flex justify-start items-center gap-2">
					<Button color="red" size="xs" variant="filled" onClick={removeBlog}>
						Yes
					</Button>
					<Button
						onClick={() => setShowDeleteConfirm(false)}
						color="dark"
						size="xs"
						variant="outline"
					>
						No
					</Button>
				</div>
			</Modal>
		</div>
	);
};
