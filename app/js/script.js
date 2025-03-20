"use strict";

// Wait for the entire DOM (Document Object Model) to load before executing the code.
document.addEventListener("DOMContentLoaded", () => {
    
  // Fetch the external header HTML file (header.html) to reuse the header across pages.
  fetch('header.html')
    .then(response => {
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Convert the response into text (HTML)
      return response.text();
    })
    .then(data => {
      // Insert the fetched header HTML into the element with id "header-placeholder"
      document.getElementById('header-placeholder').innerHTML = data;
      
      // Now that the header is injected, select the elements needed for the mobile menu
      const btnOpen = document.querySelector("#btnOpen");     // Hamburger button to open menu
      const btnClose = document.querySelector("#btnClose");   // Button to close menu
      
      // Media query for mobile devices (max-width: 46.999em)
      const media = window.matchMedia("(max-width: 46.999em)");
  
      // Select the navigation menu, main content, and body elements
      const topNavMenu = document.querySelector(".topnav__menu");
      const main = document.querySelector("main");
      const body = document.querySelector("body");
  
      /**
       * setupTopNav - Configures the navigation menu based on the current viewport.
       * @param {MediaQueryListEvent|MediaQueryList} e - The media query event or object.
       */
      function setupTopNav(e) {
        if (e.matches) {
          // If the viewport matches mobile criteria
          console.log("is mobile");
          // Only set the inert attribute if the menu isn't open
          if (btnOpen.getAttribute("aria-expanded") !== "true") {
            topNavMenu.setAttribute("inert", "");
            topNavMenu.style.transition = "none"; // Disable transitions for immediate effect
          }
        } else {
          // For tablet/desktop viewports
          console.log("is tablet/desktop");
          topNavMenu.removeAttribute("inert"); // Make the menu interactive
        }
      }
  
      /**
       * openMobileMenu - Opens the mobile navigation menu.
       * It updates ARIA attributes, removes inert states, disables body scroll,
       * and sets focus on the close button for accessibility.
       */
      function openMobileMenu() {
        btnOpen.setAttribute("aria-expanded", "true"); // Mark as open
        topNavMenu.removeAttribute("inert");           // Enable menu interaction
        topNavMenu.removeAttribute("style");           // Clear inline styles (if any)
        main.setAttribute("inert", "");                  // Prevent main content interaction
        bodyScrollLockUpgrade.disableBodyScroll(body);   // Disable scrolling on the body
        btnClose.focus();                                // Move focus to the close button
        // Add a class to the header to indicate that the menu is open (for styling)
        document.querySelector("header").classList.add("menu-open");
      }
  
      /**
       * closeMobileMenu - Closes the mobile navigation menu.
       * It reverts the ARIA attributes, re-enables body scroll,
       * and returns focus to the hamburger button.
       */
      function closeMobileMenu() {
        btnOpen.setAttribute("aria-expanded", "false"); // Mark as closed
        topNavMenu.setAttribute("inert", "");             // Disable menu interaction
        main.removeAttribute("inert");                   // Re-enable main content interaction
        bodyScrollLockUpgrade.enableBodyScroll(body);      // Enable scrolling on the body
        btnOpen.focus();                                 // Return focus to the open button
        // Clear any transition styles after a brief delay for smooth closing
        setTimeout(() => {
          topNavMenu.style.transition = "none";
        }, 500);
        // Remove the menu-open class from the header
        document.querySelector("header").classList.remove("menu-open");
      }
  
      // Configure the navigation based on the current viewport immediately
      setupTopNav(media);
  
      // Attach event listeners for opening and closing the mobile menu
      btnOpen.addEventListener("click", openMobileMenu);
      btnClose.addEventListener("click", closeMobileMenu);
  
      // Re-run setupTopNav if the viewport changes (e.g., orientation change)
      media.addEventListener("change", function (e) {
        setupTopNav(e);
      });
  
    })
    .catch(error => console.error('Error fetching header:', error)); // Log any errors
});
