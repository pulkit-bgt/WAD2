
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


function showLogin(type) {

    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => tab.classList.remove("active"));

    if(type === "student") {

        tabs[0].classList.add("active");

        document.getElementById("studentForm").style.display = "block";
        document.getElementById("adminForm").style.display = "none";

    } else {

        tabs[1].classList.add("active");

        document.getElementById("studentForm").style.display = "none";
        document.getElementById("adminForm").style.display = "block";
    }
}