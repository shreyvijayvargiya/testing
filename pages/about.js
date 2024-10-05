import React from "react";
import { Home } from "components";
import Head from "next/head";

const HomePage = () => {
	return (
		<div className="w-full h-full">
			<Head>
				<title>Blogit</title>
				<meta
					name="description"
					content="Blogit is the simplest everyday journaling app designed to streamline your writing experience."
				/>
				<meta
					name="keywords"
					content="Blogit, journaling, writing, productivity, mindfulness"
				/>
				<meta name="author" content="Shrey Vijayvargiya" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				<meta
					property="og:title"
					content="Blogit - Your Everyday Journaling App"
				/>
				<meta
					property="og:description"
					content="Blogit is the simplest everyday journaling app designed to streamline your writing experience."
				/>
				<meta property="og:image" content="your-product-banner" />
				<meta property="og:url" content="https://{your-domain-name}" />
				<meta property="og:type" content="website" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Blogit - Your Everyday writing App"
				/>
				<meta
					name="twitter:description"
					content="Blogit is the simplest everyday writing"
				/>
				<meta name="twitter:image" content="your-product-banner" />
			</Head>
			<Home />;
		</div>
	);
};
export default HomePage;
