/**
 * Arti Malviya — Personal Portfolio Interactive Scripts
 * Simple Vanilla JS for:
 * - Theme Switcher (Dark / Light Mode)
 * - Navigation Scrollspy & Mobile Hamburger Menu
 * - Project Modal
 * - Contact Form Validation & Toast Alerts
 * - Copy Email Helper
 */

// Project Data for Modal
var projectData = {
  1: {
    title: "Akshar — Minimalist Poetry & Literary Hub",
    category: "Writing, Content & Web",
    year: "2026",
    image: "assets/images/project1.jpg",
    description: "Akshar is a personal digital reading space designed for Hindi and English poems and creative essays. Built with a focus on editorial typography, smooth reading modes, and distraction-free presentation.",
    features: [
      "Custom day/night reading mode with serif & sans-serif font toggles",
      "Categorized collections (Ghazals, Nazms, Micro-poetry, Reflections)",
      "Clean responsive layout designed with pure semantic HTML5 & CSS3",
      "Integrated author commentary and reader appreciation note box"
    ],
    techStack: ["HTML5", "Modern CSS", "JavaScript", "Editorial Design", "Responsive Layout"],
    githubUrl: "https://github.com",
    demoUrl: "https://github.com"
  }
};

// Wait for page to load, then initialize everything
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initNavigation();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initYear();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode) — FIXED
   ========================================================================== */
function initTheme() {
  var themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  // Check saved theme or system preference
  var savedTheme = localStorage.getItem("arti_portfolio_theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  // Apply initial theme
  setTheme(initialTheme);

  // Toggle on click
  themeToggle.addEventListener("click", function () {
    var currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    var newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    showToast("Switched to " + newTheme + " mode", "info");
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("arti_portfolio_theme", theme);
}

/* ==========================================================================
   2. Sticky Navigation & Scroll Spy + Mobile Hamburger Menu
   ========================================================================== */
function initNavigation() {
  var navLinks = document.querySelectorAll("#desktopNav .nav-link");
  var sections = document.querySelectorAll("section[id]");
  var mobileMenuBtn = document.getElementById("mobileMenuBtn");
  var mobileDrawer = document.getElementById("mobileDrawer");
  var mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Mobile Menu Toggle (Hamburger ☰)
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", function () {
      var isOpen = mobileDrawer.classList.toggle("open");
      mobileMenuBtn.classList.toggle("active");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen);
      mobileDrawer.setAttribute("aria-hidden", !isOpen);
    });

    // Close menu when a link is clicked
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener("click", function () {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
      });
    }

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenuBtn.contains(e.target) && !mobileDrawer.contains(e.target)) {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
      }
    });
  }

  // ScrollSpy — highlight active nav link based on scroll position
  var observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  var observer = new IntersectionObserver(function (entries) {
    for (var j = 0; j < entries.length; j++) {
      if (entries[j].isIntersecting) {
        var id = entries[j].target.getAttribute("id");
        for (var k = 0; k < navLinks.length; k++) {
          if (navLinks[k].getAttribute("href") === "#" + id) {
            navLinks[k].classList.add("active");
          } else {
            navLinks[k].classList.remove("active");
          }
        }
      }
    }
  }, observerOptions);

  for (var s = 0; s < sections.length; s++) {
    observer.observe(sections[s]);
  }
}

/* ==========================================================================
   3. Project Modal
   ========================================================================== */
