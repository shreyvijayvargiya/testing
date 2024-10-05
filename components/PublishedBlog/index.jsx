import React from "react";
import { Button, Overlay } from "@mantine/core";
import { BlogCard } from "modules";
import router from "next/router";
import { IoAddCircle } from "react-icons/io5";

const PublishedBlog = ({ props }) => {
	
	return (
		<div className="bg-white px-4">
			<div className="rounded-md md:w-full lg:w-3/4 mx-auto sm:w-full xxs:w-full xs:w-full">
				{props === undefined ? (
					<div className="relative">
						<span className="fixed top-1/3 md:left-80 md:right-80 sm:left-20 sm:right-20 xs:left-20 xs:right-20 xxs:left-20 xxs:right-20 text-center p-4 border-2 border-black ">
							This blog is not public, Ask the owner to make it public
						</span>
						<Overlay color="white" blur={"5px"} />
						<div className="fixed bottom-10 left-0 right-0 text-center mx-auto">
							<Button
								color="dark"
								size="md"
								variant="filled"
								leftIcon={<IoAddCircle color="white" size={20} />}
								onClick={() => router.push("/")}
							>
								Create blog
							</Button>
						</div>
					</div>
				) : (
					<BlogCard blog={props} />
				)}
			</div>
		</div>
	);
};
export default PublishedBlog;
