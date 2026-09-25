"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       MOBILE NAVIGATION
    ================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = menuToggle.classList.toggle("is-active");

            navigation.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });


        const navLinks = navigation.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("is-active");

                navigation.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });
    }


    /* ================================
       CURRENT YEAR
    ================================= */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =========================================
// FEATURED PROJECT SLIDER
// =========================================

const projectSlider = document.querySelector(".featured-project-slider");

if (projectSlider) {
    const track = projectSlider.querySelector(".featured-project-track");
    const slides = projectSlider.querySelectorAll(".featured-project-slide");
    const previousButton = projectSlider.querySelector(".project-prev");
    const nextButton = projectSlider.querySelector(".project-next");
    const counter = projectSlider.querySelector(".project-counter");

    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const totalSlides = slides.length;

    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }

    function showNextSlide() {
        currentSlide++;

        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        updateSlider();
    }

    function showPreviousSlide() {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }

        updateSlider();
    }

    if (nextButton) {
        nextButton.addEventListener("click", showNextSlide);
    }

    if (previousButton) {
        previousButton.addEventListener("click", showPreviousSlide);
    }

    // -----------------------------------------
    // TOUCH / SWIPE
    // -----------------------------------------

    track.addEventListener(
        "touchstart",
        (event) => {
            touchStartX = event.changedTouches[0].screenX;
        },
        { passive: true }
    );

    track.addEventListener(
        "touchend",
        (event) => {
            touchEndX = event.changedTouches[0].screenX;

            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) < 40) {
                return;
            }

            if (swipeDistance < 0) {
                showNextSlide();
            } else {
                showPreviousSlide();
            }
        },
        { passive: true }
    );

    // -----------------------------------------
    // KEYBOARD NAVIGATION
    // -----------------------------------------

    projectSlider.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                showNextSlide();
            }

            if (event.key === "ArrowLeft") {
                showPreviousSlide();
            }
        });

        updateSlider();
    }

});