function initProjectModal() {
  var modal = document.getElementById("projectModal");
  var modalContent = document.getElementById("modalContent");
  var closeBtn = document.getElementById("modalCloseBtn");
  var triggerBtns = document.querySelectorAll(".open-modal-btn");

  if (!modal || !modalContent) return;

  // Open modal when trigger button is clicked
  for (var i = 0; i < triggerBtns.length; i++) {
    triggerBtns[i].addEventListener("click", function (e) {
      e.preventDefault();
      var projectId = this.getAttribute("data-project-id");
      var data = projectData[projectId];

      if (!data) return;

      // Build modal content
      var featuresHTML = "";
      for (var f = 0; f < data.features.length; f++) {
        featuresHTML += "<li>" + data.features[f] + "</li>";
      }

      var tagsHTML = "";
      for (var t = 0; t < data.techStack.length; t++) {
        tagsHTML += '<span class="tag">' + data.techStack[t] + "</span>";
      }

      modalContent.innerHTML =
        '<img src="' + data.image + '" alt="' + data.title + '" class="modal-project-img">' +
        '<h3 id="modalProjectTitle" class="modal-project-title">' + data.title + "</h3>" +
        '<p class="modal-project-sub">' + data.category + " • " + data.year + "</p>" +
        '<p class="modal-project-desc">' + data.description + "</p>" +
        '<h4 class="modal-section-title">Highlights & Key Features</h4>' +
        '<ul class="modal-feature-list">' + featuresHTML + "</ul>" +
        '<h4 class="modal-section-title">Skills & Tools Used</h4>' +
        '<div class="project-tags">' + tagsHTML + "</div>" +
        '<div class="modal-project-footer">' +
        '<a href="' + data.githubUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><span>Explore Project</span></a>' +
        '<button class="btn btn-outline btn-sm" onclick="document.getElementById(\'modalCloseBtn\').click()"><span>Close Details</span></button>' +
        "</div>";

      openModal(modal);
    });
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closeModal(modal);
    });
  }

  // Close on backdrop click
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal(modal);
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal(modal);
    }
  });
}

function openModal(modalElement) {
  modalElement.classList.add("open");
  modalElement.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modalElement) {
  modalElement.classList.remove("open");
  modalElement.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* ==========================================================================
   4. Contact Form Validation
   ========================================================================== */
function initContactForm() {
  var form = document.getElementById("contactForm");
  if (!form) return;

  var nameInput = document.getElementById("userName");
  var emailInput = document.getElementById("userEmail");
  var msgInput = document.getElementById("userMessage");
  var submitBtn = document.getElementById("submitFormBtn");

  var nameErr = document.getElementById("nameError");
  var emailErr = document.getElementById("emailError");
  var msgErr = document.getElementById("messageError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var isValid = true;

    // Clear previous errors
    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    msgInput.classList.remove("input-error");
    nameErr.textContent = "";
    emailErr.textContent = "";
    msgErr.textContent = "";

    // Validate name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameErr.textContent = "Please enter your name.";
      nameInput.classList.add("input-error");
      isValid = false;
    }

    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailErr.textContent = "Please enter a valid email address.";
      emailInput.classList.add("input-error");
      isValid = false;
    }

    // Validate message
    if (!msgInput.value.trim() || msgInput.value.trim().length < 5) {
      msgErr.textContent = "Please enter a brief message (minimum 5 characters).";
      msgInput.classList.add("input-error");
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending
    var originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Sending...</span>";

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      showToast("Thank you for your message! I'll get back to you soon.", "success");
    }, 1000);
  });
}

/* ==========================================================================
   5. Copy Email Helper
   ========================================================================== */
function initCopyEmail() {
  var copyBtn = document.getElementById("copyEmailBtn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", function () {
    var email = "sarojmalviya23@gmail.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(function () {
        showToast("Copied sarojmalviya23@gmail.com to clipboard!", "success");
      }).catch(function () {
        showToast("Email: " + email, "info");
      });
    } else {
      showToast("Email: " + email, "info");
    }
  });
}

/* ==========================================================================
   6. Toast Notifications
   ========================================================================== */
function showToast(message, type) {
  if (!type) type = "info";
  var container = document.getElementById("toastContainer");
  if (!container) return;

  var icon = type === "success" ? "✓" : "ℹ";

  var toast = document.createElement("div");
  toast.className = "toast toast-" + type;
  toast.innerHTML = "<span>" + icon + "</span><span>" + message + "</span>";

  container.appendChild(toast);

  setTimeout(function () {
    toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(function () {
      toast.remove();
    }, 400);
  }, 3500);
}

/* ==========================================================================
   7. Current Year Auto-Update
   ========================================================================== */
function initYear() {
  var yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
