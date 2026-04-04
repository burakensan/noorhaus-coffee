document.addEventListener("DOMContentLoaded", () => {
  const bgLogo = document.querySelector(".bg-logo");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const hoursSection = document.querySelector("#hours");

  // Aktiven Nav-Link markieren
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

  // Hintergrundlogo ab der Hours-Section ausblenden
  function updateLogoFade() {
    if (!bgLogo || !hoursSection) return;

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

  // Contact copy cards
  const copyItems = document.querySelectorAll(".copy-item");

  copyItems.forEach((item) => {
    item.addEventListener("click", async () => {
      const value = item.dataset.copy;
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);

        item.classList.add("copied");

        const originalLabel = item.querySelector(".contact-label");
        const previousText = originalLabel.textContent;
        originalLabel.textContent = "Copied";

        setTimeout(() => {
          item.classList.remove("copied");
          originalLabel.textContent = previousText;
        }, 1200);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    });
  });

  // Swipe / drag sliders for menu images
  const sliders = document.querySelectorAll(".menu-slider");

  sliders.forEach((slider) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    slider.addEventListener("mousedown", (event) => {
      isDown = true;
      slider.classList.add("is-dragging");
      startX = event.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("is-dragging");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("is-dragging");
    });

    slider.addEventListener("mousemove", (event) => {
      if (!isDown) return;
      event.preventDefault();

      const x = event.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeft - walk;
    });
  });
});