import colors from "tailwindcss/colors";

export const convertDataToHtml = (blocks) => {
	var convertedHtml = ``;
	if (blocks !== undefined || blocks !== null) {
		blocks?.map((block) => {
			switch (block.type) {
				case "header":
					convertedHtml += `<h${block.data.level} style="font-weight:600; margin:20px 0px;">${block.data.text}</h${block.data.level}>`;
					break;
				case "embed":
					convertedHtml += `<div><iframe width="100%" height="400" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
					break;
				case "paragraph":
					convertedHtml += `<p style="margin:20px 0px">${block.data.text} </p>`;
					break;
				case "delimiter":
					convertedHtml += `<div style="margin:auto">* * *</div>`;
					break;
				case "image":
					convertedHtml += `<img src="${block.data.file.url}" style="width: 100%; max-height: 600px; margin:20px 0px; object-fit:contain" /><div style="text-align:center">${block.data.caption}</div>`;
					break;
				case "checklist":
					convertedHtml += `<style>
							.custom-checkbox:checked + label:before {
									background-color: ${colors.gray[900]} !important;
							}
						</style>`;
					convertedHtml += `<ul style="list-style-type:none; padding-left: 0;">`;
					block.data.items.forEach((item) => {
						const isChecked = item.checked ? "checked" : "";
						convertedHtml += `<li><input type="checkbox" ${isChecked}> ${item.text}</li>`;
					});
					convertedHtml += `</ul>`;
					break;
				case "list":
					convertedHtml += `<ul style="margin:10px">`;
					block.data.items.forEach(function (li) {
						convertedHtml += `<li style="list-style:inside; margin:4px 0px;">${li}</li>`;
					});
					convertedHtml += "</ul>";
					break;
				case "hyperlink":
					covertedHtml += `<a href=${block.data.link} target="_blank" style="color:black; margin:4px 0px; font-weight:bold; text-decoration:underline; "></a>`;
					break;
				case "link":
					covertedHtml += `<a href=${block.data.link} style="color:black; margin:4px 0px; font-weight:bold; text-decoration:underline; "></a>`;
					break;
				case "gist":
					convertedHtml += `<div class="gistcontainer" id="gist1"><script src=${block.data.gistLink}></script></div>`;
					break;
				case "code":
					convertedHtml += `<div class="codeContainer"><pre><code>${block.data.code}</code></pre></div>`;
					break;
				case "button":
					convertedHtml += `<div style="margin:10px 0px; cursor:pointer;"><a target="_blank" href=${block.data.link}><button style="background:black; text-decoration: none; color: white; border-radius:4px; display:flex;justify-content: center; margin: auto; text-align:center; padding:10px; border:none">${block.data.text}</button></a></div>`;
				default:
					convertedHtml += "";
					console.log("Unknown block type", block);
					break;
			}
		});
	}
	return convertedHtml;
};

export const convertHtmlToData = (html) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const blocks = [];

	doc.body.childNodes.forEach((node) => {
		switch (node.nodeName.toLowerCase()) {
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6":
				blocks.push({
					type: "header",
					data: {
						level: parseInt(node.nodeName[1]),
						text: node.innerText.trim(),
					},
				});
				break;
			case "p":
				blocks.push({
					type: "paragraph",
					data: {
						text: node.innerText.trim(),
					},
				});
				break;
			case "img":
				blocks.push({
					type: "image",
					data: {
						file: { url: node.src },
						caption: node.alt ? node.alt : "",
					},
				});
				break;
			case "ul":
				const ulItems = [];
				node.querySelectorAll("li").forEach((liNode) => {
					ulItems.push(liNode.innerText.trim());
				});
				blocks.push({
					type: "list",
					data: {
						style: "unordered",
						items: ulItems,
					},
				});
				break;
			case "ol":
				const olItems = [];
				node.querySelectorAll("li").forEach((liNode) => {
					olItems.push(liNode.innerText.trim());
				});
				blocks.push({
					type: "list",
					data: {
						style: "ordered",
						items: olItems,
					},
				});
				break;
			// Add support for other HTML elements as needed
			default:
				console.log(`Unsupported HTML element: ${JSON.stringify(node)}`);
				break;
		}
	});

	return blocks;
};
