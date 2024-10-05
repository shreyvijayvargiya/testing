import readingTime from "reading-time";

export const calculateReadingTime = (data) => {
	const totalContent = [];
	data?.filter((item) => {
		if (
			item.type === "header" ||
			item.type === "paragraph" ||
			item.type === "code" ||
			item.type === "image"
		) {
			const text = item.data?.text
				? item.data?.text
				: item?.data?.code || item?.data?.caption;
			totalContent.push(text);
		}
	});
	return Math.ceil(readingTime(totalContent.join("")).minutes);
};

export const calculateTotalCharactersCount = (data) => {
	let totalLength = 0;
	if (data !== undefined && data !== null && data.length > 0) {
		data?.forEach((item) => {
			if (
				item.type === "header" ||
				item.type === "paragraph" ||
				item.type === "code" ||
				item.type === "list"
			) {
				const text = item.data?.text ? item?.data?.text : item?.data?.code;
				totalLength = totalLength + text?.length;
			}
		});
		return totalLength;
	} else {
		return 0;
	}
};
