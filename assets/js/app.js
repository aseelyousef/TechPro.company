let uname = document.forms['form']['name'];
let email = document.forms['form']['email'];
let password = document.forms['form']['password'];

let email_error = document.getElementById('email_error');
let pass_error = document.getElementById('pass_error');


email.addEventListener('textInput', email_Verify);
password.addEventListener('passwordInput', pass_Verify);

function validated() {
    if (email.value.length < 9) {
        email.style.border = "1px solid red";
        email_error.style.display = "block"
        email.focus();
        return false;

    }
    if (password.value.length < 6) {
        password.style.border = "1px solid red";
        pass_error.style.display = "block";

        password.focus();
        return false;
    }

}

function email_Verify() {
    if (email.value.length >= 8) {
        email.style.border = "1px solid green";
        email_error.style.display = "none";
        check.style.display = "block";
        return true;
    }
}
function pass_Verify() {
    if (password.value.length >= 5) {
        password.style.border = "1px solid green";
        pass_error.style.display = "none";
        checks.style.display = "block";
        return true;
    }
}

   // end validate 

