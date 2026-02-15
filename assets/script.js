
// Attribution: 
let scrollBar = document.getElementById("scroll-bar");

window.addEventListener("scroll", () => {
    console.log("scrollY", window.scrollY);
    
    console.log("inner-height",window.innerHeight );
    console.log("scroll-height", document.body.scrollHeight);
    
    let adjustedPageHeight = document.body.scrollHeight - window.innerHeight
    let scrollPosition = (window.scrollY / adjustedPageHeight) * 100
    // Using style property access the CSS of the scrollBar and affect the width property
    scrollBar.style.width = `${scrollPosition}%`
})