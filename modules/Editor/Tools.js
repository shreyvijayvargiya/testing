import app from "utils/firebase";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import CodeTool from "@editorjs/code";
import List from "@editorjs/list";
import Hyperlink from "editorjs-hyperlink";
import Paragraph from "@editorjs/paragraph";
import Delimiter from "@editorjs/delimiter";
import Checklist from "@editorjs/checklist";
import Gist from "./Plugins/Gist";
import Message from "./Plugins/Message";

export const uploadFile = async (file, userId) => {
	let storageRef = app
		.storage()
		.ref("Blogit/" + userId + "/images/" + file.name);
	var metadata = {
		contentType: file.type,
	};
	const imagePutUpdate = await storageRef.put(file, metadata);
	if (imagePutUpdate) {
		return app
			.storage()
			.ref("Blogit/" + userId + "/images/" + file.name)
			.getDownloadURL()
			.then((url) => {
				return {
					success: 1,
					file: {
						url: url,
					},
				};
			});
	}
};

export const getEditorTools = (userId) => {
	const tools = {
		header: {
			class: Header,
			shortcut: "CMD+SHIFT+H",
			config: {
				placeholder: "Enter heading",
				levels: [1, 2],
				defaultLevel: 1,
			},
		},
		checklist: {
			class: Checklist,
			inlineToolbar: true,
		},
		delimiter: {
			class: Delimiter,
			shortcut: "CMD + SHIFT + J",
		},
		embed: {
			class: Embed,
			inlineToolbar: true,
			shortcut: "CMD+E",
			config: {
				services: {
					twitter: true,
					youtube: true,
					github: {
						regex: /https?:\/\/gist.github.com\/([^\/\?\&]*)\/([^\/\?\&]*)/,
						embedUrl: "https://gist.github.com/<%= remote_id %>",
						html: '<iframe width="100%" height="350" src=""></iframe>',
						height: 300,
						width: 600,
						id: (groups) => groups.join("/"),
					},
					codesandbox: {
						regex: /https?:\/\/codesandbox.io\/s\/([^\/\?\&]*)/,
						embedUrl: "https://codesandbox.io/s/<%= remote_id %>/",
						html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
						height: 300,
						width: 600,
						id: (groups) => {
							groups.join("/");
						},
					},
				},
			},
		},
		code: {
			class: CodeTool,
			shortcut: "CMD+SHIFT+C",
		},
		image: {
			class: ImageTool,
			inlineToolbar: ["link", "bold", "hyperlink"],
			shortcut: "CMD + I",
			config: {
				embed: {
					display: true,
				},
				uploader: {
					uploadByFile: (file) => uploadFile(file, userId),
				},
			},
		},
		paragraph: {
			class: Paragraph,
			shortcut: "CMD+K",
			inlineToolbar: true,
			config: {
				placeholder: "Write the story",
			},
		},
		hyperlink: {
			class: Hyperlink,
			shortcut: "CMD+K",
		},
		list: {
			class: List,
			shortcut: "CMD+P",
			inlineToolbar: true,
			config: {
				inlineToolbar: true,
			},
		},
		gist: {
			class: Gist,
			shortcut: "CMD+G",
		},
		message: {
			class: Message,
			shortcut: "CMD+M",
		},
	};
	return tools;
};
