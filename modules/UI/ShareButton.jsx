import React from "react";

import colors from "utils/config/colors";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TwitterShareButton, LinkedinShareButton } from "react-share";
import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "react-toastify";
import { ActionIcon } from "@mantine/core";

export const TwitterButton = ({ url }) => {
	return (
		<ActionIcon color="secondary" data-tip="Twitter">
			<TwitterShareButton url={url} className="outline-none focus:outline-none">
				<AiOutlineTwitter
					style={{
						opacity: "1",
						color: colors.indigo[700],
					}}
					size={14}
				/>
			</TwitterShareButton>
		</ActionIcon>
	);
};

export const LinkedInButton = ({ url }) => {
	return (
		<ActionIcon color="secondary" data-tip="LinkedIn">
			<LinkedinShareButton
				url={url}
				className="outline-none focus:outline-none"
			>
				<AiFillLinkedin
					style={{
						opacity: "1",
						color: colors.green[700],
					}}
					size={14}
				/>
			</LinkedinShareButton>
		</ActionIcon>
	);
};

export const CopyButton = ({ text, size }) => {
	return (
		<ActionIcon
			style={{ outline: "none", padding: "4px" }}
			color="gray"
			data-tip="Copy link"
			onClick={() => toast.success("Link copied")}
		>
			<CopyToClipboard text={text} className="rounded-sm cursor-pointer">
				<BsLink45Deg style={{ color: "black" }} size={size ? size : 18} />
			</CopyToClipboard>
		</ActionIcon>
	);
};
