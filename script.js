const menuToggle = document.querySelector(".menu-toggle")
const siteBody = document.body
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuClose = document.querySelector(".mobile-menu__close")
const mobileMenuLinks = mobileMenu?.querySelectorAll('.mobile-menu__nav a') ?? []

if (menuToggle && siteBody && mobileMenu && mobileMenuClose) {
  const syncActiveLink = () => {
    const currentHash = window.location.hash

    mobileMenuLinks.forEach((link) => {
      const isActive = currentHash !== "" && link.getAttribute("href") === currentHash
      link.classList.toggle("is-active", isActive)
      if (isActive) {
        link.setAttribute("aria-current", "page")
        return
      }

      link.removeAttribute("aria-current")
    })
  }

  const closeMenu = () => {
    siteBody.classList.remove("is-menu-open")
    menuToggle.setAttribute("aria-expanded", "false")
    menuToggle.setAttribute("aria-label", "Open navigation menu")
    mobileMenu.setAttribute("aria-hidden", "true")
  }

  const openMenu = () => {
    siteBody.classList.add("is-menu-open")
    menuToggle.setAttribute("aria-expanded", "true")
    menuToggle.setAttribute("aria-label", "Close navigation menu")
    mobileMenu.setAttribute("aria-hidden", "false")
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = siteBody.classList.contains("is-menu-open")
    if (isOpen) {
      closeMenu()
      return
    }

    openMenu()
  })

  mobileMenuClose.addEventListener("click", closeMenu)

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      syncActiveLink()
      closeMenu()
    })
  })

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu()
    }
  })

  window.addEventListener("hashchange", syncActiveLink)

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      closeMenu()
    }
  })

  syncActiveLink()
}
