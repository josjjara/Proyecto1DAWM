// Spinner
var spinner = function () {
  setTimeout(function () {
      document.querySelector("#spinner").classList.remove("show");
  }, 1);
};


document.addEventListener("DOMContentLoaded",()=>{spinner();});

// Back to top button
window.scroll(function () {
  if (document.querySelector(this).scrollTop > 300) {
    document.querySelector(".back-to-top").fadeIn("slow");
  } else {
    document.querySelector(".back-to-top").fadeOut("slow");
  }
});



document.querySelector(".back-to-top").click(function () {
  document
    .querySelector("html, body")
    .animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
  return false;
});



// Sidebar Toggler
document.querySelector(".sidebar-toggler").click(function () {
  document.querySelector(".sidebar, .content").classList.toggle("open");
  return false;
});




