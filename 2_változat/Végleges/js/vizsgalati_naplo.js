document.addEventListener('DOMContentLoaded', () => {
    const datumHeader = document.getElementById('datumHeader');
    const caretIconContainer = document.getElementById('caretIcon');
    const caretIcon = caretIconContainer.firstElementChild;

    // Tükrözött ikon létrehozása
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
            // Tükrözött ikon megjelenítése
            caretIconContainer.innerHTML = '';
            caretIconContainer.appendChild(mirroredIcon);
            auditLog(document.getElementById("select").value, "DESC")
        } else {
            // Eredeti ikon visszaállítása
            caretIconContainer.innerHTML = '';
            caretIconContainer.appendChild(caretIcon);
            auditLog(document.getElementById("select").value, "ASC")
        }

        isMirrored = !isMirrored;
        localStorage.setItem("isMirrored", isMirrored);
        
    });
});
