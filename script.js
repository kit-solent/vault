// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

document.addEventListener("DOMContentLoaded", load_data)

var sticky
function load_data() {
  sticky = header.offsetTop;
}

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
