// I created a new js file just for affecting elements on the page that were not specifically for arena as that file was getting too long and cluttered.

// I wanted to add a scroll bar at the top of the page in js so I asked ChatGPT how that is done but chatGPT was verbose and used the const variable so I looked at the following articles in addition: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event, https://www.w3schools.com/jsref/prop_element_scrollheight.asp, https://www.w3schools.com/jsref/obj_window.asp.
// I will explain how I undertsand each line of code below.

// This finds the html element with id "scroll-bar" and places it in the variable.
let scrollBar = document.getElementById("scroll-bar");

// The EventListener in this case is scroll because everytime a user scrolls this fires this functions
window.addEventListener("scroll", () => {
  console.log("scrollY", window.scrollY);

  console.log("inner-height", window.innerHeight);
  console.log("scroll-height", document.body.scrollHeight);
  // This calculates the scrollable distance down the page.
  let adjustedPageHeight = document.body.scrollHeight - window.innerHeight;
  // Mathmatically claculates the scroll distance into a percentage.
  let scrollPosition = (window.scrollY / adjustedPageHeight) * 100;
  // Using style property access the CSS of the scrollBar and affect the width property. The width chnages as the user scrolls down the page with the progress bar.
  scrollBar.style.width = `${scrollPosition}%`;
});

// Found this article from:https://www.geeksforgeeks.org/javascript/queryselector-vs-getelementbyid/. It explains that the differences between using querySelctor vs. getElementbyID so I sued document.getElementById to get the specific ids for each media-type block in the ul elements in the HTML to store as variables. Instead of hardcoding it, it allows js to dynamically fetch the media types from arena to sort in the right sections based on media type.
let imageBlocks = document.getElementById("image-blocks");
let videoBlocks = document.getElementById("video-blocks");
let textBlocks = document.getElementById("text-blocks");
let audioBlocks = document.getElementById("audio-blocks");
let header = document.querySelector("header");
// console.log("header.scrollHeight", header.scrollHeight);

// I had an issue with my nav to each section where the page would scroll pass the header and directly into the content. With help from a tutor and W3 schools article on scroll-margin https://www.w3schools.com/cssref/css_pr_scroll-margin.php. I used js style property to set the scrollMarginTop on each content section. This adds 700px of space so that when a user clicks the nav link, it doesnt scroll past the header.
imageBlocks.style.scrollMarginTop = `${700}px`;
videoBlocks.style.scrollMarginTop = `${700}px`;
textBlocks.style.scrollMarginTop = `${700}px`;
audioBlocks.style.scrollMarginTop = `${700}px`;

let stickyHeaderElement = document.querySelector(".sticky-header");
let bannerVideoElement = document.querySelector(".banner-video");

let sectionObserver = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    stickyHeaderElement.classList.replace("visible", "hidden");
    setTimeout(() => {
      stickyHeaderElement.style.display = "none";
    }, 1000);
  } else {
    stickyHeaderElement.classList.replace("hidden", "visible");
    stickyHeaderElement.style.display = "block";
  }
});

sectionObserver.observe(bannerVideoElement);

// Attribute for settimeout and classlist.replace
