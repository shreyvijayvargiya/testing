import colors from "utils/config/colors";

export default class Message {
	static get toolbox() {
		return {
			title: "Message",
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
		};
	}

	save(blockContent) {
		const value = blockContent.childNodes[0].value;
		return {
			message: value,
		};
	}

	render() {
		this.wrapper = document.createElement("div");
		const input = document.createElement("textarea");
		this.wrapper.classList.add("message-box");
		this.wrapper.appendChild(input);
		input.placeholder = "Enter the message";
		input.width = "100%";
		input.classList.add("message-input");
		input.className = "message-input";
		input.style = `background:transparent; width:100%; outline:none; padding:10px; border:1px solid ${colors.gray[800]}; border-radius:4px `;
		input.value = this.data && this.data.message ? this.data.message : "";
		return this.wrapper;
	}
}
