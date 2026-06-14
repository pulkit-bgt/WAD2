

document.querySelector(".login-btn").addEventListener("click", () => {
    alert("Redirecting to Login Page..

        

document.querySelector(".login-btn").addEventListener("click", () => {
    alert("Redirecting to Login Page..

function togglePassword(){

    let password =
    document.getElementById("password");

    password.style.opacity="0.5";

    setTimeout(() => {

        if(password.type==="password"){
            password.type="text";
        }
        else{
            password.type="password";
        }

        password.style.opacity="1";

    },150);
}
