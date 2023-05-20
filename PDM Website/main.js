// Select the navbar element
const navbar = document.querySelector('#nav');

// Add an event listener to the window object to listen for scroll events
window.addEventListener('scroll', function() {
  // Check if the user has scrolled past the navbar
  if (window.scrollY >= navbar.offsetHeight) {
    // If they have, add a class to the navbar to change its background color
    navbar.classList.add('scrolled');
    // Change the color of the list items to white
    const links = document.querySelectorAll('.navbar-nav a');
    links.forEach(link => {
      link.style.color = '#fff';
    });
  } else {
    // Otherwise, remove the class to revert the navbar's background color
    navbar.classList.remove('scrolled');
    // Revert the color of the list items to their original color
    const links = document.querySelectorAll('.navbar-nav a');
    links.forEach(link => {
      link.style.color = '';
    });
  }
});

