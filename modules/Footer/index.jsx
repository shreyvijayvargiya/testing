import router from "next/router";
import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { AiFillMail, AiFillTwitterCircle } from "react-icons/ai";

const AppFooter = () => {
	const openContactEmail = () => {
		const emailAddress = "mailto:shreyvijayvargiya26@gmail.com";
		window.open(emailAddress, "_blank");
	};

	return (
		<div className="w-full">
			<div className="lg:w-1/2 md:w-full mx-auto sm:w-full xs:w-full xxs:w-full xsm:w-full md:px-0 md:flex-row sm:flex-col-reverse xs:flex-col-reverse xsm:flex-col-reverse xxs:flex-col-reverse">
				<div className="w-full">
					<div className={`flex justify-between items-center p-3`}>
						<div>
							<p
								className="text-4xl cursor-pointer"
								onClick={() => router.push("/")}
							>
								Blogit
							</p>
							<span>Your simplest everyday writing app</span>
						</div>
						<div>
							<div></div>
						</div>
						<div className="flex justify-around items-center">
							<Button
								onClick={() => router.push("/")}
								variant="transparent"
								color="dark"
								size="sm"
							>
								About blogit
							</Button>
							<Button
								variant="transparent"
								color="dark"
								onClick={() => {
									window.open("https://twitter.com/@treyvijay");
								}}
							>
								<ActionIcon>
									<AiFillTwitterCircle size={24} color="black" />
								</ActionIcon>
							</Button>
							<Tooltip label="Email me">
								<ActionIcon>
									<Button
										variant="transparent"
										color="dark"
										onClick={openContactEmail}
									>
										<AiFillMail size={24} color="black" />
									</Button>
								</ActionIcon>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AppFooter;
