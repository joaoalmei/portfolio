document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleThemeBtn");
  const iconMoon = document.getElementById("icon-moon");
  const iconSun = document.getElementById("icon-sun");

  // Função para aplicar o tema e atualizar ícones e atributos ARIA
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleBtn.setAttribute("aria-pressed", "true");
      iconMoon.style.display = "inline";
      iconSun.style.display = "none";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      toggleBtn.setAttribute("aria-pressed", "false");
      iconMoon.style.display = "none";
      iconSun.style.display = "inline";
    }
  };

  // Aplica o tema salvo no localStorage ou o padrão 'light'
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // Alterna tema ao clicar no botão
  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // Foco acessível para links do nav: foca no título da seção após navegação
  const navLinks = document.querySelectorAll("header nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        setTimeout(() => {
          const heading = targetSection.querySelector("h2, h3");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
            heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
          }
        }, 400);
      }
    });
  });

  // Remove foco inicial para evitar retângulo branco no reload
  if (document.activeElement && document.activeElement !== document.body) {
    document.activeElement.blur();
  }

  // Animação fade-in usando IntersectionObserver
  const fadeElements = document.querySelectorAll(".fade-in");
  const observerOptions = { threshold: 0.1 };
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ===== MENU MOBILE =====
  const hamburger = document.querySelector(".hamburger");
  const nav = document.getElementById("menu-principal");

  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!isExpanded));
    nav.classList.toggle("show");
  });

  // Fecha menu ao clicar em qualquer link do nav no mobile
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("show")) {
        nav.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });
});
