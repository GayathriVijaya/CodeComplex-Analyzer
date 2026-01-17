// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header-bar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Trigger scroll event on load to set initial state
  window.dispatchEvent(new Event('scroll'));
});