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
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            // Only remove if it's REALLY gone from the screen
            // This prevents the movement from triggering a removal
            entry.target.classList.remove("show");
        }
    });
}, {
    threshold: 0.1,
    // Adds a 20px 'margin' to the detection area. 
    // This stops the jitter because the 30px move won't 
    // immediately kick the element out of the 'active' zone.
    rootMargin: "20px 0px 20px 0px" 
});

    elements.forEach((el) => {
        observer.observe(el);
    });
}

/* CONTACT FORM */

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const button = form.querySelector("button");

    button.innerText = "Sending...";
    button.disabled = true;

    emailjs.sendForm(
        "service_k14uv4r",
        "template_ds9wg6a",
        this
    )

    .then(() => {

        button.innerText = "Message Sent!";
        form.reset();

        setTimeout(() => {

            button.innerText = "Send Message";
            button.disabled = false;

        }, 2000);

    })

    .catch(() => {

        button.innerText = "Failed!";
        
        setTimeout(() => {

            button.innerText = "Send Message";
            button.disabled = false;

        }, 2000);

    });

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



/* PROJECT HOVER SLIDESHOW */

document.querySelectorAll(".project-card").forEach(card => {

    const images = card.querySelectorAll(".project-slideshow img");

    let current = 1;
    let interval;
    let hoverTimeout;

    function startSlideshow() {

        clearTimeout(hoverTimeout);

        card.classList.add("hovering");

        // Wait for main image expansion first
        hoverTimeout = setTimeout(() => {

            card.classList.add("slideshow-active");

            if (images.length > 1) {

                images[current].classList.add("active");

                interval = setInterval(() => {

                    images[current].classList.remove("active");

                    current++;

                    if(current >= images.length){
                        current = 1;
                    }

                    images[current].classList.add("active");

                }, 2500);

            }

        }, 900); // expansion duration before slideshow starts
    }

    function stopSlideshow() {

        clearInterval(interval);

        clearTimeout(hoverTimeout);

        images.forEach(img => {
            img.classList.remove("active");
        });

        // Remove slideshow first
        card.classList.remove("slideshow-active");

        // Keep expanded state briefly
        setTimeout(() => {

            card.classList.remove("hovering");

        }, 150);

        current = 1;
    }

    card.addEventListener("mouseenter", startSlideshow);

    card.addEventListener("mouseleave", stopSlideshow);

});
