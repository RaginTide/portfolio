/* LOADER */

document.body.style.overflow = "hidden";

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.style.pointerEvents = "none";

    }, 2200);

    setTimeout(() => {

        document.body.style.overflow = "auto";

        loader.remove();

        startAnimations();

    }, 3200);

});

/* START ANIMATIONS AFTER LOADER */

function startAnimations(){

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if(entry.intersectionRatio > 0.35){

                entry.target.classList.add("show");

            } else if(entry.intersectionRatio < 0.15){

                entry.target.classList.remove("show");

            }

        });

    }, {
        threshold:[0, 0.15, 0.35, 1]
    });

    const hiddenElements = document.querySelectorAll(
        ".hidden-up, .hidden-left, .hidden-right, .hidden-scale"
    );

    hiddenElements.forEach((el) => observer.observe(el));

}

/* CONTACT FORM */

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Message sent successfully!");

});

/* CUSTOM CURSOR WITH STRETCH EFFECT */

const cursorDot = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let speed = 0;
let angle = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener("mouseenter", (e) => {
    cursorDot.classList.remove("hidden");
    // Instantly move cursor to entry point to avoid sliding from previous location
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorX = mouseX;
    cursorY = mouseY;
});

window.addEventListener("mouseleave", () => {
    cursorDot.classList.add("hidden");
});

function animateCursor() {
    // Distance between current cursor position and mouse position
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    // Smooth movement (Lerp) - increased factor for less delay
    cursorX += dx * 0.35;
    cursorY += dy * 0.35;

    // Calculate speed and angle for stretch effect
    // We use the delta of the cursor position itself for more accurate "following" of the path
    const velX = dx * 0.35;
    const velY = dy * 0.35;
    speed = Math.sqrt(velX * velX + velY * velY);
    angle = Math.atan2(velY, velX) * (180 / Math.PI);

    // Stretch effect: increase width based on speed, decrease height slightly
    const stretch = Math.min(speed / 4, 3); 
    const scaleX = 1 + stretch;
    const scaleY = 1 - Math.min(stretch * 0.3, 0.4);

    cursorDot.style.transform = `translate3d(${cursorX - 6}px, ${cursorY - 6}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

