/*
====================================================

Africa Journal of Sustainable Development

SCRIPT.JS

Phase 1

Core Site Behaviour

====================================================
*/

"use strict";

/*====================================================

1. PAGE LOADER

====================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});



/*====================================================

2. STICKY HEADER

====================================================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/*====================================================

3. MOBILE NAVIGATION

====================================================*/

const navToggle = document.querySelector(".nav-toggle");

const navMenu = document.querySelector("nav");

if (navToggle) {

    navToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        navToggle.classList.toggle("active");

    });

}



/*====================================================

4. CLOSE MOBILE MENU

====================================================*/

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("open");

        }

        if (navToggle) {

            navToggle.classList.remove("active");

        }

    });

});



/*====================================================

5. ACTIVE NAVIGATION

====================================================*/

const currentPage = window.location.pathname.split("/").pop();

const links = document.querySelectorAll("nav a");

links.forEach(link => {

    const href = link.getAttribute("href");

    if (

        href === currentPage ||

        (currentPage === "" && href === "index.html")

    ) {

        link.classList.add("active");

    }

});



/*====================================================

6. BACK TO TOP BUTTON

====================================================*/

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

if (backToTop) {

    backToTop.addEventListener("click", e => {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/*====================================================

7. SMOOTH SCROLLING

====================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});



/*====================================================

8. FOOTER YEAR

====================================================*/

const footerYear = document.querySelector("#year");

if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

}



/*====================================================

9. KEYBOARD ACCESSIBILITY

====================================================*/

document.addEventListener("keyup", event => {

    if (event.key === "Escape") {

        if (navMenu) {

            navMenu.classList.remove("open");

        }

        if (navToggle) {

            navToggle.classList.remove("active");

        }

    }

});



/*====================================================

10. PREVENT EMPTY LINKS

====================================================*/

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

    });

});



/*====================================================

11. IMAGE FADE-IN

====================================================*/

const images = document.querySelectorAll("img");

images.forEach(img => {

    img.addEventListener("load", () => {

        img.classList.add("loaded");

    });

});



/*====================================================

12. CONSOLE MESSAGE

====================================================*/

console.log(

    "%cAfrica Journal of Sustainable Development",

    "color:#0B6E4F;font-size:18px;font-weight:bold;"

);

console.log(

    "%cWebsite developed with HTML, CSS and JavaScript.",

    "color:#555;font-size:13px;"

);



/*====================================================

END OF PHASE 1

====================================================
*/

/*====================================================

PHASE 2

HERO SLIDER

====================================================*/

const heroSlider = document.querySelector(".hero-slider");

if (heroSlider) {

    const slides = document.querySelectorAll(".hero-slide");

    const prevButton = document.querySelector(".hero-prev");

    const nextButton = document.querySelector(".hero-next");

    const dotsContainer = document.querySelector(".hero-dots");

    let currentSlide = 0;

    let sliderInterval;

    /*==========================================

    CREATE DOTS

    ==========================================*/

    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.classList.add("hero-dot");

        dot.setAttribute("aria-label", `Slide ${index + 1}`);

        if (index === 0) {

            dot.classList.add("active");

        }

        dotsContainer.appendChild(dot);

    });

    const dots = document.querySelectorAll(".hero-dot");

    /*==========================================

    SHOW SLIDE

    ==========================================*/

    function showSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        currentSlide = index;

        slides[currentSlide].classList.add("active");

        dots[currentSlide].classList.add("active");

    }

    /*==========================================

    NEXT

    ==========================================*/

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }

    /*==========================================

    PREVIOUS

    ==========================================*/

    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide = slides.length - 1;

        }

        showSlide(currentSlide);

    }

    /*==========================================

    AUTO PLAY

    ==========================================*/

    function startSlider() {

        sliderInterval = setInterval(nextSlide, 6000);

    }

    function stopSlider() {

        clearInterval(sliderInterval);

    }

    startSlider();

    /*==========================================

    BUTTON EVENTS

    ==========================================*/

    nextButton.addEventListener("click", () => {

        nextSlide();

        stopSlider();

        startSlider();

    });

    prevButton.addEventListener("click", () => {

        previousSlide();

        stopSlider();

        startSlider();

    });

    /*==========================================

    DOT EVENTS

    ==========================================*/

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            stopSlider();

            startSlider();

        });

    });

    /*==========================================

    PAUSE ON HOVER

    ==========================================*/

    heroSlider.addEventListener("mouseenter", stopSlider);

    heroSlider.addEventListener("mouseleave", startSlider);

    /*==========================================

    KEYBOARD

    ==========================================*/

    document.addEventListener("keydown", e => {

        if (e.key === "ArrowRight") {

            nextSlide();

        }

        if (e.key === "ArrowLeft") {

            previousSlide();

        }

    });

    /*==========================================

    TOUCH SUPPORT

    ==========================================*/

    let touchStartX = 0;

    let touchEndX = 0;

    heroSlider.addEventListener("touchstart", e => {

        touchStartX = e.changedTouches[0].screenX;

    });

    heroSlider.addEventListener("touchend", e => {

        touchEndX = e.changedTouches[0].screenX;

        if (touchStartX - touchEndX > 50) {

            nextSlide();

        }

        if (touchEndX - touchStartX > 50) {

            previousSlide();

        }

    });

}

