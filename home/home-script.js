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
