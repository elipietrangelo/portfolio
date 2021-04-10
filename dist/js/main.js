let menuTrigger = document.querySelector(".ef-navTrigger");
let menu = document.querySelector(".ef-nav");
let menuLink = document.querySelectorAll(".ef-nav__link");
let videoItem = document.querySelectorAll(".ef-videoItem [data-id]");
let youtubeEmbedTrigger = document.querySelectorAll(".ef-videoCard__video");
let modal = document.querySelector(".ef-modal");

menuTrigger.addEventListener("click", function () {
    menu.classList.toggle("-active");
    this.classList.toggle("-active");
});

Array.prototype.forEach.call(menuLink, function (el, i) {
    el.addEventListener("click", function () {
        if (el.getAttribute("href").substring(1, 2) === "#") {
            menu.classList.remove("-active");
            menuTrigger.classList.remove("-active");
        }
    });
});

Array.prototype.forEach.call(videoItem, function (el, i) {
    el.addEventListener("click", function () {
        let video = document.createElement("iframe");
        el.parentNode.appendChild(video).classList.add("embed-responsive-item");
        video.setAttribute("src", "https://www.youtube.com/embed/" + el.dataset.id);
        video.setAttribute("frameborder", "0");
        video.setAttribute("allow", "autoplay;encrypted-media;autoplay");
        video.setAttribute("allowfullscreen", "");
        el.parentNode.parentNode.parentNode.classList.add("-playing");
        el.parentNode.removeChild(el);
    });
});

function openModal(videoTrigger) {
    document.querySelector("BODY").classList.add("overflow-hidden");
    modal.classList.add("-active");
    modal.querySelector("IFRAME").setAttribute("src", "https://www.youtube.com/embed/" + videoTrigger.dataset.id);
    modal.addEventListener('transitionend', function() {
        modal.classList.add("-transitioned")
    });
}

function closeModal() {
    if (modal.classList.contains("-active")) {
        document.querySelector("BODY").classList.remove("overflow-hidden");
        modal.classList.remove('-active', '-transitioned');
        modal.querySelector("IFRAME").setAttribute("src", "");
        modal.addEventListener('transitionend', function() {
            modal.classList.remove("-transitioned")
        });
    }
}
if( modal !== null) {
    modal.addEventListener("click", function (e) {
        if (e.target !== modal.querySelector("IFRAME")) {
            closeModal();
        }
    });
}

Array.prototype.forEach.call(youtubeEmbedTrigger, function (el, i) {
    el.addEventListener("click", function () {
        openModal(el);
        document.addEventListener("keyup", function (e) {
            if (modal.classList.contains("-active")) {
                if (e.key === 'Escape') {
                    closeModal()
                } else {
                    console.log("no open modal found");
                }
            }
        })
    });
});
const themeSwitcher = document.querySelector("#themeSwitcher");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

if(!currentTheme) {
    if (prefersDarkScheme.matches) {
        document.documentElement.classList.add("dark-theme");
        localStorage.setItem("theme","dark");
    } else {
        document.documentElement.classList.add("light-theme");
        localStorage.setItem("theme","light");
    }
}


if (currentTheme == "dark") {
    document.documentElement.classList.add("dark-theme");
} else if (currentTheme == "light") {
    document.documentElement.classList.add("light-theme");
}

themeSwitcher.addEventListener("click", function () {
    if (prefersDarkScheme.matches) {
        document.documentElement.classList.toggle("light-theme");
        document.documentElement.classList.remove("dark-theme");
        var theme = document.documentElement.classList.contains("light-theme")
            ? "light"
            : "dark";
    } else {
        document.documentElement.classList.toggle("dark-theme");
        document.documentElement.classList.remove("light-theme");
        var theme = document.documentElement.classList.contains("dark-theme")
            ? "dark"
            : "light";
    }
    localStorage.setItem("theme", theme);
});