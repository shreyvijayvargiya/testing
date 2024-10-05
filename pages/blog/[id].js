import React from "react";
import Head from "next/head";
import { parse } from "cookie";
import { getBlogByIdApi } from "packages/api/blogApi";
import AppEditor from "components/Editor";

const SingleBlogPage = (props) => {
	return (
		<div className="w-full h-full">
			<Head>
				<title>
					Blogit -{" "}
					{props?.data?.title ? props.data.title : props?.data?.createdAt}
				</title>
			</Head>
			<AppEditor props={props?.data} />
		</div>
	);
};
export default SingleBlogPage;

export const getServerSideProps = async (context) => {
	try {
		const { req } = context;
		const { id } = context.query;
		const data = await getBlogByIdApi(id);
		return {
			props: {
				id: data?.id,
				data: data,
			},
		};
	} catch (error) {
		console.error("Error fetching server-side props:", error);
		return {
			props: {
				id: null,
				error: "Failed to fetch server-side props",
				editorContent: {
					time: new Date().getTime(),
					version: "2.25.0",
					blocks: [],
				},
			},
		};
	}
};
