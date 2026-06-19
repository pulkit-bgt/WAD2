/* SHOW PASSWORD */

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



/* SWTICH BETWEEN ADMIN LOGIN AND STUDENT LOGIN */

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


/* STORE ISSUES AT LOCAL STORAGE */

document.getElementById("issueForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const issue = {
        id: Date.now(),
        category: document.getElementById("category").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        location: document.getElementById("location").value,
        priority: document.getElementById("priority").value,
        status: "Pending"
    };

    let issues = JSON.parse(localStorage.getItem("issues")) || [];

    issues.push(issue);

    localStorage.setItem("issues", JSON.stringify(issues));

    alert("Issue Submitted Successfully!");

    document.getElementById("issueForm").reset();
});

