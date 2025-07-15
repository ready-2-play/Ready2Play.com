document.addEventListener("DOMContentLoaded", () => {
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
});