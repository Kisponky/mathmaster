const valaszGomb = document.getElementById("valaszGomb");
const deleteGomb = document.getElementById("deleteGomb");
const valaszForm = document.getElementById("valaszForm");

valaszGomb.addEventListener("click", function () {
    valaszGomb.style.display = "none";
    deleteGomb.style.display = "none";
    valaszForm.style.display = "block";
});

function novekedesTextarea() {
    var textarea = document.getElementById("valaszTextarea");
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}

// A textarea eseménykezelőjének hozzáadása a tartalom változásához
var textarea = document.getElementById("valaszTextarea");
textarea.addEventListener("input", novekedesTextarea);