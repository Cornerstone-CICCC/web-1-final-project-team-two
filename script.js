const getCurrentPath = () => {
  const path = window.location.pathname.split("/")[1];
  if (path === "my-work") return "my-work";
  if (path === "services") return "services";
  if (path === "classes") return "classes";
  if (path === "beauty-tips") return "beauty tips";
  if (path === "about") return "about";
  if (path === "contact") return "contact";
  return "index.html";
};

window.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".footer-nav ul li a");
  const hamburgerMenu = document.getElementById("hamburguer-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-nav a");

  hamburgerMenu.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
  navLinks.forEach((link) => {
    if (link.href.split("/")[3] === getCurrentPath()) {
      link.style.textDecoration = "underline";
      link.style.textDecorationColor = "var(--bold-main-color)";
      link.style.textDecorationThickness = "0.5px";
      link.style.textUnderlineOffset = "2px";
    }
  });
});

let scrollPosition = 0;

document.querySelectorAll('a[href^="#video-modal-"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    scrollPosition = window.pageYOffset;

    const modalId = this.getAttribute("href").substring(1);
    const modal = document.getElementById(modalId);
    const iframe = modal.querySelector("iframe");
    const src = iframe.getAttribute("src");

    if (!src.includes("autoplay=1")) {
      iframe.setAttribute("src", src + "?autoplay=1");
    }

    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  document.querySelectorAll(".video-modal iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src");
    iframe.setAttribute(
      "src",
      src.replace("?autoplay=1", "").replace("&autoplay=1", "")
    );
  });

  document.body.style.overflow = "";
  window.location.hash = "";
  window.scrollTo(0, scrollPosition);
}

document.querySelectorAll(".modal-close").forEach((closeBtn) => {
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeModal();
  });
});

document.querySelectorAll(".video-modal").forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && window.location.hash.includes("video-modal")) {
    closeModal();
  }
});
