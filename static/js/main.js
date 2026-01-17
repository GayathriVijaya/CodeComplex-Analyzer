// // // document.addEventListener('DOMContentLoaded', function() {
// // //     document.querySelector('form').addEventListener('submit', function(e) {
// // //         e.preventDefault();
// // //         var form = e.target;
// // //         var formData = new FormData(form);

// // //         fetch(form.action, {
// // //             method: 'POST',
// // //             headers: {'X-Requested-With': 'XMLHttpRequest'},
// // //             body: formData
// // //         }).then(response => response.text())
// // //           .then(html => {
// // //             document.querySelector('.straddle-box').innerHTML = html;
// // //           });
// // //     });
// // // });
// // // document.addEventListener('DOMContentLoaded', function() {
// // //     // Main form: AJAX complexity calculation
// // //     document.querySelector('.straddle-box form').addEventListener('submit', function(e) {
// // //         e.preventDefault();
// // //         var form = e.target;
// // //         var formData = new FormData(form);

// // //         fetch(form.action, {
// // //             method: 'POST',
// // //             headers: {'X-Requested-With': 'XMLHttpRequest'},
// // //             body: formData
// // //         }).then(response => response.text())
// // //             .then(html => {
// // //                 document.querySelector('.straddle-box').innerHTML = html;
// // //                 // Explanation box disappears, as this is a new complexity calculation
// // //                 document.getElementById('explanation-placeholder').innerHTML = '';
// // //             });
// // //     });

// // //     // Delegate for dynamically created 'Want to know why?' button
// // //     document.querySelector('.straddle-box').addEventListener('click', function(e) {
// // //         if(e.target && e.target.id === 'why-btn') {
// // //             var code = document.querySelector('.straddle-box textarea').value;
// // //             var formData = new FormData();
// // //             formData.append('code', code);

// // //             fetch('/suggest_reduction', {
// // //                 method: 'POST',
// // //                 headers: {'X-Requested-With': 'XMLHttpRequest'},
// // //                 body: formData
// // //             }).then(response => response.text())
// // //                 .then(html => {
// // //                     document.getElementById('explanation-placeholder').innerHTML = html;
// // //                 });
// // //         }
// // //     });
// // // });
// // document.addEventListener('DOMContentLoaded', function() {
// //     document.querySelector('.straddle-box form').addEventListener('submit', function(e) {
// //         e.preventDefault();
// //         var form = e.target;
// //         var formData = new FormData(form);

// //         fetch(form.action, {
// //             method: 'POST',
// //             headers: {'X-Requested-With': 'XMLHttpRequest'},
// //             body: formData
// //         }).then(response => response.text())
// //             .then(html => {
// //                 document.querySelector('.straddle-box').innerHTML = html;
// //                 document.getElementById('explanation-placeholder').innerHTML = '';
// //             });
// //     });

// //     document.querySelector('.straddle-box').addEventListener('click', function(e) {
// //         if(e.target && e.target.id === 'why-btn') {
// //             var code = document.querySelector('.straddle-box textarea').value;
// //             var formData = new FormData();
// //             formData.append('code', code);

// //             fetch('/suggest_reduction', {
// //                 method: 'POST',
// //                 headers: {'X-Requested-With': 'XMLHttpRequest'},
// //                 body: formData
// //             }).then(response => response.text())
// //                 .then(html => {
// //                     document.getElementById('explanation-placeholder').innerHTML = html;
// //                 });
// //         }
// //     });
// // });
// // function copyReducedCode() {
// //   const code = document.getElementById("reducedCode").innerText;
// //   navigator.clipboard.writeText(code);
// // }
// // document.addEventListener("DOMContentLoaded", function() {
// //   const whyBtn = document.getElementById("why-btn");
// //   if (whyBtn) {
// //     whyBtn.addEventListener("click", function() {
// //       // Get the code from the textarea (update selector if needed!)
// //       const code = document.querySelector("textarea[name='code']").value;
// //       // Send AJAX POST to explanation endpoint
// //       fetch("/explanation", {
// //         method: "POST",
// //         headers: {
// //           'Content-Type': 'application/x-www-form-urlencoded'
// //         },
// //         body: "code=" + encodeURIComponent(code)
// //       })
// //       .then(response => response.text())
// //       .then(html => {
// //         // Update explanation box in DOM
// //         document.getElementById("explanation-placeholder").innerHTML = html;
// //       });
// //     });
// //   }
// // });

// document.addEventListener('DOMContentLoaded', function() {
//   // AJAX for main complexity form
//   document.querySelector('.straddle-box form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     var form = e.target;
//     var formData = new FormData(form);

//     fetch(form.action, {
//       method: 'POST',
//       headers: {'X-Requested-With': 'XMLHttpRequest'},
//       body: formData
//     }).then(response => response.text())
//       .then(html => {
//         document.querySelector('.straddle-box').innerHTML = html;
//         document.getElementById('explanation-placeholder').innerHTML = '';
//         document.getElementById('suggestion-placeholder').innerHTML = '';
//       });
//   });

//   // Delegate: Want to know why (AJAX to /explanation)
//   document.querySelector('.straddle-box').addEventListener('click', function(e) {
//     if(e.target && e.target.id === 'why-btn') {
//       var code = document.querySelector('.straddle-box textarea').value;
//       var formData = new FormData();
//       formData.append('code', code);

