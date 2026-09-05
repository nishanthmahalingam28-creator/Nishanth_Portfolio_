const sectionMap = {
    "index.html": "home",
    "about.html": "about",
    "project.html": "project",
    "internship.html": "internship",
    "certificate.html": "certificate",
    "contact.html": "contact"
};

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

function closeMenu() {
    if (!navbar || !menuToggle) return;
    navbar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
}

function toggleMenu() {
    if (!navbar || !menuToggle) return;
    const isOpen = navbar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
}

if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleMenu();
    });
}

document.addEventListener("click", (event) => {
    if (navbar && !navbar.contains(event.target)) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

function getPageName(href) {
    try {
        const url = new URL(href, window.location.href);
        return url.pathname.split("/").pop() || "index.html";
    } catch {
        return href;
    }
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const page = getPageName(link.getAttribute("href"));
        const sectionId = sectionMap[page];
        if (sectionId && document.getElementById(sectionId)) {
            event.preventDefault();
            scrollToSection(sectionId);
        }
        closeMenu();
    });
});

function setActiveLink() {
    if (!document.getElementById("home") || !document.getElementById("about")) {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        navLinks.forEach((link) => {
            link.classList.toggle("active", getPageName(link.getAttribute("href")) === currentPage);
        });
        return;
    }

    const offset = 140;
    let current = "home";

    Object.values(sectionMap).forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY + offset >= el.offsetTop) {
            current = id;
        }
    });

    navLinks.forEach((link) => {
        const page = getPageName(link.getAttribute("href"));
        link.classList.toggle("active", sectionMap[page] === current);
    });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();
