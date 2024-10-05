const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = () => {
	return {
		env: {
			REACT_APP_FIREBASE_KEY: process.env.apiKey,
			REACT_APP_FIREBASE_DOMAIN: process.env.authDomain,
			REACT_APP_FIREBASE_PROJECT_ID: process.env.projectId,
			REACT_APP_FIREBASE_STORAGE_BUCKET: process.env.storageBucket,
			REACT_APP_ID: process.env.appId,
			REACT_APP_MEASUREMENT_ID: process.env.measurementId,
		},
		experimental: {
			esmExternals: false,
		},
		images: {
			domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
		},
		...withBundleAnalyzer({}),
	};
};
