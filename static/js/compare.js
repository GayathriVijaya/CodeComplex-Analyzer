document.addEventListener('DOMContentLoaded', function() {
  // AJAX form submission for comparison
  const comparisonForm = document.querySelector('.comparison-form form');
  if (comparisonForm) {
    comparisonForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var form = e.target;
      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        body: formData
      }).then(response => response.text())
        .then(html => {
          document.getElementById('comparison-results-placeholder').innerHTML = html;
          // Smooth scroll to results
          document.getElementById('comparison-results-placeholder').scrollIntoView({ 
            behavior: 'smooth' 
          });
        });
    });
  }
});