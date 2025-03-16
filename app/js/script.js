// Wait for the DOM to be fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------------------
    // Header Injection:
    // Fetch header.html and insert it into the #header-placeholder.
    // --------------------------------------------------------------------
    fetch('header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        
        // --------------------------------------------------------------------
        // Move the rest of your code here so it runs after the header is loaded.
        // This ensures that #btnOpen, #btnClose, and .topnav__menu are available.
        // --------------------------------------------------------------------
        
        console.log("HELLO");
  
        const test = () => {
          console.log("this is a test");
        };
  
        // Query header-related elements AFTER the header has been injected
        const btnOpen = document.querySelector("#btnOpen");
        const btnClose = document.querySelector("#btnClose");
        // Note: Use a valid media query syntax for width-based queries.
        const media = window.matchMedia("(max-width: 40em)");
  
        const topNavMenu = document.querySelector(".topnav__menu");
        const main = document.querySelector("main");
        const body = document.querySelector("body");
  
        function setupTopNav(e) {
          if (e.matches) {
            // is mobile
            console.log("is mobile");
            topNavMenu.setAttribute("inert", "");
            topNavMenu.style.transition = "none";
          } else {
            // is tablet/desktop
            console.log("is tablet/desktop");
            topNavMenu.removeAttribute("inert");
          }
        }
  
        function openMobileMenu() {
          btnOpen.setAttribute("aria-expanded", "true");
          topNavMenu.removeAttribute("inert");
          topNavMenu.removeAttribute("style");
          main.setAttribute("inert", "");
          bodyScrollLockUpgrade.disableBodyScroll(body);
          btnClose.focus();
        }
  
        function closeMobileMenu() {
          btnOpen.setAttribute("aria-expanded", "false");
          topNavMenu.setAttribute("inert", "");
          main.removeAttribute("inert");
          bodyScrollLockUpgrade.enableBodyScroll(body);
          btnOpen.focus();
          setTimeout(() => {
            topNavMenu.style.transition = "none";
          }, 500);
        }
  
        setupTopNav(media);
  
        // Attach event listeners now that header elements exist
        btnOpen.addEventListener("click", openMobileMenu);
        btnClose.addEventListener("click", closeMobileMenu);
  
        media.addEventListener("change", function (e) {
          setupTopNav(e);
        });
  
      })
      .catch(error => console.error('Error fetching header:', error));
  });
  