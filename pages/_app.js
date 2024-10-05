import React, { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { Body } from "modules";
import { store, persistor } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import "../styles.css";
import "../public/nprogress.css";
import nprogress from "nprogress";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			staleTime: 60 * 60 * 1000,
		},
	},
});
function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	useEffect(() => {
		const handleStart = () => {
			nprogress.start();
		};
		const handleStop = () => {
			nprogress.done();
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
	}, [router.events]);

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<MantineProvider withGlobalStyles withNormalizeCSS>
						<Body pageProps={pageProps}>
							<Component {...pageProps} />
						</Body>
					</MantineProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
