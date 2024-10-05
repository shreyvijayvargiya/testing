import React, { useEffect, useState } from "react";
import { Button, FileButton, TextInput } from "@mantine/core";
import {
	CalendarRange,
	ChevronLeft,
	ChevronRight,
	HeadingIcon,
	Hourglass,
	ImageUp,
	Sigma,
	Trash,
	WholeWordIcon,
} from "lucide-react";
import "tailwindcss/tailwind.css";
import colors from "tailwindcss/colors";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { uploadFileInFirestorageApi } from "packages/api/blogApi";
import { getCurrentDate } from "utils/hooks/currentDate";
import { calculateTotalCharactersCount } from "utils/hooks/calculateReadingTime";
import { convertDataToHtml } from "utils/hooks/convertDataToHtml";
import { stripHtml } from "string-strip-html";
import { useMutation } from "react-query";

export const EditorComponent = dynamic(() => import("../../modules/Editor"), {
	ssr: false,
	loading: () => null,
});

const BlogEditor = ({
	onSave,
	activeBlog,
	dateValue,
	saveLoader,
	showSettings,
	setShowSettings,
	removeSettingsButton,
	hideSaveButton,
}) => {
	const currentDate = getCurrentDate(dateValue);
	const [title, setTitle] = useState(activeBlog?.title);
	const [description, setDescription] = useState(activeBlog?.description);
	const [banner, setBanner] = useState(activeBlog?.bannerImage);
	const [editorBlocks, setEditorBlocks] = useState(activeBlog?.editorContent);
	const [totalWordCount, setTotalWordCount] = useState(
		calculateTotalCharactersCount("")
	);
	const [readingTime, setReadingTime] = useState(0);

	const { loggedInUserData } = useSelector((state) => state.userReducer);

	const handleBannerUpload = async (event) => {
		setShowProperties((prevState) => ({ ...prevState, bannerImage: true }));
		const file = event;
		if (file) {
			setBanner(URL.createObjectURL(file));
		}
		const fileUrl = await uploadFileInFirestorageApi(
			file,
			loggedInUserData.userId
		);
		setBanner(fileUrl.file.url);
	};

	const { mutate } = useMutation(async (newData) => {
		await onSave(newData);
	});

	const handleSubmit = async () => {
		mutate({
			title,
			description,
			bannerImage: banner,
			blocksData: editorBlocks,
		});
	};

	const handleEditorChange = (editorData) => {
		setEditorBlocks(editorData);
	};

	const removeBannerImage = async () => {
		setBanner(null);
		setShowProperties((prevState) => ({ ...prevState, bannerImage: false }));
	};

	let saveTimeout;

	const getTotalWordCount = () => {
		if (editorBlocks && editorBlocks?.blocks?.length > 0) {
			const totalWords = stripHtml(
				convertDataToHtml(editorBlocks.blocks)
			).result;
			const timeLength = totalWords.trim().split(/\s+/).length;
			setTotalWordCount(timeLength);
			setReadingTime(Math.ceil(timeLength / 225));
		} else {
			setTotalWordCount(0);
			setReadingTime(0);
		}
	};

	useEffect(() => {
		if (editorBlocks && saveTimeout) {
			clearTimeout(saveTimeout);
		} else {
			saveTimeout = setTimeout(() => {
				getTotalWordCount();
			}, 4000);
		}
	}, [title, description, editorBlocks, banner]);

	const [showProperties, setShowProperties] = useState({
		title: activeBlog?.title,
		description: activeBlog?.description,
		tags: activeBlog?.tags,
		bannerImage: activeBlog?.bannerImage,
	});

	return (
		<div className="overflow-y-scroll relative w-full bg-white m-1 border border-gray-200 rounded-xl min-h-full">
			<div className="w-full mx-auto py-4 overflow-y-scroll md:w-full xxl:w-full xxxl:w-3/4 xxxl:mx-auto xxs:mx-auto ">
				<div className="flex justify-between flex-wrap mx-auto w-full items-center py-2 md:px-16 sm:px-2 xxs:px-2 xs:px-2">
					<div className="flex justify-start items-center flex-wrap gap-2 w-full md:w-auto sm:px-2 xxs:px-2 xs:px-2 sticky top-0 left-0 right-0">
						<Button
							onClick={() => {
								setTitle("");
								setShowProperties((prevState) => ({
									...prevState,
									description: showProperties?.description,
									title: !showProperties?.title,
								}));
							}}
							variant="outline"
							color={showProperties?.title ? "red" : "dark"}
							size="xs"
							leftIcon={
								<HeadingIcon
									size={14}
									color={
										showProperties?.title ? colors.red[600] : colors.gray[900]
									}
								/>
							}
						>
							{showProperties?.title ? "Remove title" : "Add title"}
						</Button>
						<Button
							onClick={() => {
								setDescription("");
								setShowProperties((prevState) => ({
									...prevState,
									title: showProperties?.title,
									description: !showProperties?.description,
								}));
							}}
							leftIcon={
								<WholeWordIcon
									size={14}
									color={
										showProperties?.description
											? colors.red[600]
											: colors.gray[900]
									}
								/>
							}
							variant="outline"
							color={showProperties?.description ? "red" : "dark"}
							size="xs"
						>
							{showProperties?.description
								? "Remove description"
								: "Add description"}
						</Button>
						{banner ? (
							<Button
								leftIcon={<Trash size={18} color={colors.red[600]} />}
								variant="outline"
								color={showProperties?.bannerImage ? "red" : "dark"}
								size="xs"
								radius={"sm"}
								onClick={removeBannerImage}
							>
								Remove banner
							</Button>
						) : (
							<FileButton
								onChange={handleBannerUpload}
								accept="image/png, image/jpeg"
							>
								{(props) => (
									<Button
										color={showProperties?.bannerImage ? "red" : "dark"}
										variant="outline"
										size="xs"
										leftIcon={
											<ImageUp
												className=""
												size={18}
												color={colors.gray[800]}
											/>
										}
										{...props}
										className="cursor-pointer rounded-md p-1 px-2 text-sm"
									>
										Upload Banner
									</Button>
								)}
							</FileButton>
						)}
						{hideSaveButton ? null : (
							<Button
								variant="outline"
								color="dark"
								size="xs"
								loading={saveLoader}
								onClick={handleSubmit}
								classNames={{ root: "hover:bg-gray-50" }}
							>
								{saveLoader ? "Saving..." : "Saved"}
							</Button>
						)}
					</div>
					<div className="flex justify-start gap-2 items-center">
						<div className="flex justify-start gap-2 items-center rounded-md p-2 text-sm hover:bg-gray-50 border border-gray-100">
							<CalendarRange size={14} color={colors.gray[600]} />
							{currentDate}
						</div>
						<div className="flex justify-start gap-2 items-center rounded-md p-2 text-sm hover:bg-gray-50 border border-gray-100">
							<Sigma className="sum-icon" size={18} color={colors.gray[600]} />
							{totalWordCount} words
						</div>
						<div className="flex justify-start gap-2 items-center rounded-md p-2 text-sm hover:bg-gray-50 border border-gray-100">
							<Hourglass
								className="hour-glass"
								size={18}
								color={colors.gray[600]}
							/>
							{readingTime > 1 ? readingTime + " min" : "< 1" + " min"}
						</div>
						{removeSettingsButton ? null : (
							<div>
								<Button
									onClick={() => setShowSettings(!showSettings)}
									variant="outline"
									color="dark"
									size="xs"
									rightIcon={
										showSettings ? (
											<ChevronLeft size={18} />
										) : (
											<ChevronRight size={18} />
										)
									}
								>
									Settings
								</Button>
							</div>
						)}
					</div>
				</div>

				<div className="relative px-4 w-full mx-auto py-4">
					<div className="md:px-14">
						{showProperties.title && (
							<TextInput
								value={title}
								placeholder="Blog title"
								onChange={(event) => setTitle(event.currentTarget.value)}
								variant="unstyled"
								classNames={{ input: "text-2xl px-0 py-1" }}
							/>
						)}
						{showProperties.description && (
							<TextInput
								value={description}
								onChange={(event) => setDescription(event.currentTarget.value)}
								placeholder="Blog description"
								variant="unstyled"
								classNames={{ input: "text-lg px-0 py-1" }}
							/>
						)}
						{showProperties.bannerImage && (
							<div className="relative">
								<img
									src={banner}
									alt="banner image"
									className="w-full max-h-1/2 h-full object-cover rounded-md shadow-md my-2"
								/>
							</div>
						)}
					</div>
					<EditorComponent
						data={editorBlocks}
						userId={loggedInUserData.userId}
						onChange={handleEditorChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default BlogEditor;
