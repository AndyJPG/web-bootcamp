let changeBackgroundButton = document.querySelector("button");
let websiteBody = document.querySelector("body");

changeBackgroundButton.addEventListener("click", () => {
    if (websiteBody.style.background == "white") {
        websiteBody.style.background = "pink";
    } else {
        websiteBody.style.background = "white";
    }
})