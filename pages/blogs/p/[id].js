import React from "react";
import Head from "next/head";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { PublishedBlog } from "components";
import { getPublicBlogByIdApi } from "packages/api/blogApi";

const PublicBlogPage = () => {
	const router = useRouter();
	const { id: blogId } = router.query;

	const { data, isLoading } = useQuery(
		[`publicBlog-${blogId}`, blogId],
		async () => {
			const results = await getPublicBlogByIdApi(blogId);
			return results;
		},
		{
			enabled: !!blogId,
		}
	);

	return (
		<div className="w-full h-full">
			<Head>
				<title>
					{data?.title ? data.title : `Blogit - ${data?.publicAt || ""}`}
				</title>
			</Head>
			{!isLoading && <PublishedBlog props={data} />}
		</div>
	);
};

export default PublicBlogPage;
