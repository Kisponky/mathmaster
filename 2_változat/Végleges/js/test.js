var feladvany = "1000/8=125";
var szamok = feladvany.match(/\d+/g);
var muvJelek = feladvany.match(/[+\-*/]/g);
var maradek = szamok[0] % szamok[1];

var elsoTag = szamok[0].split("");
var masodikTag = szamok[1].split("");


var elsoOsztaly = feladvany.match(/[+-]/g);
var harmadikOsztaly = feladvany.match(/[/]/g);
var harmadikOsztaly1 = feladvany.match(/[*]/g);
var negyedikOsztaly = feladvany.match(/[/]/g);
var negyedikOsztaly1 = feladvany.match(/[*]/g);

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

if ((localStorage.getItem('class') == 1 && elsoOsztaly && kisebbMint20 == true /*&& lekérdezés adatbázisból*/) || (localStorage.getItem('class') == 2 && kisebbMint100 == true /*&& lekérdezés adatbázisból*/) || (localStorage.getItem('class') == 3 && harmadikOsztaly && kisebbMint1000 == true && szamok[1].length == 1 /*&& lekérdezés adatbázisból*/)) {
    document.getElementById("tartalom").innerHTML = `
    <div class="col-1 col-md-4 col-lg-4 col-xl-5"></div>
    <div class="col-9 col-md-4 col-lg-3 col-xl-2 text-end">
        <span style="color: white; font-size: 16px; font-family: 'Poppins', sans-serif;">${szamok[0] + muvJelek[0] + szamok[1]}=</span>
        <input type="text" class="form-control align-self-center input-style">
        <button class="btn btn-danger" type="button" id="Ellenorzes">Eredmény</button>
    </div>
    <div class="col-2 col-md-4 col-lg-5 col-xl-5 align-self-center">
    </div>
    `;

    const inputs = document.querySelectorAll('.input-style');
    inputs.forEach(input => {
        input.style.width = '38px';
        input.style.margin = '0 3px 0 1px';
        input.style.padding = '3px 5px';
        input.style.textAlign = 'center';
        input.style.display = 'inline-block';
        input.style.borderRadius = '5px'
    });



    const button = document.getElementById('Ellenorzes');

    button.addEventListener('click', function () {
        const result = document.querySelector('.input-style').value;
        if (result === szamok[2]) {
            button.style.backgroundColor = 'rgb(0, 110, 0)';
            button.textContent = 'Jó válasz!';
        } else {
            button.style.backgroundColor = 'red';
            button.textContent = 'Rossz válasz!';
        }
    });


} else if ((localStorage.getItem('class') == 3 && kisebbMint1000 == true && elsoOsztaly /*&& lekérdezés adatbázisból*/) || (localStorage.getItem('class') == 4 && kisebbMint10000 == true && elsoOsztaly /*&& lekérdezés adatbázisból*/)) {
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
        const button = document.getElementById('Ellenorzes');

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
                button.style.backgroundColor = 'rgb(0, 110, 0)';
                button.textContent = 'Jó válasz!';
            } else {
                button.style.backgroundColor = 'red';
                button.textContent = 'Rossz válasz!';
            }
        });

    });



    // Az eredményHTML tartalmát illesszük be a tartalom elembe
    document.getElementById("tartalom").innerHTML = `
    <div class="col-3 col-md-5 col-xl-5"></div>
    <div class="col-4 col-md-2 col-xl-1  text-end">
        <div id="elso">${elsoTagInput}</div>
        <div class="position-absolute" style="color: white; font-size: 16px; font-family: 'Poppins', sans-serif;">${muvJelek}</div>
        <div id="masodik">${masodikTagInput}</div>
        <hr class="my-0" style="color: white;">
        <div id="eredmeny">${eredmenyInput}</div>
    </div>
    <div class="col-5 col-md-5 col-xl-6 align-self-center">
        <button class="btn btn-danger" type="button" id="Ellenorzes">Eredmény</button>
    </div>
    `;

    // Add CSS styles to the input elements
    const tag = document.querySelectorAll('.tag-style');
    tag.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0px 2px';
        input.style.padding = '1px 5px';
        input.style.border = 'none';
        input.style.background = 'none';
        input.style.color = 'white';
        input.style.fontSize = '16px';
        input.style.fontFamily = '"Poppins", sans-serif';
    });

    const inputs = document.querySelectorAll('.input-style');
    inputs.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0 2px';
        input.style.padding = '3px 5px';
    });




} else if ((localStorage.getItem('class') == 3 && kisebbMint1000 == true && harmadikOsztaly1 && szamok[1].length == 1 /*&& lekérdezés adatbázisból*/) || (localStorage.getItem('class') == 4 && kisebbMint10000 == true && negyedikOsztaly1 && szamok[1].length == 1 /*&& lekérdezés adatbázisból*/)) {
    var elsoTagInput = '';
    for (let i = 0; i < szamok[0].length; i++) {
        elsoTagInput += `<input type="text" class="form-control tag-style" value="${elsoTag[i]}" disabled>`;
    }

    var muvJelInput = `<input type="text" class="form-control tag-style" value="${muvJelek[0]}" disabled>`;


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

    var plus = szamok[1].length + 1;

    for (let i = 0; i < plus; i++) {
        eredmenyInput += `<input type="text" class="form-control tag-style" disabled>`;
    }

    // Az input mezőkre vonatkozó fókuszkezelő beállítása
    document.addEventListener("DOMContentLoaded", function () {
        const inputFields = document.querySelectorAll('.input-style');
        const button = document.getElementById('Ellenorzes');

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
                button.style.backgroundColor = 'rgb(0, 110, 0)';
                button.textContent = 'Jó válasz!';
            } else {
                button.style.backgroundColor = 'red';
                button.textContent = 'Rossz válasz!';
            }
        });

    });



    // Az eredményHTML tartalmát illesszük be a tartalom elembe
    document.getElementById("tartalom").innerHTML = `
    <div class="col-0 col-md-4 col-lg-5"></div>
    <div class="col-7 col-md-3 col-lg-2  text-end">
        <div id="elso">${elsoTagInput + muvJelInput + masodikTagInput}</div>
        <hr class="my-0" style="color: white;">
        <div id="eredmeny">${eredmenyInput}</div>
    </div>
    <div class="col-5 col-md-5 col-lg-5 align-self-center">
        <button class="btn btn-danger" type="button" id="Ellenorzes">Eredmény</button>
    </div>
    `;

    // Add CSS styles to the input elements
    const tag = document.querySelectorAll('.tag-style');
    tag.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0px 2px';
        input.style.padding = '1px 5px';
        input.style.border = 'none';
        input.style.background = 'none';
        input.style.color = 'white';
        input.style.fontSize = '16px';
        input.style.fontFamily = '"Poppins", sans-serif';
    });

    const inputs = document.querySelectorAll('.input-style');
    inputs.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0 2px';
        input.style.padding = '3px 5px';
    });
} else if ((localStorage.getItem('class') == 4 && kisebbMint10000 == true && negyedikOsztaly1 && szamok[1].length == 2 /*&& lekérdezés adatbázisból*/)) {
    var elsoTagInput = '';
    for (let i = 0; i < szamok[0].length; i++) {
        elsoTagInput += `<input type="text" class="form-control tag-style" value="${elsoTag[i]}" disabled>`;
    }

    var muvJelInput = `<input type="text" class="form-control tag-style" value="${muvJelek[0]}" disabled>`;


    var masodikTagInput = '';
    for (let i = 0; i < szamok[1].length; i++) {
        masodikTagInput += `<input type="text" class="form-control tag-style" value="${masodikTag[i]}" disabled>`;
    }

    // Létrehozunk egy üres stringet, amelybe a ciklus eredményét fűzzük majd
    var reszeredmenyInput1 = '';
    var reszeredmeny1 = szamok[0] * (Math.floor(szamok[1] / 10));

    // Az input mezők számának meghatározása
    var inputCount1 = reszeredmeny1.toString().length;

    // Fordított sorrendben beállítjuk a tabindex értéket az input mezőkön
    for (let i = 0; i < inputCount1; i++) {
        let reversedTabIndex1 = inputCount1 - i;
        reszeredmenyInput1 += `<input type="text" class="form-control mt-1 input-style" maxlength="1" oninput="this.value = this.value.replace(/[^0-9]/g, '')" if(this.value.length === 1) { document.querySelector('input[tabindex=\"${reversedTabIndex1}\"] + input').focus(); }" tabindex="${reversedTabIndex1}">`;
    }

    var plus1 = szamok[1].length + 1;

    for (let i = 0; i < plus1; i++) {
        reszeredmenyInput1 += `<input type="text" class="form-control tag-style" disabled>`;
    }




    // Létrehozunk egy üres stringet, amelybe a ciklus eredményét fűzzük majd
    var reszeredmenyInput2 = '';
    var reszeredmeny2 = szamok[0] * (Math.floor(szamok[1] % 10));

    // Az input mezők számának meghatározása
    var inputCount2 = reszeredmeny2.toString().length;
    var plus2 = szamok[1].length;

    var maradek = (szamok[0].length + szamok[1].length + 1) - (inputCount2 + plus2);

    if (maradek != 0) {
        if (inputCount1 > inputCount2) {
            for (let i = 0; i < maradek + 1; i++) {
                reszeredmenyInput2 += `<input type="text" class="form-control tag-style" disabled>`;
            }
        } else {
            for (let i = 0; i < maradek; i++) {
                reszeredmenyInput2 += `<input type="text" class="form-control tag-style" disabled>`;
            }
        }
    } else if (inputCount1 == inputCount2) {
        for (let i = 0; i < maradek + 1; i++) {
            reszeredmenyInput2 += `<input type="text" class="form-control tag-style" disabled>`;
        }
    } else { }

    // Fordított sorrendben beállítjuk a tabindex értéket az input mezőkön
    for (let i = 0; i < inputCount2; i++) {
        let reversedTabIndex2 = inputCount1 - i;
        reszeredmenyInput2 += `<input type="text" class="form-control mt-1 input-style" maxlength="1" oninput="this.value = this.value.replace(/[^0-9]/g, '')" if(this.value.length === 1) { document.querySelector('input[tabindex=\"${reversedTabIndex2}\"] + input').focus(); }" tabindex="${reversedTabIndex2}">`;
    }



    for (let i = 0; i < plus2; i++) {
        reszeredmenyInput2 += `<input type="text" class="form-control tag-style" disabled>`;
    }




    // Létrehozunk egy üres stringet, amelybe a ciklus eredményét fűzzük majd
    var eredmenyInput = '';

    // Az input mezők számának meghatározása
    var inputCount = szamok[2].length;

    // Fordított sorrendben beállítjuk a tabindex értéket az input mezőkön
    for (let i = 0; i < inputCount; i++) {
        let reversedTabIndex = inputCount - i;
        eredmenyInput += `<input type="text" id="eredmeny" class="form-control mt-1 input-style" maxlength="1" oninput="this.value = this.value.replace(/[^0-9]/g, '')" if(this.value.length === 1) { document.querySelector('input[tabindex=\"${reversedTabIndex}\"] + input').focus(); }" tabindex="${reversedTabIndex}">`;
    }

    var plus = szamok[1].length;

    for (let i = 0; i < plus; i++) {
        eredmenyInput += `<input type="text" class="form-control tag-style" disabled>`;
    }

    // Az input mezőkre vonatkozó fókuszkezelő beállítása
    document.addEventListener("DOMContentLoaded", function () {
        const inputFields = document.querySelectorAll('.input-style');
        const button = document.getElementById('Ellenorzes');

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
                    }
                }
            });
        });


        button.addEventListener('click', function () {
            // Az összes input elem kiválasztása a "Eredmény" id-vel rendelkező div alatt
            var inputMezok = document.querySelectorAll('#eredmeny input[type="text"]');

            // Az összes input mező értékeinek kinyerése és összevonása egy stringbe
            var result = "";
            inputMezok.forEach(function (input) {
                result += input.value;
                input.disabled = true;
            });

            if (result === szamok[2]) {
                button.style.backgroundColor = 'rgb(0, 110, 0)';
                button.textContent = 'Jó válasz!';
            } else {
                button.style.backgroundColor = 'red';
                button.textContent = 'Rossz válasz!';
            }
        });
    });



    // Az eredményHTML tartalmát illesszük be a tartalom elembe
    document.getElementById("tartalom").innerHTML = `
    <div class="col-0 col-md-4 col-xl-5"></div>
    <div class="col-8 col-md-3 col-xl-2 text-end">
        <div id="elso">${elsoTagInput + muvJelInput + masodikTagInput}</div>
        <hr class="my-0" style="color: white;">
        <div>${reszeredmenyInput1}</div>
        <div style="color: white;">+${reszeredmenyInput2}</div>
        <hr class="my-0" style="color: white;">
        <div id="eredmeny">${eredmenyInput}</div>
    </div>
    <div class="col-4 col-md-5 col-xl-5 align-self-center">
        <button class="btn btn-danger" type="button" id="Ellenorzes">Eredmény</button>
    </div>
    `;


    // Add CSS styles to the input elements
    const tag = document.querySelectorAll('.tag-style');
    tag.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0px 2px';
        input.style.padding = '1px 5px';
        input.style.border = 'none';
        input.style.background = 'none';
        input.style.color = 'white';
        input.style.fontSize = '16px';
        input.style.fontFamily = '"Poppins", sans-serif';
    });

    const inputs = document.querySelectorAll('.input-style');
    inputs.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0 2px 1px 2px';
        input.style.padding = '3px 5px';
    });

} else if ((localStorage.getItem('class') == 4 && kisebbMint10000 == true && negyedikOsztaly && szamok[1].length == 1 /*&& lekérdezés adatbázisból*/)) {
    var elsoTagInput = '';
    for (let i = 0; i < szamok[0].length; i++) {
        elsoTagInput += `<input type="text" class="form-control tag-style" value="${elsoTag[i]}" disabled>`;
    }

    var muvJelInput = `<input type="text" class="form-control tag-style" value="${muvJelek[0]}" disabled>`;


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
        eredmenyInput += `<input type="text" id="eredmeny" class="form-control mt-1 input-style" maxlength="1" oninput="this.value = this.value.replace(/[^0-9]/g, '')" if(this.value.length === 1) { document.querySelector('input[tabindex=\"${reversedTabIndex}\"] + input').focus(); }" tabindex="${reversedTabIndex}">`;
    }


    var maradekInput = '';

    var maradekNoneInput = (szamok[0].length - 3) + 2 + szamok[1].length + szamok[2].length;

    var maradekBlockInput = szamok[0].length + 2 + szamok[1].length + szamok[2].length - maradekNoneInput;


    if (elsoTag[0] >= szamok[1]) {
        if (szamok[0].length > 2) {
            for (let i = 0; i < szamok[0].length; i++) {
                if (szamok[0].length - 1 == i) {
                    // Hozzáadunk egy div-et, majd az input elemeket az adott div-hez
                    maradekInput += `<div>`;
                    for (let j = 0; j < maradekBlockInput - 2; j++) {
                        maradekInput += `<input type="text" id="helyesMaradek" class="form-control mt-1 input-style">`;
                    }
                    for (let j = 0; j < maradekNoneInput + 2; j++) {
                        maradekInput += `<input type="text" class="form-control tag-style" disabled>`;
                    }
                    maradekInput += `</div>`;
                    maradekNoneInput--;
                } else {
                    // Hozzáadunk egy div-et, majd az input elemeket az adott div-hez
                    maradekInput += `<div>`;
                    for (let j = 0; j < maradekBlockInput - 1; j++) {
                        maradekInput += `<input type="text" class="form-control mt-1 input-style">`;
                    }
                    for (let j = 0; j < maradekNoneInput + 1; j++) {
                        maradekInput += `<input type="text" class="form-control tag-style" disabled>`;
                    }
                    maradekInput += `</div>`;
                    maradekNoneInput--;
                }
            }
        } else {
            for (let i = 0; i < szamok[0].length; i++) {
                if (szamok[0].length - 1 == i) {
                    // Hozzáadunk egy div-et, majd az input elemeket az adott div-hez
                    maradekInput += `<div>`;
                    for (let j = 0; j < maradekBlockInput - 2; j++) {
                        maradekInput += `<input type="text" id="helyesMaradek" class="form-control mt-1 input-style">`;
                    }
                    for (let j = 0; j < maradekNoneInput + 2; j++) {
                        maradekInput += `<input type="text" class="form-control tag-style" disabled>`;
                    }
                    maradekInput += `</div>`;
                    maradekNoneInput--;
                } else {
                    // Hozzáadunk egy div-et, majd az input elemeket az adott div-hez
                    maradekInput += `<div>`;
                    for (let j = 0; j < maradekBlockInput - 1; j++) {
                        maradekInput += `<input type="text" class="form-control mt-1 input-style">`;
                    }
                    for (let j = 0; j < maradekNoneInput + 1; j++) {
                        maradekInput += `<input type="text" class="form-control tag-style" disabled>`;
                    }
                    maradekInput += `</div>`;
                    maradekNoneInput--;
                }
            }
        }
    } else {
        for (let i = 0; i < szamok[0].length - 1; i++) {
            if (szamok[0].length - 2 == i) {
                maradekInput += `<div>`;
                for (let j = 0; j < maradekBlockInput - 2; j++) {
                    maradekInput += `<input type="text" id="helyesMaradek" class="form-control mt-1 input-style">`;
                }
                for (let j = 0; j < maradekNoneInput + 1; j++) {
                    maradekInput += `<input type="text" class="form-control tag-style" disabled>`;
                }
                maradekInput += `</div>`;
                maradekNoneInput--;
            } else {
                // Hozzáadunk egy div-et, majd az input elemeket az adott div-hez
                maradekInput += `<div>`;
                for (let j = 0; j < maradekBlockInput - 1; j++) {
                    maradekInput += `<input type="text" class="form-control mt-1 input-style">`;
                }
                for (let j = 0; j < maradekNoneInput; j++) {
                    maradekInput += `<input type="text" class="form-control tag-style" disabled>`;
                }
                maradekInput += `</div>`;
                maradekNoneInput--;
            }
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const button = document.getElementById('Ellenorzes');
        
        button.addEventListener('click', function () {
            // Az összes input elem kiválasztása a "Eredmény" id-vel rendelkező div alatt
            var inputMezok = document.querySelectorAll('#eredmeny input[type="text"]');

            // Az összes input mező értékeinek kinyerése és összevonása egy stringbe
            var result = "";
            inputMezok.forEach(function (input) {
                result += input.value;
                input.disabled = true;
            });

            if (result.includes('=')) {
                var result2 = result.split('=')[1];
            }

            if (result2 === szamok[2]) {
                button.style.backgroundColor = 'rgb(0, 110, 0)';
                button.style.fontSize = '16px';
                button.style.fontFamily = '"Poppins", sans-serif';
                button.textContent = 'Jó válasz!';
            } else {
                button.style.backgroundColor = 'red';
                button.style.fontSize = '16px';
                button.style.fontFamily = '"Poppins", sans-serif';
                button.textContent = 'Rossz válasz!';
            }
        });
    });

    // Az eredményHTML tartalmát illesszük be a tartalom elembe
    document.getElementById("tartalom").innerHTML = `
    <div class="col-0 col-md-3 col-lg-4 col-xl-4"></div>
    <div class="col-12 col-md-5 col-lg-4 col-xl-3  text-end">
        <div id="eredmeny">${elsoTagInput + muvJelInput + masodikTagInput + '<input type="text" class="form-control tag-style" value="=" disabled>' + eredmenyInput}</div>
        ${maradekInput}
    </div>
    <div class="col-12 col-md-4 col-lg-4 col-xl-5 align-self-center text-center text-sm-start">
        <button class="btn btn-danger" type="button" id="Ellenorzes">Eredmény</button>
    </div>
    `;


    // Add CSS styles to the input elements
    const tag = document.querySelectorAll('.tag-style');
    tag.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0px 2px';
        input.style.padding = '1px 5px';
        input.style.border = 'none';
        input.style.background = 'none';
        input.style.color = 'white';
        input.style.fontSize = '16px';
        input.style.fontFamily = '"Poppins", sans-serif';
    });

    const inputs = document.querySelectorAll('.input-style');
    inputs.forEach(input => {
        input.style.width = '20px';
        input.style.display = 'inline-block';
        input.style.margin = '0 2px 1px 2px';
        input.style.padding = '3px 5px';
    });
}