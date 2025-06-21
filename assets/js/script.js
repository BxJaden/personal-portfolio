'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// project filters
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

let selectedCategory = "all";
let selectedOrigin = "all";

const updateFilter = () => {
  // Filter individual project items
  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems[i];
    const matchesCategory = selectedCategory === "all" || item.dataset.category === selectedCategory;
    const matchesOrigin = selectedOrigin === "all" || item.dataset.origin === selectedOrigin;

    if (matchesCategory && matchesOrigin) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }

  // Show/hide category sections depending on whether they have any visible projects
  const categorySections = document.querySelectorAll("[data-category-section]");
  categorySections.forEach(categorySection => {
    const visibleProjects = categorySection.querySelectorAll(".project-item.active");
    if (visibleProjects.length > 0) {
      categorySection.style.display = "";
    } else {
      categorySection.style.display = "none";
    }
  });

  // Show/hide origin sections depending on whether they have visible category sections
  const originSections = document.querySelectorAll("[data-origin-section]");
  originSections.forEach(originSection => {
    const visibleCategories = originSection.querySelectorAll("[data-category-section]:not([style*='display: none'])");
    if (visibleCategories.length > 0) {
      originSection.style.display = "";
    } else {
      originSection.style.display = "none";
    }
  });
};

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    selectedCategory = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    updateFilter();
  });
}

let lastClickedBtn = filterBtns[0];

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    selectedOrigin = this.dataset.origin;
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
    updateFilter();
  });
}


// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

const projectModal = document.getElementById("project-modal");
const projectOverlay = document.getElementById("project-overlay");
const modalImageSlider = document.getElementById("modal-image-slider");
const modalCloseBtn2 = document.getElementById("project-modal-close");

document.querySelectorAll(".project-modal-trigger").forEach(trigger => {
  trigger.addEventListener("click", () => {
    modalImageSlider.innerHTML = "";

    const images = trigger.querySelectorAll("img");
    images.forEach(img => {
      const clone = img.cloneNode();
      modalImageSlider.appendChild(clone);
    });

    projectModal.classList.add("active");
  });
});

modalCloseBtn2.addEventListener("click", () => {
  projectModal.classList.remove("active");
});

projectOverlay.addEventListener("click", () => {
  projectModal.classList.remove("active");
});

