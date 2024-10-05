import { Button } from "@mantine/core";
import router from "next/router";

const PageNotFound = () => {
	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center p-10">
			<p className="text-2xl" style={{ fontFamily: "Comic Sans" }}>
				404 page not found
			</p>
			<Button
				onClick={() => router.push("/dashboard")}
				variant="filled"
				color="dark"
				my="sm"
			>
				Dashboard
			</Button>
		</div>
	);
};
export default PageNotFound;