/*====================================================

PHASE 3

SITE EXPERIENCE

Scroll Animations
Counters
Lazy Loading
Reading Progress

====================================================*/

/*====================================================

1. FADE-IN SECTIONS

====================================================*/

const fadeElements = document.querySelectorAll(
    ".fade-section, .card, .journal-card, .article-card, .archive-card, .news-card, .editor-card"
);

if ("IntersectionObserver" in window && fadeElements.length > 0) {

    const fadeObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    fadeElements.forEach(el => fadeObserver.observe(el));

}



/*====================================================

2. STATISTICS COUNTER

====================================================*/

const counters = document.querySelectorAll("[data-counter]");

if ("IntersectionObserver" in window && counters.length > 0) {

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.counter);

            const duration = 1800;

            const increment = target / (duration / 16);

            let value = 0;

            function updateCounter() {

                value += increment;

                if (value >= target) {

                    counter.textContent = target.toLocaleString();

                } else {

                    counter.textContent = Math.floor(value).toLocaleString();

                    requestAnimationFrame(updateCounter);

                }

            }

            updateCounter();

            observer.unobserve(counter);

        });

    });

    counters.forEach(counter => counterObserver.observe(counter));

}



/*====================================================

3. IMAGE LAZY LOADING

====================================================*/

const lazyImages = document.querySelectorAll("img[data-src]");

if ("IntersectionObserver" in window && lazyImages.length > 0) {

    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            img.src = img.dataset.src;

            img.onload = () => {

                img.classList.add("loaded");

            };

            observer.unobserve(img);

        });

    });

    lazyImages.forEach(img => imageObserver.observe(img));

}



/*====================================================

4. READING PROGRESS BAR

====================================================*/

const progressBar = document.querySelector(".reading-progress");

if (progressBar) {

    window.addEventListener("scroll", () => {

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (window.scrollY / documentHeight) * 100;

        progressBar.style.width = progress + "%";

    });

}



/*====================================================

5. SCROLL PROGRESS PERCENTAGE

====================================================*/

const scrollPercent = document.querySelector(".scroll-percent");

if (scrollPercent) {

    window.addEventListener("scroll", () => {

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            Math.round((window.scrollY / documentHeight) * 100);

        scrollPercent.textContent = progress + "%";

    });

}



/*====================================================

6. REVEAL ARTICLE CARDS

====================================================*/

const revealCards = document.querySelectorAll(".article-card");

if ("IntersectionObserver" in window && revealCards.length > 0) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                setTimeout(() => {

                    entry.target.classList.add("visible");

                }, index * 80);

                observer.unobserve(entry.target);

            }

        });

    });

    revealCards.forEach(card => revealObserver.observe(card));

}



/*====================================================

7. ACTIVE SECTION HIGHLIGHT

====================================================*/

const sections = document.querySelectorAll("section[id]");

const navItems = document.querySelectorAll('nav a[href^="#"]');

if ("IntersectionObserver" in window && sections.length > 0) {

    const sectionObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navItems.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {

                    link.classList.add("active");

                }

            });

        });

    }, {

        threshold: 0.4

    });

    sections.forEach(section => sectionObserver.observe(section));

}



/*====================================================

8. STAGGER GRID ANIMATION

====================================================*/

const grids = document.querySelectorAll(
    ".article-list, .archive-grid, .research-grid, .editor-grid"
);

grids.forEach(grid => {

    const children = grid.children;

    Array.from(children).forEach((item, index) => {

        item.style.transitionDelay = `${index * 60}ms`;

    });

});



/*====================================================

9. IMAGE PARALLAX

Hero Only

====================================================*/

const hero = document.querySelector(".hero");

if (hero) {

    window.addEventListener("scroll", () => {

        const offset = window.pageYOffset;

        hero.style.backgroundPositionY = offset * 0.35 + "px";

    });

}



/*====================================================

10. PERFORMANCE LOG

====================================================*/

window.addEventListener("load", () => {

    if ("performance" in window) {

        console.log(

            "AJSD loaded in",

            Math.round(performance.now()),

            "ms"

        );

    }

});



