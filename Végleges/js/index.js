//Háttér elkészítése
document.addEventListener("DOMContentLoaded", function () {
  const particlesContainer = document.createElement("div");
  particlesContainer.classList.add("particles-container");
  document.body.appendChild(particlesContainer);

  const mathSymbols = ["+", "-", "*", "/", "=", "∫", "∑", "∆", "∞", "√", "∈"]; // Például matematikai jelek

  for (let i = 0; i < 150; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particles");
      particlesContainer.appendChild(particle);

      const randomSymbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
      const randomRotation = Math.random() * 90 - 45; // Véletlenszerű elforgatás -45° és 45° között
      particle.textContent = randomSymbol;

      // Véletlenszerű pozíciók és forgatás beállítása
      const maxWidth = window.innerWidth - 60; // 60 pixel margó hagyása a jeleknek
      const maxHeight = window.innerHeight - 60;

      particle.style.left = Math.random() * maxWidth + "px";
      particle.style.top = Math.random() * maxHeight + "px";
      particle.style.transform = `rotate(${randomRotation}deg)`;
  }
});

//hamburger menü animáció
$(document).ready(function () {

    $('.first-button').on('click', function () {
  
      $('.animated-icon1').toggleClass('open');
    });
    $('.second-button').on('click', function () {
  
      $('.animated-icon2').toggleClass('open');
    });
    $('.third-button').on('click', function () {
  
      $('.animated-icon3').toggleClass('open');
    });
  });