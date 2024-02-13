document.addEventListener("DOMContentLoaded", function () {
    var currentQuestionIndex = 0; // A változó az aktuális kérdés indexének nyomon követésére

    // Get the button elements
    var nyilButton = document.getElementById("jobbranyil");
    var balranyil = document.getElementById("balranyil");

    // Kérdések tömbje
    var questions = [
        "1. Kvíz kérdés...",
        "2. Kvíz kérdés...",
        "3. Kvíz kérdés...",
        "4. Kvíz kérdés...",
        "5. Kvíz kérdés...",
        "6. Kvíz kérdés...",
        "7. Kvíz kérdés...",
        "8. Kvíz kérdés...",
        "9. Kvíz kérdés...",
        "10. Kvíz kérdés...",
    ];

    // Add click event listener to the right arrow button
    nyilButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Check if all form fields are filled
        var inputs = document.querySelectorAll('input[type="text"]');
        var select = document.getElementById('Select');
        var filled = true;
        inputs.forEach(function (input) {
            if (input.value === '') {
                filled = false;
                return;
            }
        });
        if (select.value === '') {
            filled = false;
        }

        if (!filled) {
            alert('Minden mezőt ki kell tölteni!');
            return;
        }

        var selectedValue = select.value;

        // Save form data to localStorage
        var formData = {
            osztaly: select.value,
            kerdes: document.getElementById('floatingInput1').value,
            valasz1: document.getElementById('floatingInput2').value,
            valasz2: document.getElementById('floatingInput3').value,
            valasz3: document.getElementById('floatingInput4').value,
            valasz4: document.getElementById('floatingInput5').value
        };
        localStorage.setItem('formData', JSON.stringify(formData));

        // Clear form fields
        inputs.forEach(function (input) {
            input.value = '';
        });
        select.value = '';

        // Print form data to console
        console.log(formData);

        // Change display property of bootstrap class
        balranyil.classList.remove("d-none");
        balranyil.classList.add("d-block");

        // Increment the currentQuestionIndex
        currentQuestionIndex++;
        // Check if we reached the end of questions array, if yes, reset it to 0
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = 0;
        }
        // Update question label
        document.getElementById('questionLabel').innerText = questions[currentQuestionIndex];

        select.disabled = true;
        select.value = selectedValue;
    });

    // Add click event listener to the left arrow button
    balranyil.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data from localStorage
        var savedFormData = JSON.parse(localStorage.getItem('formData'));

        // Fill form fields with saved data
        document.getElementById('Select').value = savedFormData.osztaly;
        document.getElementById('floatingInput1').value = savedFormData.kerdes;
        document.getElementById('floatingInput2').value = savedFormData.valasz1;
        document.getElementById('floatingInput3').value = savedFormData.valasz2;
        document.getElementById('floatingInput4').value = savedFormData.valasz3;
        document.getElementById('floatingInput5').value = savedFormData.valasz4;

        // Print message to console
        console.log('Előzőleg mentett adatok visszatöltve: ', savedFormData);
    });
});