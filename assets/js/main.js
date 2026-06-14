/* Scroll-reveal: fade + rise sections into view as they enter the viewport. */
(function () {
  "use strict";

  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  // If the browser can't observe (or the user prefers reduced motion), just
  // show everything immediately.
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
})();
