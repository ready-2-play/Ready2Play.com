document.addEventListener("DOMContentLoaded", () => {
     const carousel = document.getElementById("team");
     const prevBtn = document.getElementById("prevBtn");
     const nextBtn = document.getElementById("nextBtn");

     fetch('team.json')
          .then(response => response.json())
          .then(teamData => {
               teamData.forEach(member => {
                    const card = document.createElement("div");
                    card.classList.add("team-card");
                    card.innerHTML = `
                    <img src="${member.image}" alt="${member.name}" style="width:100%; height:200px; object-fit:cover; border-radius:10px; margin-bottom:10px;">
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <p><strong>About me:</strong> ${member.about_me}</p>
                    <p><strong>Favorite games:</strong> ${member.favorite_games}</p>
                    `;
                    carousel.appendChild(card);
               });

               const cards = document.querySelectorAll(".team-card");
               let currentIndex = 0;

               const isMobile = window.innerWidth <= 768;

               if (!isMobile) {
                    // DESKTOP MODE (una card visible con .active)
                    function updateCarousel() {
                         cards.forEach((card, index) => {
                              card.classList.toggle("active", index === currentIndex);
                         });

                         prevBtn.disabled = currentIndex === 0;
                         nextBtn.disabled = currentIndex === cards.length - 1;
                    }

                    prevBtn.addEventListener("click", () => {
                         if (currentIndex > 0) {
                              currentIndex--;
                              updateCarousel();
                         }
                    });

                    nextBtn.addEventListener("click", () => {
                         if (currentIndex < cards.length - 1) {
                              currentIndex++;
                              updateCarousel();
                         }
                    });

                    updateCarousel(); // Mostrar primera card
               } else {
                    // MOBILE MODE (scroll horizontal)
                    prevBtn.addEventListener("click", () => {
                         carousel.scrollBy({
                              left: -300,
                              behavior: 'smooth'
                         });
                    });

                    nextBtn.addEventListener("click", () => {
                         carousel.scrollBy({
                              left: 300,
                              behavior: 'smooth'
                         });
                    });
               }
          })
          .catch(error => {
               console.error("Error cargando el JSON:", error);
          });
});

document.addEventListener("DOMContentLoaded", () => {
     document.body.classList.add("page-enter");
});

window.addEventListener('load', () => {
     const audio = document.getElementById('start-sound');
     audio.volume = 0.5; // volumen medio
     audio.play().catch(e => {
          console.log('Autoplay bloqueado. Se reproducirá tras una interacción.');
     });
});