//       fetch('/explanation', {
//         method: 'POST',
//         body: formData
//       }).then(response => response.text())
//         .then(html => {
//           document.getElementById('explanation-placeholder').innerHTML = html;
//         });
//     }
//   });

//   // Delegate: Want to reduce complexity (AJAX to /suggest_reduction)
//   document.addEventListener('click', function(e) {
//     if (e.target && e.target.closest('form') && e.target.closest('form').action.includes('/suggest_reduction')) {
//       e.preventDefault();
//       var form = e.target.closest('form');
//       var formData = new FormData(form);
//       fetch(form.action, {
//         method: 'POST',
//         headers: {'X-Requested-With': 'XMLHttpRequest'},
//         body: formData
//       }).then(response => response.text())
//         .then(html => {
//           document.getElementById('suggestion-placeholder').innerHTML = html;
//         });
//     }
//   });
// });
// function copyReducedCode() {
//   const code = document.getElementById("reducedCode").innerText;
//   navigator.clipboard.writeText(code);
// }
// document.addEventListener('DOMContentLoaded', function() {
//   document.body.addEventListener('click', function(e) {
//     if (e.target && e.target.classList.contains('reduce-btn')) {
//       e.preventDefault();
//       var code = document.querySelector('textarea[name="code"]').value;
//       var formData = new FormData();
//       formData.append('code', code);
//       fetch('/suggest_reduction', {method: 'POST', body: formData})
//         .then(resp => resp.text())
//         .then(html => {
//           document.getElementById('suggestion-placeholder').innerHTML = html;
//         });
//     }
//   });
// });
// // Ensure this is in main.js and only one handler for .reduce-btn
// // Ensure this is in main.js and only one handler for .reduce-btn
// document.addEventListener('DOMContentLoaded', function() {
//   document.body.addEventListener('click', function(e) {
//     if (e.target && e.target.classList.contains('reduce-btn')) {
//       e.preventDefault();
//       const textarea = document.querySelector('.straddle-box textarea[name="code"]');
//       if (textarea) {
//         var code = textarea.value;
//         var formData = new FormData();
//         formData.append('code', code);
//         fetch('/reduce', {
//           method: 'POST',
//           headers: {'X-Requested-With': 'XMLHttpRequest'},
//           body: formData
//         })
//         .then(resp => resp.text())
//         .then(html => {
//           // Update only the refactored code box
//           document.getElementById('refactored-code-placeholder').innerHTML = html;
//         });
//       }
//     }
//   });
// });

// function copyReducedCode() {
//   const codeElement = document.getElementById("reducedCode");
//   if (codeElement) {
//     const code = codeElement.innerText;
//     navigator.clipboard.writeText(code).then(() => {
//       // Optional: Show a copied message
//       alert('Code copied to clipboard!');
//     });
//   }
// }




document.addEventListener('DOMContentLoaded', function() {
  // AJAX for main complexity form
  document.querySelector('.straddle-box form').addEventListener('submit', function(e) {
    e.preventDefault();
    var form = e.target;
    var formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      body: formData
    }).then(response => response.text())
      .then(html => {
        document.querySelector('.straddle-box').innerHTML = html;
        document.getElementById('explanation-placeholder').innerHTML = '';
        document.getElementById('suggestion-placeholder').innerHTML = '';
        document.getElementById('refactored-code-placeholder').innerHTML = '';
      });
  });

  // Delegate: Want to know why (AJAX to /explanation)
  document.body.addEventListener('click', function(e) {
    if(e.target && e.target.id === 'why-btn') {
      e.preventDefault();
      var code = document.querySelector('.straddle-box textarea').value;
      var formData = new FormData();
      formData.append('code', code);

      fetch('/explanation', {
        method: 'POST',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        body: formData
      }).then(response => response.text())
        .then(html => {
          document.getElementById('explanation-placeholder').innerHTML = html;
        });
    }
  });

  // Delegate: Want to reduce complexity (AJAX to /suggest_reduction)
  document.body.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'reduce-complexity-btn') {
      e.preventDefault();
      var code = document.querySelector('.straddle-box textarea').value;
      var formData = new FormData();
      formData.append('code', code);

      fetch('/suggest_reduction', {
        method: 'POST',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        body: formData
      }).then(response => response.text())
        .then(html => {
          document.getElementById('suggestion-placeholder').innerHTML = html;
          document.getElementById('refactored-code-placeholder').innerHTML = '';
        });
    }
  });

  // Delegate: Get Full Refactored Code (AJAX to /reduce)
  document.body.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('reduce-btn')) {
      e.preventDefault();
      var code = document.querySelector('.straddle-box textarea').value;
      var formData = new FormData();
      formData.append('code', code);

      fetch('/reduce', {
        method: 'POST',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        body: formData
      }).then(response => response.text())
        .then(html => {
          document.getElementById('refactored-code-placeholder').innerHTML = html;
        });
    }
  });
});

function copyReducedCode() {
  const codeElement = document.getElementById("reducedCode");
  if (codeElement) {
    const code = codeElement.innerText;
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    });
  }
}
