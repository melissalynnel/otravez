const animatedSections = document.querySelectorAll(".hero, .feature-card, .story-copy, .story-panel");

animatedSections.forEach((section) => {
  section.setAttribute("data-reveal", "");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

animatedSections.forEach((section) => observer.observe(section));
