import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { createStyles } from "@mantine/core";
import { getEditorTools } from "./Tools";

const CustomEditor = ({ data, onChange, userId }) => {
	let editor = null;
	const ref = useRef();
	const EDITOR_TOOLS = getEditorTools(userId);
	const { classes } = useStyles();

	useEffect(() => {
		const initializeEditor = async () => {
			if (!ref?.current) {
				editor = new EditorJS({
					holder: "editorjs-container",
					tools: EDITOR_TOOLS,
					placeholder: "Write something or press / to add text",
					data,
					async onChange(api) {
						const newData = await api.saver.save();
						onChange(newData);
					},
				});
				ref.current = editor;

				if (data && editor && data?.blocks) {
					await editor?.isReady;
					editor?.render(data);
				}
			}
		};

		initializeEditor();
		return () => {
			if (ref.current && ref.current.destroy) {
				ref.current.destroy();
			}
		};
	}, []);

	return (
		<div id="editorjs-container" className={`prose w-full ${classes.editor}`} />
	);
};
export default CustomEditor;

const useStyles = createStyles((theme) => ({
	editor: {
		"& .ce-block": {
			"& .ce-block__content": {
				maxWidth: "calc(100% - 120px) !important",
			},
			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				"& .ce-block__content": {
					maxWidth: "calc(100% - 20px) !important",
				},
			},
		},
		"& .ce-toolbar__content": {
			maxWidth: "calc(100% - 90px) !important",
			margin: "0 60px",
		},
	},
}));
