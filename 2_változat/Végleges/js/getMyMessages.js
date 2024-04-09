function uezenetekBetolt() {
  fetch("http://localhost:8000/api/admin/archived-messages", {
      method: 'GET',
      headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json',
      }
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const messages = document.getElementById('messages');
          data.forEach(kapcsolat => {
              let bubi = `
                  <div class="message-buborek" id="message-buborek${kapcsolat.kapcsolat_id}">
                      <div class="message-header">
                          <div class="message-user">${kapcsolat.felhasznalo_teljes_nev}</div>
                          <div class="message-date">${new Date(kapcsolat.letrehozas_datuma).toLocaleDateString()}</div>
                      </div>
                      <div class="message-text">
                          <span><b>Üzenetem:</b> ${kapcsolat.beerkezett_uzenet}<br>
                          <span><b>Válasz:</b> ${kapcsolat.valasz_uzenet}</span>
                      </div>
                      <div class="message-actions">
                          <button class="btn btn-danger btn-danger-class" onclick="torles(${kapcsolat.kapcsolat_id})">Törlés</button>
                      </div>
                  </div>
              `;
              messages.innerHTML += bubi;
          });
      })
      .catch(error => console.error('Fetch error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  uezenetekBetolt();
});

function torles(id) {
  fetch(`http://localhost:8000/api/admin/kapcsolat/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
      }
  })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP hiba! Státusz: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Sikeres törlés:', data);
          Swal.fire("Sikeres törlés!", "Az üzenet törlésre került.", "success")
          document.getElementById('message-buborek'+id.toString()).remove();
      })
      .catch(error => {
          console.error('Hiba a törlés során:', error);
          Swal.fire("Hiba a törlés során!", `${error}`, "error")
      });

}