/*====================================================

END OF PHASE 3

====================================================*/

/*====================================================

PHASE 4

ADVANCED FEATURES

Future Ready

====================================================*/



/*====================================================

1. ARCHIVE SEARCH

====================================================*/

const archiveSearch = document.querySelector("#archive-search");

if (archiveSearch) {

    archiveSearch.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".archive-card");

        cards.forEach(card => {

            const text = card.textContent.toLowerCase();

            card.style.display = text.includes(value) ? "" : "none";

        });

    });

}





/*====================================================

2. ARCHIVE FILTER

====================================================*/

const archiveFilter = document.querySelector("#archive-filter");

if (archiveFilter) {

    archiveFilter.addEventListener("change", function () {

        const selected = this.value;

        const cards = document.querySelectorAll(".archive-card");

        cards.forEach(card => {

            const year = card.dataset.year;

            if (

                selected === "all" ||

                year === selected

            ) {

                card.style.display = "";

            }

            else {

                card.style.display = "none";

            }

        });

    });

}





/*====================================================

3. PDF DOWNLOAD TRACKER

====================================================*/

const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');

pdfLinks.forEach(link => {

    link.addEventListener("click", () => {

        console.log(

            "PDF Download:",

            link.getAttribute("href")

        );

    });

});





/*====================================================

4. COPY CITATION

====================================================*/

document.querySelectorAll(".copy-citation").forEach(button => {

    button.addEventListener("click", () => {

        const citation = button.dataset.citation;

        navigator.clipboard.writeText(citation);

        button.textContent = "Copied!";

        setTimeout(() => {

            button.textContent = "Copy Citation";

        }, 2000);

    });

});





/*====================================================

5. COPY DOI

Future

====================================================*/

document.querySelectorAll(".copy-doi").forEach(button => {

    button.addEventListener("click", () => {

        const doi = button.dataset.doi;

        navigator.clipboard.writeText(doi);

    });

});





/*====================================================

6. ACCORDIONS

====================================================*/

document.querySelectorAll(".accordion-header").forEach(header => {

    header.addEventListener("click", () => {

        header.classList.toggle("active");

        const body = header.nextElementSibling;

        if (body.style.maxHeight) {

            body.style.maxHeight = null;

        }

        else {

            body.style.maxHeight = body.scrollHeight + "px";

        }

    });

});





/*====================================================

7. MODAL

====================================================*/

const modal = document.querySelector(".modal");

const modalTriggers = document.querySelectorAll(".open-modal");

const closeModal = document.querySelector(".close-modal");

if (modal) {

    modalTriggers.forEach(trigger => {

        trigger.addEventListener("click", () => {

            modal.classList.add("show");

        });

    });

    if (closeModal) {

        closeModal.addEventListener("click", () => {

            modal.classList.remove("show");

        });

    }

}





/*====================================================

8. NEWSLETTER

====================================================*/

const newsletter = document.querySelector("#newsletter-form");

if (newsletter) {

    newsletter.addEventListener("submit", e => {

        const email = newsletter.querySelector("input");

        if (!email.value.includes("@")) {

            e.preventDefault();

            alert("Please enter a valid email.");

        }

    });

}





/*====================================================

9. KEYBOARD SHORTCUTS

====================================================*/

document.addEventListener("keydown", e => {

    if (

        e.altKey &&

        e.key === "h"

    ) {

        window.location.href = "index.html";

    }

    if (

        e.altKey &&

        e.key === "a"

    ) {

        window.location.href = "archives.html";

    }

});





/*====================================================

10. THEME TOGGLE

Future

====================================================*/

const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark");

    });

}





/*====================================================

11. FUTURE SUBMISSION PORTAL

====================================================*/

function initializeSubmissionPortal() {

    console.log(

        "Submission Portal Ready"

    );

}





/*====================================================

12. FUTURE DOI REGISTRATION

====================================================*/

function initializeDOI() {

    console.log(

        "DOI Service Ready"

    );

}





/*====================================================

13. FUTURE USER LOGIN

====================================================*/

function initializeUserPortal() {

    console.log(

        "User Portal Ready"

    );

}





/*====================================================

14. HELPER FUNCTIONS

====================================================*/

function debounce(func, delay) {

    let timer;

    return function () {

        clearTimeout(timer);

        timer = setTimeout(

            () => func.apply(this, arguments),

            delay

        );

    };

}





/*====================================================

15. WEBSITE READY

====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSubmissionPortal();

    initializeDOI();

    initializeUserPortal();

    console.log(

        "AJSD Website Initialized Successfully."

    );

});





/*====================================================

END OF SCRIPT.JS

VERSION 1.0

====================================================*/
