const getCurrentPath = (path) => {
  if (path === "/") return "index.html";
  if (path === "/my-work") return "my work";
  if (path === "/services") return "services";
  if (path === "/classes") return "classes";
  if (path === "/beauty-tips") return "beauty tips";
  if (path === "/about") return "about";
  if (path === "/contact") return "contact";
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
    if (link.href.split("/")[3] === getCurrentPath(window.location.pathname)) {
      link.style.textDecoration = "underline";
      link.style.textDecorationColor = "var(--bold-main-color)";
      link.style.textDecorationThickness = "0.5px";
      link.style.textUnderlineOffset = "2px";
    }
  });
});
