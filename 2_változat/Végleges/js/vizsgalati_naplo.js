document.addEventListener('DOMContentLoaded', () => {
    const datumHeader = document.getElementById('datumHeader');
    const caretIconContainer = document.getElementById('caretIcon');
    const caretIcon = caretIconContainer.firstElementChild;

    const mirroredIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mirroredIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    mirroredIcon.setAttribute('width', '16');
    mirroredIcon.setAttribute('height', '16');
    mirroredIcon.setAttribute('fill', 'currentColor');
    mirroredIcon.setAttribute('class', 'bi bi-caret-down-fill');
    mirroredIcon.setAttribute('viewBox', '0 0 16 16');
    mirroredIcon.innerHTML = `
<path d="M8.753 4.86l4.796 5.482c.566.648.106 1.661-.753 1.661H3.204a1 1 0 0 1-.753-1.659l4.796-5.48a1 1 0 0 1 1.506 0z"/>
`;

    let isMirrored = false;
    localStorage.setItem("isMirrored", isMirrored);

    datumHeader.addEventListener('click', () => {
        if (!isMirrored) {
            caretIconContainer.innerHTML = '';
            caretIconContainer.appendChild(mirroredIcon);
            auditLog(document.getElementById("select").value, "DESC")
        } else {
            caretIconContainer.innerHTML = '';
            caretIconContainer.appendChild(caretIcon);
            auditLog(document.getElementById("select").value, "ASC")
        }

        isMirrored = !isMirrored;
        localStorage.setItem("isMirrored", isMirrored);

    });



    adminCheck();



    auditLog(document.getElementById("select").value, "ASC")
});


function adminCheck() {
    fetch('http://localhost:8000/api/auth/check-admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message.includes('403') || error.message.includes('401')) {
                window.location.href = '../index.html';
            }
        });
}


function orderType(type) {
    if (type == "true") {
        return "DESC";
    } else {
        return "ASC";
    }
}

function auditLog(type, order) {
    document.getElementById("tableBody").innerHTML = "";
    fetch(`http://localhost:8000/api/auditLog/vizsgalatinaplo/${type}/${order}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.data)
            const selectElement = document.getElementById('select');
            const tipusok = data.data.tipusok;
            selectElement.innerHTML = '<option value="null">Szűrés kikapcsolva</option>';

            tipusok.forEach(tipus => {
                const option = document.createElement('option');
                option.value = tipus;
                option.text = tipus;
                if (tipus == type) {
                    option.selected = true;
                }
                selectElement.appendChild(option);
            });

            const tableBody = document.getElementById('tableBody');
            data.data.vizsgalatinaplo.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
          <th scope="row">${row.naplo_id}</th>
          <td>${row.felhasznalonev}</td>
          <td>${row.email}</td>
          <td>${row.tipus}</td>
          <td>${row.megjegyzes}</td>
          <td>${new Date(row.datum).toLocaleString('hu-HU', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
        `;
                tableBody.appendChild(tr);
            });



        })
        .catch(error => console.error('Error:', error));
}