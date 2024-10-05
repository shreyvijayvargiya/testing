import { Button, Divider } from "@mantine/core";
import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";
import { IoLogoHtml5, IoLogoMarkdown, IoText } from "react-icons/io5";
import { toast } from "react-toastify";
import colors from "tailwindcss/colors";
import { converHTMLToMarkdown } from "utils/hooks/convertContent";

const ExportComponent = ({ blog }) => {
	const [downloadLoader, setDownloadLoader] = useState({
		htmlLoader: false,
		mardownLoader: false,
		textLoader: false,
	});

	const handleHTMLDownload = () => {
		setDownloadLoader((prevState) => ({ ...prevState, htmlLoader: true }));
		const blob = new Blob([blog?.htmlContent], { type: "text/html" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `blog-${blog?.createdAt}.html`;
		a.click();
		URL.revokeObjectURL(url);
		setDownloadLoader((prevState) => ({ ...prevState, htmlLoader: false }));
	};

	const handleMarkdownDownload = () => {
		setDownloadLoader((prevState) => ({ ...prevState, mardownLoader: true }));
		const markdownContent = converHTMLToMarkdown(blog?.htmlContent);
		const blob = new Blob([markdownContent], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `blog-${blog?.createdAt}.md`;
		a.click();
		URL.revokeObjectURL(url);
		setDownloadLoader((prevState) => ({ ...prevState, mardownLoader: false }));
	};

	const handleTextFileDownload = () => {
		setDownloadLoader((prevState) => ({ ...prevState, textLoader: true }));
		const plainTextContent = blog.htmlContent.replace(/<[^>]+>/g, "");
		const blob = new Blob([plainTextContent], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `blog-${blog?.createdAt}.txt`;
		a.click();
		URL.revokeObjectURL(url);
		setDownloadLoader((prevState) => ({ ...prevState, textLoader: false }));
	};

	return (
		<div className="w-full px-4">
			<p>Copy Blog content</p>
			<Button
				variant="outline"
				color="dark"
				leftIcon={<IoLogoMarkdown size={18} color={"black"} />}
				className="mb-4"
				onClick={() => {
					navigator.clipboard.writeText(
						converHTMLToMarkdown(blog?.htmlContent)
					);
					toast.success("Markdown copied");
				}}
			>
				Copy Mardown
			</Button>
			<Button
				variant="outline"
				color="dark"
				className="mb-4"
				onClick={() => {
					navigator.clipboard.writeText(blog?.htmlContent);
					toast.success("HTML copied");
				}}
				leftIcon={<IoLogoHtml5 size={18} color={colors.black} />}
			>
				Copy HTML
			</Button>
			<br />
			<Divider my="xs" />
			<p>Export blog file</p>
			<Button
				fullWidth
				variant="outline"
				color="dark"
				className="mb-4"
				onClick={handleHTMLDownload}
				loading={downloadLoader.htmlLoader}
				leftIcon={<BsDownload size={18} color={colors.black} />}
				rightIcon={<IoLogoHtml5 size={18} color={colors.black} />}
			>
				Download html File
			</Button>
			<Button
				fullWidth
				color="dark"
				className="mb-4"
				variant="outline"
				onClick={handleMarkdownDownload}
				loading={downloadLoader.mardownLoader}
				leftIcon={<BsDownload size={18} color={colors.black} />}
				rightIcon={<IoLogoMarkdown size={18} color={colors.black} />}
			>
				Download markdown file
			</Button>
			<Button
				fullWidth
				color="dark"
				variant="outline"
				className="mb-4"
				onClick={handleTextFileDownload}
				loading={downloadLoader.textLoader}
				rightIcon={<IoText size={18} color={colors.black} />}
				leftIcon={<BsDownload size={18} color={colors.black} />}
			>
				Download txt File
			</Button>
		</div>
	);
};
export default ExportComponent;
