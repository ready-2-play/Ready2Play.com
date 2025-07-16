/* document.addEventListener("DOMContentLoaded", () => {
     fetch('team.json')
          .then(response => {
               if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
               }
               return response.json();
          })
          .then(data => {
               const container = document.querySelector('.team-carousel');

               data.forEach(member => {
                    const card = document.createElement('div');
                    card.classList.add('team-card');

                    card.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p><strong>${member.description}</strong></p>
          <p><em>About me:</em> ${member.about_me}</p>
          <p><em>Favorite games:</em> ${member.favorite_games}</p>
        `;

                    container.appendChild(card);
               });
          })
          .catch(error => console.error('Error loading team.json:', error));
}); */

document.addEventListener("DOMContentLoaded", () => {
     const carousel = document.getElementById("team");
     const prevBtn = document.getElementById("prevBtn");
     const nextBtn = document.getElementById("nextBtn");

     fetch('team.json')
          .then(response => response.json())
          .then(teamData => {
               // Insertar tarjetas
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

               updateCarousel(); // mostrar primera tarjeta
          })
          .catch(error => {
               console.error("Error cargando el JSON:", error);
          });
});