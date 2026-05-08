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

function startAnimations() {
    const elements = document.querySelectorAll(
        ".hidden-up, .hidden-left, .hidden-right, .hidden-scale"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // entry.isIntersecting is true when it enters the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                // Remove the class when it leaves the viewport to allow replay
                entry.target.classList.remove("show");
            }
        });
    }, {
        // Lower threshold (0.1) ensures it triggers as soon as a bit of it appears
        threshold: 0.1,
        // rootMargin '0px' is more reliable for bottom-of-the-page sections
        rootMargin: "0px"
    });

    elements.forEach((el) => {
        observer.observe(el);
    });
}

/* CONTACT FORM */

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Message sent successfully!");

});

/* CUSTOM CURSOR WITH STRETCH EFFECT */

const cursorDot = document.querySelector(".cursor-dot");

cursorDot.classList.add("hidden");

let cursorVisible = false;

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

let speed = 0;
let angle = 0;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    // First real movement
    if (!cursorVisible) {

        cursorDot.classList.remove("hidden");

        cursorVisible = true;

        // Prevent jump from top-left
        cursorX = mouseX;
        cursorY = mouseY;

    }

});

window.addEventListener("mouseover", (e) => {

    cursorDot.classList.remove("hidden");

    cursorVisible = true;

    // Spawn cursor exactly where mouse enters
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorX = mouseX;
    cursorY = mouseY;

});

document.addEventListener("mouseout", (e) => {

    // Mouse fully left browser window
    if (!e.relatedTarget && !e.toElement) {

        cursorDot.classList.add("hidden");

        cursorVisible = false;

    }

});

function animateCursor() {

    // Distance between current cursor position and mouse position
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    // Smooth movement
    cursorX += dx * 0.35;
    cursorY += dy * 0.35;

    // Calculate speed and angle for stretch effect
    const velX = dx * 0.35;
    const velY = dy * 0.35;

    speed = Math.sqrt(velX * velX + velY * velY);

    angle = Math.atan2(velY, velX) * (180 / Math.PI);

    // Stretch effect
    const stretch = Math.min(speed / 4, 3);

    const scaleX = 1 + stretch;
    const scaleY = 1 - Math.min(stretch * 0.3, 0.4);

    cursorDot.style.transform =
        `translate3d(${cursorX - 6}px, ${cursorY - 6}px, 0)
        rotate(${angle}deg)
        scale(${scaleX}, ${scaleY})`;

    requestAnimationFrame(animateCursor);

}

animateCursor();

