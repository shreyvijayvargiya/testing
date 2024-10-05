import TurndownService from "turndown";

export const converHTMLToMarkdown = (htmlContent) => {
	const turndownService = new TurndownService();

	turndownService.remove("style");
	turndownService.addRule("checkbox", {
		filter: "input",
		replacement: function (content, node) {
			if (node.getAttribute("type") === "checkbox") {
				return node.checked ? "[x]" : "[ ]";
			}
			return "";
		},
	});
	return turndownService?.turndown(htmlContent);
};

