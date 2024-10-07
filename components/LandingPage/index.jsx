import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import LoginModal from "modules/Login/LoginModal";
import cookies from "next-cookies";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import { FiEdit, FiSearch, FiUser, FiFileText, FiUpload } from "react-icons/fi";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromStore } from "redux/action/action";
import { Code2Icon, ProjectorIcon } from "lucide-react";

const LandingPage = () => {
	const [loginModal, setLoginModal] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	const dispatch = useDispatch();
	const { isUserLoggedIn } = useSelector((state) => state.userReducer);

	useEffect(() => {
		const allCookies = cookies({});
		if (!isUserLoggedIn || allCookies?.uid === undefined) {
			router.push("/");
			dispatch(removeUserFromStore());
		} else if (isUserLoggedIn) {
			router.push("/dashboard");
		}
	}, [router.pathname]);

	return (
		<div className="bg-gray-50 bg-opacity-10 min-h-screen">
			<header className="mt-40 flex justify-center items-start flex-col text-black py-8 text-center md:w-1/2 sm:w-full xxs:w-full xs:w-full mx-auto">
				<h1 className="text-7xl font-bold">Blogit</h1>
				<h2 className="text-3xl"> Full-Stack Blog Platform Boilerplate</h2>
				<p className="mt-4 text-lg">
					A complete starter kit for building and deploying a full-stack blog
					platform with Firebase.
				</p>
				<span>Follow the below instructions to get started</span>
			</header>
			<section className="mx-auto md:w-1/2 w-full flex justify-start items-center gap-4 mb-10">
				<a
					href="https://shreyvijayvargiya.gumroad.com/l/blogit"
					target="_blank"
				>
					<Button
						color="dark"
						variant="filled"
						className="hover:translate-x-2 hover:scale-105 transform transition-all duration-200 ease-in"
						leftIcon={<Code2Icon size={18} />}
					>
						Get the boilerplate
					</Button>
				</a>
				<Button
					color="dark"
					variant="outline"
					className="hover:translate-y-2 hover:scale-105 transform transition-all duration-200 ease-in"
					leftIcon={<ProjectorIcon size={18} />}
					onClick={() => {
						setLoginModal(true);
					}}
				>
					Demo
				</Button>
			</section>
			<section className="bg-gray-50 bg-opacity-40 py-12">
				<div className="container px-6 md:w-1/2 sm:w-full xxs:w-full xs:w-full mx-auto">
					<h2 className="text-3xl font-semibold mb-8">
						Getting Started with Blogit
					</h2>
					<ol className="list-decimal list-inside text-lg mx-auto text-left">
						<li>
							Create a{" "}
							<a
								href="https://firebase.console.com"
								target="_blank"
								className="text-indigo-600 underline"
							>
								Firebase
							</a>{" "}
							project, enable Google Authentication, and get{" "}
							<span className="text-indigo-600 font-semibold">API keys</span>.
						</li>
						<li>
							Install Node.js if not installed (use{" "}
							<code className="text-orange-600">brew install node</code> for
							Mac).
						</li>
						<li>
							Clone the boilerplate, add Firebase keys to your{" "}
							<span className="text-yellow-600 font-semibold">.env file</span>.
						</li>
						<li>
							Run <code className="text-blue-600">yarn install</code> or{" "}
							<code className="text-blue-600">npm install</code> in the
							terminal.
						</li>
						<li>
							Start the development server using{" "}
							<code className="text-blue-600">yarn run dev</code>.
						</li>
						<li>
							Visit <code className="text-indigo-600">localhost:3001</code> to
							view your blog platform.
						</li>
					</ol>
				</div>
			</section>

			<section className="py-12">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-semibold mb-8 text-center">
						Core Features
					</h2>
					<div className="w-1/2 mx-auto space-y-4">
						<div className="bg-white p-6 shadow border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center">
							<FiFileText className="text-blue-600 text-4xl mr-4" />
							<div>
								<h3 className="text-xl font-semibold">View All Blogs</h3>
								<p className="text-gray-600">
									Browse drafts and published blogs, edit or publish your posts.
								</p>
							</div>
						</div>

						<div className="bg-white p-6 shadow border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center">
							<FiUser className="text-green-600 text-4xl mr-4" />
							<div>
								<h3 className="text-xl font-semibold">Profile Page</h3>
								<p className="text-gray-600">
									Showcase your public blogs on a personal profile.
								</p>
							</div>
						</div>

						<div className="bg-white p-6 shadow border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center">
							<FiEdit className="text-red-600 text-4xl mr-4" />
							<div>
								<h3 className="text-xl font-semibold">Advanced Blog Editor</h3>
								<p className="text-gray-600">
									Notion-like editor for easy writing with rich formatting
									tools.
								</p>
							</div>
						</div>

						<div className="bg-white p-6 shadow border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center">
							<FiUpload className="text-purple-600 text-4xl mr-4" />
							<div>
								<h3 className="text-xl font-semibold">Content Export</h3>
								<p className="text-gray-600">
									Export blog posts to HTML, Markdown, and plain text formats.
								</p>
							</div>
						</div>

						<div className="bg-white p-6 shadow border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center">
							<FiSearch className="text-yellow-600 text-4xl mr-4" />
							<div>
								<h3 className="text-xl font-semibold">Search Blogs</h3>
								<p className="text-gray-600">
									Search through blogs (drafts & published) using fuzzy search.
								</p>
							</div>
						</div>

						<div className="bg-white p-6 shadow border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center">
							<FaGoogle className="text-red-600 text-4xl mr-4" />
							<div>
								<h3 className="text-xl font-semibold">Authentication</h3>
								<p className="text-gray-600">
									Secure Google authentication via Firebase OAuth.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer className="bg-gray-50 text-black py-4 text-center">
				<p className="text-sm">
					&copy; 2024 Blogit. Built using React, Tailwind CSS, and Firebase.
				</p>
				<div className="flex justify-center mt-2">
					<a
						href="https://github.com/shreyvijayvargiya"
						className="mr-4"
						target="_blank"
					>
						<FaGithub className="text-xl" />
					</a>
					<a href="https://twitter.com/treyvijay" target="_blank">
						<FaTwitter className="text-xl" />
					</a>
				</div>
			</footer>
			<LoginModal open={loginModal} setOpen={setLoginModal}></LoginModal>
		</div>
	);
};

export default LandingPage;
