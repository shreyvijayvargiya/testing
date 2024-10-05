import colors from "utils/config/colors";

export default class Gist {
	static get toolbox() {
		return {
			title: "Gist",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
		};
	}

	save(blockContent) {
		const link = blockContent.childNodes[0].value;
		const caption = blockContent.childNodes[1].value;
		return {
			gistLink: link,
			caption: caption,
		};
	}

	render() {
		this.wrapper = document.createElement("div");
		const input = document.createElement("input");
		const captionInput = document.createElement("input");
		this.wrapper.classList.add("gist-link");
		this.wrapper.appendChild(input);
		this.wrapper.appendChild(captionInput);
		input.placeholder = "Enter gist link";
		input.width = "100%";
		input.classList.add("gist-input");
		input.className = "gist-input";
		input.style = `background:transparent; width:100%; outline:none; padding:10px; border:1px solid ${colors.gray[800]}; border-radius:4px `;
		input.value = this.data && this.data.url ? this.data.url : "";
		captionInput.placeholder = "Enter caption";
		captionInput.className = "caption-gist-input";
		captionInput.style = `background:transparent ; width:100%; outline:none; padding:4px; border:1px solid ${colors.gray[800]}; border-radius:4px; margin-top:4px`;
		captionInput.value =
			this.data && this.data.caption ? this.data.caption : "";
		return this.wrapper;
	}
}
