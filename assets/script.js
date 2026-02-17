
// I created a new js file just for affecting elements on the page that were not specifically for arena as that file was getting too long and cluttered. 



// I wanted to add a scroll bar at the top of the page in js so I asked ChatGPT how that is done but chatGPT was verbose and used the const variable so I looked at the following articles in addition: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event, https://www.w3schools.com/jsref/prop_element_scrollheight.asp, https://www.w3schools.com/jsref/obj_window.asp.
// I will explain how I undertsand each line of code below. 

// This finds the html element with id "scroll-bar" and places it in the variable.
let scrollBar = document.getElementById("scroll-bar");

// The EventListener in this case is scroll because everytime a user scrolls this fires this functions
window.addEventListener("scroll", () => {
    console.log("scrollY", window.scrollY);
    
    console.log("inner-height",window.innerHeight );
    console.log("scroll-height", document.body.scrollHeight);
    // This calculates the scrollable distance down the page.
    let adjustedPageHeight = document.body.scrollHeight - window.innerHeight
    // Mathmatically claculates the scroll distance into a percentage. 
    let scrollPosition = (window.scrollY / adjustedPageHeight) * 100
    // Using style property access the CSS of the scrollBar and affect the width property. The width chnages as the user scrolls down the page with the progress bar. 
    scrollBar.style.width = `${scrollPosition}%`
})


let imageBlocks=document.getElementById("image-blocks")
let header=document.querySelector("header")
console.log("header.innerHeight", header.height);

imageBlocks.style.scrollMarginTop = `${header.height}px`