/*---------------------------------------------------------------- */
// Form Validation
function isNameValid() {
    let val = document.getElementById("txtName").value;
    if (!val) return false;
    var nameRegx = /\d/;
    return !nameRegx.test(val);
}

function isEmailValid() {
    let val = document.getElementById("txtEmail").value;

    var emailRegx =
        /^[a-zA-Z]+(\.*[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    return emailRegx.test(val);
}

function isPhoneValid() {
    let val = document.getElementById("txtPhone").value;
    console.log(val);

    var phoneRegx = /^01[0-2,5]\d{8}$/;
    return phoneRegx.test(val);
}

document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();
    var isDataValid = true;
    if (!isNameValid()) {
        document.getElementById("nameValidation").classList.remove("d-none");
        isDataValid = false;
    } else {
        document.getElementById("nameValidation").classList.add("d-none");
        isDataValid = true;
    }

    if (!isEmailValid()) {
        document.getElementById("emailValidation").classList.remove("d-none");
        isDataValid = false;
    } else {
        document.getElementById("emailValidation").classList.add("d-none");
        isDataValid = true;
    }
    console.log(isPhoneValid());
    if (!isPhoneValid()) {
        document.getElementById("phoneValidation").classList.remove("d-none");
        isDataValid = false;
    } else {
        document.getElementById("phoneValidation").classList.add("d-none");
        isDataValid = true;
    }
};
