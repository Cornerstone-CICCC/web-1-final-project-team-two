window.addEventListener("DOMContentLoaded", function () {
  const makeupBtn = document.getElementById("makeup-btn");
  const hairBtn = document.getElementById("hair-btn");
  const viewMoreBtn = document.getElementById("view-more-btn");

  const makeupGallery = document.querySelector(
    ".my-work-gallery-images-makeup"
  );
  const hairGallery = document.querySelector(
    ".my-work-gallery-images-hairstyle"
  );

  let activeGallery = makeupGallery;
  let visibleCount = 3;

  function initializeGallery(gallery) {
    const imgs = gallery.querySelectorAll("img");
    imgs.forEach((img) => img.classList.remove("visible"));

    for (let i = 0; i < 3 && i < imgs.length; i++) {
      imgs[i].classList.add("visible");
    }

    visibleCount = 3;
    viewMoreBtn.classList.remove("hide");
  }

  function activateGallery(
    galleryToShow,
    galleryToHide,
    btnToActivate,
    btnToDeactivate
  ) {
    galleryToShow.classList.add("active");
    galleryToHide.classList.remove("active");

    btnToActivate.classList.add("active");
    btnToDeactivate.classList.remove("active");
    btnToActivate.style.color = "black";
    btnToActivate.style.opacity = "1";
    btnToDeactivate.style.opacity = "0.5";
    btnToDeactivate.style.color = "black";

    activeGallery = galleryToShow;
    initializeGallery(activeGallery);
  }

  makeupBtn.addEventListener("click", () => {
    activateGallery(makeupGallery, hairGallery, makeupBtn, hairBtn);
  });

  hairBtn.addEventListener("click", () => {
    activateGallery(hairGallery, makeupGallery, hairBtn, makeupBtn);
  });

  viewMoreBtn.addEventListener("click", () => {
    const imgs = activeGallery.querySelectorAll("img");
    const nextVisible = visibleCount + 3;

    for (let i = visibleCount; i < nextVisible && i < imgs.length; i++) {
      imgs[i].classList.add("visible");
    }

    visibleCount += 3;

    if (visibleCount >= imgs.length) {
      viewMoreBtn.classList.add("hide");
    }
  });

  if (window.innerWidth > 900) {
    [makeupGallery, hairGallery].forEach((gallery) => {
      gallery
        .querySelectorAll("img")
        .forEach((img) => img.classList.add("visible"));
    });
    makeupGallery.classList.add("active");
    makeupBtn.classList.add("active");
    viewMoreBtn.classList.add("hide");
  } else {
    makeupGallery.classList.add("active");
    makeupBtn.classList.add("active");
    initializeGallery(makeupGallery);
  }
});
