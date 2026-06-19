<<<<<<< HEAD
/* SHOW PASSWORD */
=======
// Resolve Hub Java Script
// Default Resolve Hub Data
>>>>>>> 5b852a4e0fd68f3c7dc7646f38d78d24df5022e1


// Sample announcements shown on the home page
let announcements = [
  {
    title: "Library Timings Extended",
    message: "The college library will remain open until 8:00 PM from Monday.",
    date: "2026-06-19"
  },
  {
    title: "Internal Exam Notice",
    message: "Internal exams will begin from next week. Check the timetable on the notice board.",
    date: "2026-06-20"
  }
];

// Sample events
let events = [
  {
    name: "Tech Fest 2026",
    description: "A college-level technical event with coding, quiz, and project exhibition.",
    date: "2026-06-25",
    venue: "Main Auditorium"
  },
  {
    name: "Sports Day",
    description: "Annual sports day with indoor and outdoor games.",
    date: "2026-06-28",
    venue: "College Ground"
  }
];


// Utility Functions


// This function saves data into browser localStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// This function gets data from browser localStorage
function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

// This function checks whether a user is logged in
function isLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}


<<<<<<< HEAD

/* SWTICH BETWEEN ADMIN LOGIN AND STUDENT LOGIN */

function showLogin(type) {
=======
// Register / Signup Function
>>>>>>> 5b852a4e0fd68f3c7dc7646f38d78d24df5022e1


function registerUser() {
  // Get input values from the signup form
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  // Basic validation
  if (name === "" || email === "" || password === "") {
    alert("Please fill all registration fields.");
    return;
  }

  // Get old users from localStorage
  let users = getData("users") || [];

  // Check if email already exists
  const existingUser = users.find(function(user) {
    return user.email === email;
  });

  if (existingUser) {
    alert("This email is already registered.");
    return;
  }

  // Create a new user object
  const newUser = {
    name: name,
    email: email,
    password: password
  };

<<<<<<< HEAD
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

=======
  // Add new user to users array
  users.push(newUser);

  // Save users array in localStorage
  saveData("users", users);

  alert("Registration successful. Please login now.");

  // Clear form fields
  document.getElementById("registerName").value = "";
  document.getElementById("registerEmail").value = "";
  document.getElementById("registerPassword").value = "";
}


// Login Function


function loginUser() {
  // Get input values from login form
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Basic validation
  if (email === "" || password === "") {
    alert("Please enter email and password.");
    return;
  }

  // Get registered users
  let users = getData("users") || [];

  // Check if user exists
  const validUser = users.find(function(user) {
    return user.email === email && user.password === password;
  });

  if (validUser) {
    // Save logged-in user details
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));

    alert("Login successful. Welcome " + validUser.name + "!");

    // Redirect to home page
    window.location.href = "home.html";
  } else {
    alert("Invalid email or password.");
  }
}


// Logout Function


function logoutUser() {
  // Remove logged-in user from localStorage
  localStorage.removeItem("loggedInUser");

  alert("You have been logged out.");

  // Redirect to login page
  window.location.href = "login.html";
}


// Display Logged-In User Name


function displayUserName() {
  const user = getData("loggedInUser");

  if (user && document.getElementById("studentName")) {
    document.getElementById("studentName").innerText = user.name;
  }
}


// Announcement Section


function displayAnnouncements() {
  const announcementBox = document.getElementById("announcementList");

  // Stop function if announcementList element is not found
  if (!announcementBox) {
    return;
  }

  announcementBox.innerHTML = "";

  announcements.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "announcement-card";

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.message}</p>
      <small>Date: ${item.date}</small>
    `;

    announcementBox.appendChild(card);
  });
}

function addAnnouncement() {
  const title = document.getElementById("announcementTitle").value;
  const message = document.getElementById("announcementMessage").value;
  const date = document.getElementById("announcementDate").value;

  if (title === "" || message === "" || date === "") {
    alert("Please fill all announcement fields.");
    return;
  }

  const newAnnouncement = {
    title: title,
    message: message,
    date: date
  };

  announcements.push(newAnnouncement);

  alert("Announcement added successfully.");

  displayAnnouncements();
}


// Events Section


function displayEvents() {
  const eventBox = document.getElementById("eventList");

  if (!eventBox) {
    return;
  }

  eventBox.innerHTML = "";

  events.forEach(function(event) {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>${event.description}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Venue:</strong> ${event.venue}</p>
    `;

    eventBox.appendChild(card);
  });
}


// Feedback Form Section


function submitFeedback() {
  const name = document.getElementById("feedbackName").value;
  const category = document.getElementById("feedbackCategory").value;
  const message = document.getElementById("feedbackMessage").value;

  if (name === "" || category === "" || message === "") {
    alert("Please fill all feedback fields.");
    return;
  }

  let feedbackList = getData("feedbackList") || [];

  const feedback = {
    name: name,
    category: category,
    message: message,
    date: new Date().toLocaleDateString()
  };

  feedbackList.push(feedback);

  saveData("feedbackList", feedbackList);

  alert("Thank you for your feedback.");

  document.getElementById("feedbackName").value = "";
  document.getElementById("feedbackCategory").value = "";
  document.getElementById("feedbackMessage").value = "";

  displayFeedback();
}

function displayFeedback() {
  const feedbackBox = document.getElementById("feedbackList");

  if (!feedbackBox) {
    return;
  }

  let feedbackList = getData("feedbackList") || [];

  feedbackBox.innerHTML = "";

  feedbackList.forEach(function(feedback) {
    const card = document.createElement("div");
    card.className = "feedback-card";

    card.innerHTML = `
      <h3>${feedback.category}</h3>
      <p>${feedback.message}</p>
      <small>By ${feedback.name} on ${feedback.date}</small>
    `;

    feedbackBox.appendChild(card);
  });
}


// Lost and Found Section


function addLostFoundItem() {
  const itemName = document.getElementById("itemName").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const contact = document.getElementById("contactInfo").value;

  if (itemName === "" || itemDescription === "" || contact === "") {
    alert("Please fill all lost and found fields.");
    return;
  }

  let lostFoundItems = getData("lostFoundItems") || [];

  const item = {
    itemName: itemName,
    itemDescription: itemDescription,
    contact: contact,
    date: new Date().toLocaleDateString()
  };

  lostFoundItems.push(item);

  saveData("lostFoundItems", lostFoundItems);

  alert("Item added to Lost and Found section.");

  document.getElementById("itemName").value = "";
  document.getElementById("itemDescription").value = "";
  document.getElementById("contactInfo").value = "";

  displayLostFoundItems();
}

function displayLostFoundItems() {
  const itemBox = document.getElementById("lostFoundList");

  if (!itemBox) {
    return;
  }

  let lostFoundItems = getData("lostFoundItems") || [];

  itemBox.innerHTML = "";

  lostFoundItems.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "lost-found-card";

    card.innerHTML = `
      <h3>${item.itemName}</h3>
      <p>${item.itemDescription}</p>
      <p><strong>Contact:</strong> ${item.contact}</p>
      <small>Posted on ${item.date}</small>
    `;

    itemBox.appendChild(card);
  });
}


// Page Load Function


document.addEventListener("DOMContentLoaded", function() {
  // Display logged-in student name if available
  displayUserName();

  // Display announcements
  displayAnnouncements();

  // Display events
  displayEvents();

  // Display feedback
  displayFeedback();

  // Display lost and found items
  displayLostFoundItems();
});
>>>>>>> 5b852a4e0fd68f3c7dc7646f38d78d24df5022e1
