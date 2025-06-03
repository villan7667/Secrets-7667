// Modern JavaScript for SecretApp with Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the app
  const secretApp = new SecretApp()
  window.SecretApp = secretApp

  // Create floating particles
  createParticles()

  // Add scroll progress bar
  createScrollProgressBar()
})

class SecretApp {
  constructor() {
    this.init()
  }

  init() {
    this.loadLucideIcons()
    this.setupEventListeners()
    this.setupAnimations()
    this.setupFormValidation()
    this.setupPasswordToggle()
    this.setupNavigation()
    this.initTheme()
  }

  async loadLucideIcons() {
    // Load Lucide icons dynamically
    const lucide = window.lucide // Declare the variable before using it
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }

  setupEventListeners() {
    // Form submissions
    const forms = document.querySelectorAll("form")
    forms.forEach((form) => {
      form.addEventListener("submit", this.handleFormSubmit.bind(this))
    })

    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]')
    passwordInputs.forEach((input) => {
      input.addEventListener("input", this.checkPasswordStrength.bind(this))
    })

    // Real-time validation
    const inputs = document.querySelectorAll(".form-input")
    inputs.forEach((input) => {
      input.addEventListener("blur", this.validateField.bind(this))
      input.addEventListener("input", this.clearErrors.bind(this))

      // Add focus animation
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("input-focused")
      })

      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("input-focused")
      })
    })

    // Theme toggle
    const themeToggleBtn = document.querySelector(".theme-toggle")
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", this.toggleTheme.bind(this))
    }

    // Navbar scroll effect
    window.addEventListener("scroll", this.handleScroll.bind(this))
  }

  handleScroll() {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }

  setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
        }
      })
    }, observerOptions)

    // Observe animated elements
    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))
  }

  setupFormValidation() {
    this.validationRules = {
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
      password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
      },
      name: {
        pattern: /^[a-zA-Z\s]{2,50}$/,
        message: "Name must be 2-50 characters and contain only letters and spaces",
      },
    }
  }

  setupPasswordToggle() {
    const toggleButtons = document.querySelectorAll(".password-toggle")
    toggleButtons.forEach((button) => {
      button.addEventListener("click", this.togglePassword.bind(this))
    })
  }

  setupNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navLinks = document.querySelector(".nav-links")

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        mobileMenuBtn.classList.toggle("active")

        // Toggle aria-expanded for accessibility
        const isExpanded = navLinks.classList.contains("active")
        mobileMenuBtn.setAttribute("aria-expanded", isExpanded)

        // Add overlay when menu is open
        if (isExpanded) {
          // Prevent body scrolling when menu is open
          document.body.style.overflow = "hidden"

          // Create overlay if it doesn't exist
          if (!document.querySelector(".mobile-menu-overlay")) {
            const overlay = document.createElement("div")
            overlay.className = "mobile-menu-overlay"

            // Close menu when clicking outside
            overlay.addEventListener("click", () => {
              navLinks.classList.remove("active")
              mobileMenuBtn.classList.remove("active")
              mobileMenuBtn.setAttribute("aria-expanded", false)
              document.body.style.overflow = ""
              overlay.remove()
            })

            document.body.appendChild(overlay)
          }
        } else {
          // Re-enable scrolling when menu is closed
          document.body.style.overflow = ""

          // Remove overlay
          const overlay = document.querySelector(".mobile-menu-overlay")
          if (overlay) overlay.remove()
        }
      })

      // Close menu when clicking on a link
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active")
          mobileMenuBtn.classList.remove("active")
          mobileMenuBtn.setAttribute("aria-expanded", false)
          document.body.style.overflow = ""

          // Remove overlay
          const overlay = document.querySelector(".mobile-menu-overlay")
          if (overlay) overlay.remove()
        })
      })
    }

    // Active navigation highlighting
    const currentPath = window.location.pathname
    const navItems = document.querySelectorAll(".nav-links a")

    navItems.forEach((item) => {
      if (item.getAttribute("href") === currentPath) {
        item.classList.add("active")
      }
    })
  }

  togglePassword(event) {
    const button = event.currentTarget
    const input = button.parentElement.querySelector("input")

    if (input.type === "password") {
      input.type = "text"
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7 10-7 10-7-4-8-11-8z"></path>
          <line x1="2" y1="2" x2="22" y2="22"></line>
        </svg>
      `
      button.setAttribute("aria-label", "Hide password")
    } else {
      input.type = "password"
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      `
      button.setAttribute("aria-label", "Show password")
    }
  }

  validateField(event) {
    const field = event.target
    const fieldName = field.name
    const value = field.value.trim()

    this.clearFieldErrors(field)

    if (!value && field.hasAttribute("required")) {
      this.showFieldError(field, `${this.capitalizeFirst(fieldName)} is required`)
      return false
    }

    if (value && this.validationRules[fieldName]) {
      const rule = this.validationRules[fieldName]
      if (!rule.pattern.test(value)) {
        this.showFieldError(field, rule.message)
        return false
      }
    }

    // Password confirmation validation
    if (fieldName === "confirmPassword") {
      const passwordField = document.querySelector('input[name="password"]')
      if (passwordField && value !== passwordField.value) {
        this.showFieldError(field, "Passwords do not match")
        return false
      }
    }

    this.showFieldSuccess(field)
    return true
  }

  checkPasswordStrength(event) {
    const password = event.target.value
    let strengthContainer = event.target.parentElement.parentElement.querySelector(".password-strength")

    if (!strengthContainer) {
      // Create strength indicator if it doesn't exist
      const strengthDiv = document.createElement("div")
      strengthDiv.className = "password-strength"
      strengthDiv.innerHTML = `
        <div class="strength-bar">
          <div class="strength-fill"></div>
        </div>
        <span class="strength-text">Password Strength</span>
      `
      event.target.parentElement.parentElement.appendChild(strengthDiv)
      strengthContainer = strengthDiv
    }

    const strength = this.calculatePasswordStrength(password)
    const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    const strengthClasses = ["strength-very-weak", "strength-weak", "strength-fair", "strength-good", "strength-strong"]

    const strengthFill = strengthContainer.querySelector(".strength-fill")
    const strengthTextEl = strengthContainer.querySelector(".strength-text")

    if (password.length === 0) {
      strengthContainer.style.display = "none"
      return
    }

    strengthContainer.style.display = "flex"
    strengthFill.className = `strength-fill ${strengthClasses[strength]}`
    strengthTextEl.textContent = `${strengthText[strength]}`
  }

  calculatePasswordStrength(password) {
    let score = 0

    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[@$!%*?&]/.test(password)) score++

    return Math.min(score, 4)
  }

  handleFormSubmit(event) {
    const form = event.target
    const submitButton = form.querySelector('button[type="submit"]')

    // Validate all fields
    const fields = form.querySelectorAll(".form-input[required]")
    let isValid = true

    fields.forEach((field) => {
      if (!this.validateField({ target: field })) {
        isValid = false
      }
    })

    // Additional validation for password confirmation
    const confirmPasswordField = form.querySelector('input[name="confirmPassword"]')
    if (confirmPasswordField) {
      if (!this.validateField({ target: confirmPasswordField })) {
        isValid = false
      }
    }

    if (!isValid) {
      event.preventDefault()
      this.showNotification("Please fix the errors before submitting", "error")

      // Focus on first error field
      const firstError = form.querySelector(".form-input.error")
      if (firstError) {
        firstError.focus()
      }
      return
    }

    // Show loading state
    if (submitButton) {
      submitButton.classList.add("btn-loading")
      submitButton.disabled = true

      // Re-enable button after 5 seconds (fallback)
      setTimeout(() => {
        submitButton.classList.remove("btn-loading")
        submitButton.disabled = false
      }, 5000)
    }
  }

  showFieldError(field, message) {
    field.classList.add("error")
    field.classList.remove("success")

    let errorElement = field.parentNode.querySelector(".error-message")
    if (!errorElement) {
      errorElement = document.createElement("div")
      errorElement.className = "error-message"
      field.parentNode.appendChild(errorElement)
    }

    errorElement.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      <span>${message}</span>
    `
    errorElement.style.display = "flex"
  }

  showFieldSuccess(field) {
    field.classList.remove("error")
    field.classList.add("success")

    const errorElement = field.parentNode.querySelector(".error-message")
    if (errorElement) {
      errorElement.style.display = "none"
    }
  }

  clearFieldErrors(field) {
    field.classList.remove("error", "success")
    const errorElement = field.parentNode.querySelector(".error-message")
    if (errorElement) {
      errorElement.style.display = "none"
    }
  }

  clearErrors(event) {
    const field = event.target
    if (field.classList.contains("error")) {
      this.clearFieldErrors(field)
    }
  }

  showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => notification.remove())

    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`

    const icons = {
      success: `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      `,
      error: `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      `,
      warning: `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `,
      info: `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `,
    }

    notification.innerHTML = `
      ${icons[type]}
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 5000)
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // Utility functions
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Theme management
  toggleTheme() {
    document.body.classList.toggle("dark-theme")
    const isDark = document.body.classList.contains("dark-theme")
    localStorage.setItem("theme", isDark ? "dark" : "light")

    // Update theme toggle icon
    const themeToggle = document.querySelector(".theme-toggle")
    if (themeToggle) {
      themeToggle.innerHTML = isDark
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme")
    }

    // Set initial theme toggle icon
    const themeToggle = document.querySelector(".theme-toggle")
    if (themeToggle) {
      const isDark = document.body.classList.contains("dark-theme")
      themeToggle.innerHTML = isDark
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    }
  }
}

// Additional utility functions
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      window.SecretApp.showNotification("Copied to clipboard!", "success")
    })
    .catch(() => {
      window.SecretApp.showNotification("Failed to copy to clipboard", "error")
    })
}

function generateRandomJoke() {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "I used to hate facial hair, but then it grew on me.",
    "Why don't programmers like nature? It has too many bugs!",
    "I'm on a seafood diet. I see food and I eat it!",
    "Why did the math book look so sad? Because it had too many problems!",
    "What do you call a fake noodle? An impasta!",
  ]

  return jokes[Math.floor(Math.random() * jokes.length)]
}

// Floating particles effect
function createParticles() {
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "particles"
  document.body.appendChild(particlesContainer)

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random positioning and animation delay
    particle.style.left = Math.random() * 100 + "vw"
    particle.style.animationDelay = Math.random() * 15 + "s"
    particle.style.animationDuration = Math.random() * 10 + 10 + "s"

    // Random size
    const size = Math.random() * 4 + 2
    particle.style.width = size + "px"
    particle.style.height = size + "px"

    particlesContainer.appendChild(particle)
  }
}

// Scroll progress bar
function createScrollProgressBar() {
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.offsetHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  })
}

// Service Worker registration for PWA capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading animation for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1"
  })

  img.addEventListener("error", function () {
    this.style.opacity = "0.5"
    this.alt = "Image failed to load"
  })
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key to close mobile menu
  if (e.key === "Escape") {
    const navLinks = document.querySelector(".nav-links")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const overlay = document.querySelector(".mobile-menu-overlay")

    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
      mobileMenuBtn.setAttribute("aria-expanded", false)
      document.body.style.overflow = ""
      if (overlay) overlay.remove()
    }
  }
})

// Add focus trap for mobile menu
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
  )
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          e.preventDefault()
        }
      }
    }
  })
}

// Initialize focus trap for mobile menu when it opens
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const navLinks = document.querySelector(".nav-links")
      if (navLinks && navLinks.classList.contains("active")) {
        trapFocus(navLinks)
      }
    }
  })
})

const navLinks = document.querySelector(".nav-links")
if (navLinks) {
  observer.observe(navLinks, { attributes: true })
}
