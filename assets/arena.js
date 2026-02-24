let channelSlug = "a-glimpse-of-life-history-and-culture-in-hong-kong"; // The “slug” is just the end of the URL.
let myUsername = "noor-abdus-saboor"; // For linking to your profile.

// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (channelData) => {
  // Target some elements in your HTML:
  let channelTitle = document.querySelector("#channel-title");
  let channelDescription = document.querySelector("#channel-description");
  let channelCount = document.querySelector("#channel-count");
  let channelLink = document.querySelector("#channel-link");

  // Then set their content/attributes to our data:
  channelTitle.innerHTML = "HONG KONG";
  channelDescription.innerHTML = channelData.description.html;
  channelCount.innerHTML = channelData.counts.blocks;
  channelLink.href = `https://www.are.na/channel/${channelSlug}`;
};

// Then our big function for specific-block-type rendering:
let renderBlock = (blockData) => {
  //   console.log(blockData.type);

  // To start, a shared `ul` where we’ll insert all our blocks
  let imageBlocks = document.querySelector("#image-blocks");
  let videoBlocks = document.querySelector("#video-blocks");
  let screeningVideoContainer = document.querySelector(
    ".screening-video-container",
  );
  let audioBlocks = document.querySelector("#audio-blocks");
  let textBlocks = document.querySelector("#text-blocks");
  let articleBlocks = document.querySelector("#article-blocks");

  
  // Links!
  if (blockData.type == "Link") {
    console.log("linkData", blockData);

    // Declares a “template literal” of the dynamic HTML we want.

    // One of the arena blocks that the owner of the channel created did not have a description so the console had an error of "null" so to prevent this error I had to add a "?" called optional chaining operator.
    // I pulled the syntax from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining.
    //  I learned that it accesses the blockData.description.html but if the description is null than it will cause errors but "?" instead it will provide an undefined.

    let linkDescription = "";
    if (blockData.description !== null) {
      linkDescription = blockData.description?.html;
    }
    let linkItem = `
			<li class="link-block">
				<figure>
					<picture>
						<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
						<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
						<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
					</picture>
                    <h3>${blockData.title}</h3>
					<figcaption>
						${linkDescription}
					</figcaption>
				</figure>
				<p><a href="${blockData.source.url}">See the original ↗</a></p>
			</li>
			`;

    // And puts it into the page!
    articleBlocks.insertAdjacentHTML("beforeend", linkItem);

    // More on template literals:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  }

  // Images!
  else if (blockData.type == "Image") {
    // …up to you!
    console.log("image-type", blockData);

    let imageItem = `
        <li>
            <picture class="image-block">
                <source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
                <source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
                <img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
            </picture>
            <div class="vintage-overlay"> 
            </div>
            <div class="image-overlay">
            ${blockData.title}
            </div>
            
        </li>
        `;

    imageBlocks.insertAdjacentHTML("beforeend", imageItem);
  }

  // Text!
  else if (blockData.type == "Text") {
    // …up to you!
    let textItem = `
<li class="text-block">
		${blockData.content.html}
	</li>
`;

    textBlocks.insertAdjacentHTML("beforeend", textItem);
    console.log("text-type", blockData);
  }

  // Uploaded (not linked) media…
  else if (blockData.type == "Attachment") {
    let contentType = blockData.attachment.content_type; // Save us some repetition.

    // Uploaded videos!
    if (contentType.includes("video")) {
      console.log("video-type", blockData);
      let isScreeningContainerEmpty =
        screeningVideoContainer.children.length === 0;
      console.log("isScreeningContainerEmpty", isScreeningContainerEmpty);

      if (isScreeningContainerEmpty) {
        let videoItem = `
			<p>${blockData.title}</p>
                <div class="screening-video-frame">
					<video controls src="${blockData.attachment.url}"></video>
                    </div>
                   
                    `;
        screeningVideoContainer.insertAdjacentHTML("beforeend", videoItem);
      } else {
        let videoItem = `
				<li>
                <div class="video-frame">
					<video controls src="${blockData.attachment.url}"></video>
                    </div>
                    </li>
                    `;

        videoBlocks.insertAdjacentHTML("beforeend", videoItem);
      }
      // …still up to you, but we’ll give you the `video` element:

      // More on `video`, like the `autoplay` attribute:
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
    }

    //  I needed to embed the pdf because it was displaying as it does in the browser with a preview and black background space on both sides. I found an article: https://tinytip.co/tips/html-pdf-params/ that provided instructions on how to fix that.
    // The iframe embeds the pdf like video/audio embeds on the page by using the js template literal to attach the pdf as a data object. The toolbar=0 hides the pdf view so there is no preview and the &view=FitH changes the view to fit horizontally which was the desired outcome.

    // Uploaded PDFs!
    else if (contentType.includes("pdf")) {
      // …up to you!
      let pdfItem = `
      <li class="pdf-block">
		<iframe src=${blockData.attachment.url}#toolbar=0&view=FitH></iframe>	
	</li>
      `;
      textBlocks.insertAdjacentHTML("beforeend", pdfItem);
      console.log("pdf-type", blockData);
    }

    // Uploaded audio!
    else if (contentType.includes("audio")) {
      console.log("audio-type", blockData);

      // …still up to you, but here’s an `audio` element:
      let audioItem = `
				<li class="audio-block">
                <p>${blockData.title}</p>
					<audio controls src="${blockData.attachment.url}"></audio>
				</li>
				`;

      audioBlocks.insertAdjacentHTML("beforeend", audioItem);

      // More on`audio`:
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
    }
  }

  // Linked (embedded) media…
  else if (blockData.type == "Embed") {
    let embedType = blockData.embed.type;

    // Linked video!
    if (embedType.includes("video")) {
      console.log("blockData", blockData);
      let isScreeningContainerEmpty =
        screeningVideoContainer.children.length === 0;
      console.log("isScreeningContainerEmpty", isScreeningContainerEmpty);
      if (isScreeningContainerEmpty) {
        let linkedVideoItem = `
				<p>${blockData.title}</p>
                    <div class="screening-video-frame">
                        ${blockData.embed.html}
                        <img src=${blockData.image.large.src} class="video-overlay">
                    </div>
                
                    `;
        screeningVideoContainer.insertAdjacentHTML(
          "beforeend",
          linkedVideoItem,
        );
      } else {
        let linkedVideoItem = `
				<li class="video-embed-block">
                    <div class="video-frame">
                        ${blockData.embed.html}
                        <img src=${blockData.image.large.src} class="video-overlay">
                    </div>
                </li>
                    `;

        videoBlocks.insertAdjacentHTML("beforeend", linkedVideoItem);
      }
      // …still up to you, but here’s an example `iframe` element:

      // More on `iframe`:
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
    }

    // There is an issue where an arena block is a image gallery from behance created by the owner of the channel that is being pulled in as linked audio instead of images but displayed as linked audio on the page. I learned from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean that a boolean expression checks for two conditions in this case it would be rich embed type and not behance using the && "AND" operator and ! to not include behance until I figure out how to solve this issue.

    // Linked audio!
    else if (
      embedType.includes("rich") &&
      !blockData.source.url.includes("behance")
    ) {
      // …up to you!

      let linkedAudioItem = `
				<li class="audio-embed-block">
					${blockData.embed.html}
				</li>
				`;

      audioBlocks.insertAdjacentHTML("beforeend", linkedAudioItem);
    } else if (
      embedType.includes("rich") &&
      blockData.source.url.includes("behance")
    ) {
      console.log("embed-behance-type", blockData);
      let behanceItem = `
				<li class="link-block">
				<figure>
					<picture>
						<source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
						<source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
						<img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
                        <h3>${blockData.title}</h3>
					</picture>
					<figcaption>
						${blockData.description?.html}
					</figcaption>
				</figure>
				<p><a href="${blockData.source.url}">See the original ↗</a></p>
			</li>
				`;
      articleBlocks.insertAdjacentHTML("beforeend", behanceItem);
    }
  }
};
// Attributing to above conditional statements for linked audio.When arena pulled in content through the API, the behance link was incorrectly sorted into the linked audio section because it came through as a rich embed the same type as linked audio embeds. To fix this, I wrote two conditions: the first checks if the embed is a rich type but does not include behance in the url and if so treats it as audio. The second checks if the embed is a rich type and includes behance in the url. A tutor informed me that behance should go in the text section rather than the image section although it appears as an image because the behance link comes with text like a title and description and are not being read as images by the API.

// A function to display the owner/collaborator info:
let renderUser = (userData) => {
  let channelUsers = document.querySelector("#channel-users"); // Container.

  let userAddress = `
		<address>
			<h3>${userData.name}</h3>
			<p><a href="https://are.na/${userData.slug}">Are.na profile ↗</a></p>
		</address>
		`;

  channelUsers.insertAdjacentHTML("beforeend", userAddress);
};

// Finally, a helper function to fetch data from the API, then run a callback function with it:
let fetchJson = (url, callback) => {
  fetch(url, { cache: "no-store" })
    .then((response) => response.json())
    .then((json) => callback(json));
};

// More on `fetch`:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch

// Now that we have said all the things we *can* do, go get the channel data:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}`, (json) => {
  console.log(json); // Always good to check your response!

  placeChannelInfo(json); // Pass all the data to the first function, above.
  renderUser(json.owner); // Pass just the nested object `.owner`.
});

// Get your info to put with the owner's:
fetchJson(`https://api.are.na/v3/users/${myUsername}/`, (json) => {
  console.log(json); // See what we get back.

  renderUser(json); // Pass this to the same function, no nesting.
});

// And the data for the blocks:
fetchJson(
  `https://api.are.na/v3/channels/${channelSlug}/contents?per=100&sort=position_desc`,
  (json) => {
    console.log(json); // See what we get back.

    // Loop through the nested `.data` array (list).
    json.data.forEach((blockData) => {
      // console.log(blockData) // The data for a single block.

      renderBlock(blockData); // Pass the single block’s data to the render function.
    });
  },
);
