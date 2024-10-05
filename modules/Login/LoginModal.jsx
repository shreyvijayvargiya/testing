import React from "react";
import { Modal } from "@mantine/core";
import { LoginComponent } from "modules";

const LoginModal = ({ open, setOpen, title }) => {
	return (
		<Modal
			opened={open}
			onClose={() => setOpen(false)}
			centered
			classNames={{
				modal: "rounded-xl p-4 border-2  bg-white border-black",
				root: "bg-none",
				title: "text-xl",
			}}
			title={title ? title : "Please login to continue"}
		>
			<div>
				<div className="my-4">
					<p className="text-sm text-left text-gray-800">
						By continuing you agree to our terms of service and privacy policy.
					</p>
				</div>
				<LoginComponent setOpen={setOpen} />
				<br />
			</div>
		</Modal>
	);
};
export default LoginModal;
