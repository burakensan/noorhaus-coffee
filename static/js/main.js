document.addEventListener("DOMContentLoaded", () => {
  const bgLogo = document.querySelector(".bg-logo");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const hoursSection = document.querySelector("#hours");

  if (!bgLogo) {
    console.error("bg-logo nicht gefunden");
    return;
  }

  if (sections.length > 0 && links.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`.nav-link[href="#${id}"]`);

          if (!link) return;

          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function updateLogoFade() {
    if (!hoursSection) return;

    const rect = hoursSection.getBoundingClientRect();
    let opacity = 1;

    if (rect.top <= window.innerHeight) {
      const progress = Math.min(
        Math.max((window.innerHeight - rect.top) / window.innerHeight, 0),
        1
      );
      opacity = 1 - progress * 0.9;
    }

    bgLogo.style.opacity = opacity.toFixed(3);
  }

  updateLogoFade();
  window.addEventListener("scroll", updateLogoFade, { passive: true });
  window.addEventListener("resize", updateLogoFade);
});