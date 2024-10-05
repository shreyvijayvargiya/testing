import firebase from "firebase";
import { USER_ALL_BLOGS } from "redux/constants";
import { store } from "redux/store";
import { getCurrentDate } from "utils/hooks/currentDate";
import { sampleBlogGenerator } from "utils/hooks/blogGenerator";
import app from "utils/firebase";

export const createBlogApi = async () => {
	try {
		const db = firebase.firestore();
		const data = sampleBlogGenerator();
		const newBlog = {
			createdAt: getCurrentDate(Date.now()),
			bannerImage: "",
			title: data.title,
			description: data.description,
			tags: [],
			editorContent: [],
			timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
			htmlContent: "",
			public: false,
		};
		const dbRef = await db.collection("Blogit").add(newBlog);
		return { id: dbRef.id, ...newBlog };
	} catch (error) {
		console.error("Error creating blog:", error);
		throw new Error("Failed to create blog");
	}
};

export const getAllBlogsApi = async () => {
	try {
		const snapshot = await firebase
			.firestore()
			.collection("Blogit")
			.orderBy("timestamp", "desc")
			.get();
		const response = snapshot.docs.map((blog) => ({
			id: blog.id,
			...blog.data(),
		}));
		store.dispatch({ type: USER_ALL_BLOGS, payload: response });
		return response;
	} catch (error) {
		console.error("Error getting blogs:", error);
		throw new Error("Failed to get blogs");
	}
};

export const getBlogByIdApi = async (blogId) => {
	if (!blogId || typeof blogId !== "string") {
		throw new Error("Blog id is required");
	}
	try {
		const blog = await firebase
			.firestore()
			.collection("Blogit")
			.doc(blogId)
			.get();
		const data = await blog.data();
		const id = await blog.id;
		const convertedData = {
			...data,
			timestamp: data?.timestamp?.toDate()?.toISOString()
				? data?.timestamp?.toDate()?.toISOString()
				: null,
			lastEdited: data?.lastEdited?.toDate()?.toISOString()
				? data?.lastEdited?.toDate()?.toISOString()
				: null,
		};
		return { ...convertedData, id };
	} catch (e) {
		console.error(e, "error");
		throw new Error("Failed to fetch blog");
	}
};

export const makeBlogPublicApi = async (blogId) => {
	if (!blogId || typeof blogId !== "string") {
		throw new Error("blog id is required");
	}
	const blogRef = firebase.firestore().collection("Blogit").doc(blogId);
	const batch = firebase.firestore().batch();
	batch.update(blogRef, { public: true });

	try {
		await batch.commit();
		return true;
	} catch (e) {
		console.error(e, "error");
		throw new Error("Failed to make blog public");
	}
};

export const removeBlogFromPublicApi = async (blogId) => {
	if (!blogId || typeof blogId !== "string") {
		throw new Error("blog id is required");
	}
	const blogRef = firebase.firestore().collection("Blogit").doc(blogId);
	const batch = firebase.firestore().batch();
	batch.update(blogRef, { public: false });
	try {
		await batch.commit();
		return true;
	} catch (e) {
		console.error(e, "error");
		throw new Error("Failed to fetch Blogs");
	}
};

export const getAllPublishedBlogsApi = async () => {
	try {
		let publishedBlogs = [];
		const db = firebase
			.firestore()
			.collection("Blogit")
			.where("public", "==", true)
			.get();
		(await db).docs.forEach((doc) => {
			publishedBlogs.push({
				id: doc.id,
				...doc.data(),
			});
		});
		return publishedBlogs;
	} catch (e) {
		console.error(e, "error");
		throw new Error("Failed to fetch Blogs");
	}
};

export const getPublicBlogByIdApi = async (blogId) => {
	if (!blogId || typeof blogId !== "string") {
		throw new Error("Blog id is required in getPublicBlogByIdApi");
	}
	try {
		const dbRef = await firebase
			.firestore()
			.collection("Blogit")
			.doc(blogId)
			.get();
		return { ...dbRef.data(), id: dbRef.id };
	} catch (e) {
		console.error(e, "error");
		throw new Error("Failed to fetch blog");
	}
};

export const deleteBlogApi = async (blogId) => {
	if (!blogId || typeof blogId !== "string") {
		throw new Error("blog id is required");
	}
	try {
		await firebase.firestore().collection("Blogit").doc(blogId).delete();
		return true;
	} catch (e) {
		console.error(e, "error");
		throw new Error("Failed to delete blog");
	}
};

export const updateBlogDetailsApi = async (blogId, newBlog) => {
	if (!blogId || typeof blogId !== "string") {
		throw new Error("blog id is required");
	}

	const blogRef = firebase.firestore().collection("Blogit").doc(blogId);
	const batch = firebase.firestore().batch();

	batch.update(blogRef, {
		lastEdited: firebase.firestore.Timestamp.fromDate(new Date()),
		...newBlog,
	});
	try {
		await batch.commit();
		return true;
	} catch (e) {
		console.error(e, "error");
		throw new Error("Failed to fetch blog");
	}
};

export const uploadFileInFirestorageApi = async (file, userId) => {
	let storageRef = app
		.storage()
		.ref("blogit/" + userId + "/images/" + file.name);
	var metadata = {
		contentType: file.type,
	};
	const imagePutUpdate = await storageRef.put(file, metadata);
	if (imagePutUpdate) {
		return app
			.storage()
			.ref("blogit/" + userId + "/images/" + file.name)
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
