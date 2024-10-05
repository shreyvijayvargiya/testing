import React, { useState } from "react";
import { fuzzySearchBlog } from "utils/hooks/fuzzySearch";
import { Divider, Text, TextInput } from "@mantine/core";
import { Rabbit, SearchIcon } from "lucide-react";
import iconGenerator from "utils/hooks/iconGenerator";
import colors from "tailwindcss/colors";
import router from "next/router";

const SearchSpotlight = ({ allBlogs, setSearchModal }) => {
	const [value, setValue] = useState("");
	const [results, setResults] = useState(allBlogs);
	const [activeIndex, setActiveIndex] = useState(0);
	
	let saveTimeout;
	const handleSearch = () => {
		let data = [];
		const res = allBlogs ? fuzzySearchBlog(value, allBlogs) : [];
		res?.forEach((obj) => data.push(obj.item));
		setResults(data);
		setActiveIndex(0);
	};

	const onBlur = () => {
		if (saveTimeout) {
			clearTimeout(saveTimeout);
		}
		saveTimeout = setTimeout(() => {
			handleSearch();
		}, 200);
	};

	const SearchResults = () => {
		return (
			<div>
				{results !== null &&
					results?.map((item, index) => {
						const RandomIcon = iconGenerator(
							Math.round(Math.random() * 50) + 1
						);
						return (
							<div
								key={item.id}
								className={`my-2 rounded-md border p-2 cursor-pointer ${
									index === activeIndex
										? "bg-gray-50 border-black"
										: "border-gray-200"
								}`}
								onClick={() => {
									router.push(`/blog/${item.id}`);
									setSearchModal(false);
								}}
							>
								<div className="flex justify-between gap-2 items-center">
									<div className="flex justify-start gap-2 items-center">
										<RandomIcon size={18} />
										{item.title ? (
											<Text size="md">{item.title}</Text>
										) : (
											<Text>{item.createdAt}</Text>
										)}
									</div>
									{item.createdAt && <Text size="xs">{item.createdAt}</Text>}
								</div>
								{item.description && <Text size="sm">{item.description}</Text>}
							</div>
						);
					})}
			</div>
		);
	};

	return (
		<div>
			<div className="sticky top-0 left-0 right-0 py-2 bg-white">
				<TextInput
					color="gray"
					variant="default"
					value={value}
					tabIndex={0}
					icon={<SearchIcon size={18} />}
					autoFocus
					onKeyDown={onBlur}
					placeholder="Search your blog"
					fullWidth
					onChange={(e) => {
						const val = e.target.value;
						setValue(val);
					}}
					size="xl"
					classNames={{
						input:
							"border-b border-none border-gray-200 outline-none focus:outline-none focus:border-b focus:border-gray-400",
					}}
				/>
				<Divider />
			</div>
			<div className="p-2">
				<SearchResults />
				{results && results.length === 0 && (
					<div className="p-4">
						<Rabbit
							size={44}
							color={colors.gray[800]}
							className="animate-bounce"
						/>
						<p>No such blogs found</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchSpotlight;
