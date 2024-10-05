import Fuse from "fuse.js";
import { stripHtml } from "string-strip-html";

export const fuzzySearchBlog = (value, allBlogs) => {
	const finalData = allBlogs?.map((item) => {
		return {
			...item,
			content: item.htmlContent ? stripHtml(item?.htmlContent).result : null,
		};
	});
	const fuse = new Fuse(finalData, {
		keys: ["title", "description", "content"],
	});
	return fuse !== undefined ? fuse?.search(value) : false;
};
