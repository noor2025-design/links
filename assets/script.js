
// I used ChatGPT to understand how to add a scroll bar at the top of the page with js and I also looked at the following articles in addition: https://www.w3schools.com/jsref/prop_win_scrolly.asp, https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event, https://www.w3schools.com/jsref/prop_element_scrollheight.asp, https://www.w3schools.com/jsref/obj_window.asp.
// I will explain how I understand each line of code below.

// This finds the html element with id "scroll-bar" and places it in the variable.
let scrollBar = document.getElementById("scroll-bar");
// The EventListener in this case is scroll because everytime a user scrolls this fires this function.
window.addEventListener("scroll", () => {
 
  // This calculates the scrollable distance down the page.
  let adjustedPageHeight = document.body.scrollHeight - window.innerHeight;
  // Mathmatically calculates the scroll distance into a percentage.
  let scrollPosition = (window.scrollY / adjustedPageHeight) * 100;
  // Using style property access the CSS of the scrollbar and affect the width property. The width changes as the user scrolls down the page with the progress bar.
  scrollBar.style.width = `${scrollPosition}%`;
});

// Found this article from:https://www.geeksforgeeks.org/javascript/queryselector-vs-getelementbyid/. It explains that the differences between using querySelector vs. getElementbyID so I used document.getElementById to get the specific id's for each media-type block in the <ul> elements in the HTML to store as variables. Instead of hardcoding it, it allows js to dynamically fetch the media types from arena to sort in the right sections based on media type.
let imageBlocks = document.getElementById("image-blocks");
let videoBlocks = document.getElementById("video-blocks");
let textBlocks = document.getElementById("text-blocks");
let audioBlocks = document.getElementById("audio-blocks");
let videoSection = document.getElementById("video-section")
let header = document.querySelector("header");


// I had an issue with my nav to each section where the page would scroll pass the header and directly into the content. With help from a tutor and W3 schools article on scroll-margin https://www.w3schools.com/cssref/css_pr_scroll-margin.php. I used js style property to set the scrollMarginTop on each content section. This adds different px values for section of space so that when a user clicks the nav link, it doesn't scroll past the section header.
imageBlocks.style.scrollMarginTop = "350px";
videoSection.style.scrollMarginTop = "155px";
textBlocks.style.scrollMarginTop = "300px";
audioBlocks.style.scrollMarginTop = "300px";


let stickyHeaderElement = document.querySelector(".sticky-header");
let bannerVideoElement = document.querySelector(".banner-video");
let isFirstTrigger = true
let sectionObserver = new IntersectionObserver(([entry]) => {
if (isFirstTrigger) {
    isFirstTrigger = false
    return
}
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

/* I asked ChatGPT how to show and hide a sticky header on scroll using IntersectionObserver.
   A tutor helped me better understand how entry.isIntersecting detects when the banner
   enters or leaves the viewport and how to structure the conditional logic.
   The isFirstTrigger variable prevents the observer from triggering immediately on page load.
   When the banner is visible, classList.replace() swaps "visible" for "hidden"
   to trigger the fade-out animation, and setTimeout delays display:none
   so the animation can complete before the element is removed from layout.
   When the banner is no longer intersecting, the header becomes visible again.
   I also reviewed these articles https://www.w3schools.com/jsref/met_win_settimeout.asp,https://developer.mozilla.org/en-US/docs/Web/API/Element/classList. */

let backToTop = document.querySelector(".back-to-top")
backToTop.addEventListener("click",()=>{
    window.scrollTo({
  top: 0,
  left: 0,
  behavior: "smooth",
});
})
///* This selects the back-to-top button and adds a click event listener. When clicked, window.scrollTo smoothly scrolls the page to the top instead of jumping instantly. */
// I referenced this article https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo 