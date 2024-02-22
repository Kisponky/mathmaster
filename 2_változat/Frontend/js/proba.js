var feladvany = "16+12=28";
var szamok = feladvany.match(/\d+/g);
var muvJelek = feladvany.match(/[+\-*/]/g);

var elsoTag = szamok[0].split("");
var masodikTag = szamok[1].split("");

console.log("Első szám karakterei: ", elsoTag[1]);
console.log("Második szám karakterei: ", masodikTag[1]);


var elsoOsztaly = feladvany.match(/[+-]/g);

var kisebbMint20 = true;
var kisebbMint100 = true;
var kisebbMint1000 = true;
var kisebbMint10000 = true;
for (let i = 0; i < szamok.length; i++) {
    if (szamok[i] > 20) {
        kisebbMint20 = false;
    }

    if (szamok[i] > 100) {
        kisebbMint100 = false;
    }

    if (szamok[i] > 1000) {
        kisebbMint1000 = false;
    }

    if (szamok[i] > 10000) {
        kisebbMint10000 = false;
    }
}

var tartalom = document.getElementById('tartalom');

if ((localStorage.getItem('class') == 1 && elsoOsztaly && kisebbMint20 == true /*&& lekérdezés adatbázisból*/) || (localStorage.getItem('class') == 2 && kisebbMint100 == true /*&& lekérdezés adatbázisból*/)) {
    document.getElementById("tartalom").innerHTML = `
    <div class="col-3 col-md-5 col-lg-5"></div>
    <div class="col-8 col-md-4 col-lg-3">
        <div class="d-flex mt-5 align-item-center">
            <span id="elso" class="align-self-center">${szamok[0]}</span>
            <span id="muvelet" class="align-self-center">${muvJelek}</span>
            <span id="masodik" class="align-self-center">${szamok[1]}</span>
            <span id="masodik" class="align-self-center">=</span>
            <input type="text" class="form-control align-self-center input-style">
            <button class="btn btn-danger align-self-center">Beküldés</button>
        </div>
    </div>
    <div class="col-1 col-md-3 col-lg-4 align-self-center"></div>
    `;

    const inputs = document.querySelectorAll('.input-style');
    inputs.forEach(input => {
        input.style.width = '38px';
        input.style.margin = '0 5px 0 2px';
        input.style.padding = '3px 5px';
    });



    const button = document.querySelector('button');

    button.addEventListener('click', function () {
        const inputFieldValue = document.querySelector('.input-style').value;
        if (inputFieldValue === szamok[2]) {
            console.log("Jó válasz!");
            button.style.backgroundColor = 'rgb(0, 110, 0)';
            button.textContent = 'Jó válasz!';
        } else {
            console.log("Rossz válasz!");
            button.style.backgroundColor = 'red';
            button.textContent = 'Rossz válasz!';
        }
    });


} else if ((localStorage.getItem('class') == 3 && kisebbMint1000 == true /*&& lekérdezés adatbázisból*/) || (localStorage.getItem('class') == 4 && kisebbMint10000 == true /*&& lekérdezés adatbázisból*/)) {
    var elsoTagInput = '';
    for (let i = 0; i < szamok[0].length; i++) {
        elsoTagInput += `<input type="text" class="form-control tag-style" value="${elsoTag[i]}" disabled>`;
    }

    var masodikTagInput = '';
    for (let i = 0; i < szamok[1].length; i++) {
        masodikTagInput += `<input type="text" class="form-control tag-style" value="${masodikTag[i]}" disabled>`;
    }

    // Létrehozunk egy üres stringet, amelybe a ciklus eredményét fűzzük majd
    var eredmenyInput = '';

    // Az input mezők számának meghatározása
    var inputCount = szamok[2].length;

    // Fordított sorrendben beállítjuk a tabindex értéket az input mezőkön
    for (let i = 0; i < inputCount; i++) {
        let reversedTabIndex = inputCount - i;
        eredmenyInput += `<input type="text" class="form-control mt-1 input-style" maxlength="1" oninput="this.value = this.value.replace(/[^0-9]/g, '')" if(this.value.length === 1) { document.querySelector('input[tabindex=\"${reversedTabIndex}\"] + input').focus(); }" tabindex="${reversedTabIndex}">`;
    }

    // Az input mezőkre vonatkozó fókuszkezelő beállítása
    document.addEventListener("DOMContentLoaded", function () {
        const inputFields = document.querySelectorAll('.input-style');
        const button = document.querySelector('button');

        inputFields.forEach((input, index) => {
            input.addEventListener('input', function (event) {
                if (event.target.value.length === 1) {
                    const nextInput = inputFields[index - 1];
                    if (nextInput) {
                        nextInput.focus();
                    } else {
                        let result = '';
                        inputFields.forEach(input => {
                            result += input.value;
                        });
                        console.log("Eredmény: ", result);
                    }
                }
            });
        });

        button.addEventListener('click', function () {
            let result = '';
            inputFields.forEach(input => {
                result += input.value;
                input.disabled = true;
            });

            if (result === szamok[2]) {
                console.log("Jó válasz!");
                button.style.backgroundColor = 'rgb(0, 110, 0)';
                button.textContent = 'Jó válasz!';
            } else {
                console.log("Rossz válasz!");
                button.style.backgroundColor = 'red';
                button.textContent = 'Rossz válasz!';
            }
        });

    });



    // Az eredményHTML tartalmát illesszük be a tartalom elembe
    document.getElementById("tartalom").innerHTML = `
    <div class="col-2 col-md-4 col-lg-5"></div>
    <div class="col-5 col-md-3 col-lg-2  text-end">
        <div id="elso">${elsoTagInput}</div>
        <div class="position-absolute">${muvJelek}</div>
        <div id="masodik">${masodikTagInput}</div>
        <hr class="my-0">
        <div id="eredmeny">${eredmenyInput}</div>
    </div>
    <div class="col-5 col-md-5 col-lg-5 align-self-center">
        <button class="btn btn-danger" type="button">Eredmény</button>
    </div>
    `;

    const button = document.querySelector('button');

    // Add CSS styles to the input elements
    const tag = document.querySelectorAll('.tag-style');
    tag.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0px 2px';
        input.style.padding = '1px 5px';
        input.style.border = 'none';
        input.style.background = 'none';
    });

    const inputs = document.querySelectorAll('.input-style');
    inputs.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0 2px';
        input.style.padding = '3px 5px';
    });




}

console.log(szamok);
console.log(muvJelek);