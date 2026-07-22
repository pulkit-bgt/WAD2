// Utility Functions

// This function saves data into browser localStorage
function saveData(key, data) 
{
  localStorage.setItem(key, JSON.stringify(data));
}

// This function gets data from browser localStorage
function getData(key) 
{
  return JSON.parse(localStorage.getItem(key));
}

// This function checks whether a user is logged in
function isLoggedIn()
 {
  return localStorage.getItem("loggedInUser") !== null;
}

function registerUser()
 {
  // Get input values from the signup form
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  // Basic validation
  if (name === "" || email === "" || password === "") 
{
    alert("Please fill all registration fields.");
    return;
  }

  // Get old users from localStorage
  let users = getData("users") || [];

  // Check if email already exists
  const existingUser = users.find(function(user) 
{
    return user.email === email;
  });

  if (existingUser) 
{
    alert("This email is already registered.");
    return;
  }

  // Create a new user object
  const newUser = 
{
    name: name,
    email: email,
    password: password
  };

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

function loginUser() 
{
  const emailInput =
    document.getElementById("email") ||
    document.getElementById("loginEmail");

  const passwordInput =
    document.getElementById("password") ||
    document.getElementById("loginPassword");

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (email === "" || password === "") 
{
    alert("Please enter email and password.");
    return;
  }

  const users = getData("users") || [];

  const validUser = users.find(function (user) 
{
    return user.email.toLowerCase() === email && user.password === password;
  });

  if (validUser) 
{
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    window.location.href = "login-success.html";
  } 
else 
{
    alert("Invalid email or password.");
  }
}
  // Get registered users
  let users = getData("users") || [];

  // Check if user exists
  const validUser = users.find(function(user) 
{
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

function logoutUser() 
{
  // Remove logged-in user from localStorage
  localStorage.removeItem("loggedInUser");

  alert("You have been logged out.");

  // Redirect to login page
  window.location.href = "login.html";
}

// Display Logged-In User Name

function displayUserName() 
{
  const user = getData("loggedInUser");
  const studentName = document.getElementById("studentName");

  if (user && studentName)
 {
    studentName.innerText = user.name;
  }
}

// Events Section

function displayEvents()
 {
  const eventBox = document.getElementById("eventList");

  if (!eventBox)
 {
    return;
  }

  const events = getData("events") || [];

  eventBox.innerHTML = "";

  events.forEach(function(event) 
{
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

function submitFeedback() 
{
  const name = document.getElementById("feedbackName").value;
  const category = document.getElementById("feedbackCategory").value;
  const message = document.getElementById("feedbackMessage").value;

  if (name === "" || category === "" || message === "") 
{
    alert("Please fill all feedback fields.");
    return;
  }

  let feedbackList = getData("feedbackList") || [];

  const feedback = 
{
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

function displayFeedback()
 {
  const feedbackBox = document.getElementById("feedbackList");

  if (!feedbackBox) 
{
    return;
  }

  let feedbackList = getData("feedbackList") || [];

  feedbackBox.innerHTML = "";

  feedbackList.forEach(function(feedback) 
{
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

function addLostFoundItem()
 {
  const itemName = document.getElementById("itemName").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const contact = document.getElementById("contactInfo").value;

  if (itemName === "" || itemDescription === "" || contact === "") 
{
    alert("Please fill all lost and found fields.");
    return;
  }

  let lostFoundItems = getData("lostFoundItems") || [];

  const item = 
{
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

function displayLostFoundItems() 
{
  const itemBox = document.getElementById("lostFoundList");

  if (!itemBox) 
{
    return;
  }

  let lostFoundItems = getData("lostFoundItems") || [];

  itemBox.innerHTML = "";

  lostFoundItems.forEach(function(item)
 {
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

document.addEventListener("DOMContentLoaded", function() 
{
  // Display logged-in student name if available
  displayUserName();

  // Display announcements only if this function exists in another script
  if (typeof displayAnnouncements === "function") 
{
    displayAnnouncements();
  }

  // Display events
  displayEvents();

  // Display feedback
  displayFeedback();

  // Display lost and found items
  displayLostFoundItems();
});

/* SHOW PASSWORD */

function togglePassword() 
{
  const password =
    document.getElementById("password") ||
    document.getElementById("loginPassword") ||
    document.getElementById("registerPassword");

  if (!password) 
{
    return;
  }

  password.style.opacity = "0.5";

  setTimeout(() => 
{
    if (password.type === "password") 
{
      password.type = "text";
    } else 
{
      password.type = "password";
    }

    password.style.opacity = "1";
  }, 150);
}

/* SWITCH BETWEEN ADMIN LOGIN AND STUDENT LOGIN */

function showLogin(type) {
  const tabs = document.querySelectorAll(".tab");
  const studentForm = document.getElementById("studentForm");
  const adminForm = document.getElementById("adminForm");

  if (!studentForm || !adminForm || tabs.length < 2) {
    return;
  }

  tabs.forEach(tab => tab.classList.remove("active"));

  if (type === "student") 
{
    tabs[0].classList.add("active");

    studentForm.style.display = "block";
    adminForm.style.display = "none";
  } else 
{
    tabs[1].classList.add("active");

    studentForm.style.display = "none";
    adminForm.style.display = "block";
  }
}

/* STORE ISSUES AT LOCAL STORAGE */

document.addEventListener("DOMContentLoaded", () => 
{
  const form = document.querySelector(".rpissue");

  if (!form) 
{
    return;
  }

  form.addEventListener("submit", function(e) 
{
    e.preventDefault();

    // Get values from form
    const category = document.querySelector(".cdd").value;
    const title = document.querySelector(".category-card input[type='text']").value;
    const description = document.querySelector(".description-card textarea").value;
    const location = document.querySelector(".location-card textarea").value;

    // Get selected priority
    const priority =
      document.querySelector("input[name='priority']:checked")?.value || "Not Set";

    // Create issue object
    const issue = 
{
      id: Date.now(),
      category,
      title,
      description,
      location,
      priority,
      date: new Date().toLocaleString(),
      status: "pending"
    };

    // Get existing issues from localStorage
    let issues = JSON.parse(localStorage.getItem("issues")) || [];

    // Add new issue
    issues.push(issue);

    // Save back to localStorage
    localStorage.setItem("issues", JSON.stringify(issues));

    // Show popup message
    alert("Issue submitted successfully");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  });
});

// Display all issues

document.addEventListener("DOMContentLoaded", function() 
{
  const tableBody = document.getElementById("issueTable");
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");

  const totalIssuesBox = document.getElementById("totalIssues");
  const solvedIssuesBox = document.getElementById("solvedIssues");

  if (!tableBody || !searchInput || !filterSelect || !totalIssuesBox || !solvedIssuesBox) 
{
    return;
  }

  let issues = JSON.parse(localStorage.getItem("issues")) || [];

  function updateStats(data) 
{
    totalIssuesBox.textContent = data.length;

    solvedIssuesBox.textContent = data.filter(issue =>
      (issue.status || "").toLowerCase() === "solved"
    ).length;
  }

  function renderIssues() 
{
    const searchText = searchInput.value.toLowerCase().trim();
    const filterValue = filterSelect.value.toLowerCase();

    let filtered = issues.filter(issue => 
{
      const idMatch = issue.id.toString().includes(searchText);
      const titleMatch = issue.title.toLowerCase().includes(searchText);
      const categoryMatch = issue.category.toLowerCase().includes(searchText);
      const searchMatch = idMatch || titleMatch || categoryMatch;
      const status = (issue.status || "").toLowerCase().trim();
      const filterMatch =
        filterValue === "all" || status === filterValue;

      return searchMatch && filterMatch;
    });

    tableBody.innerHTML = "";

    if (filtered.length === 0) 
{
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;">
            No issues found
          </td>
        </tr>
      `;
      updateStats(filtered);
      return;
    }

    filtered.forEach(issue => 
{
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${issue.id}</td>
        <td>${issue.title}</td>
        <td>${issue.category}</td>
        <td>${issue.description}</td>
        <td>${issue.date}</td>
        <td>${issue.priority}</td>
        <td>
          <span class="status ${issue.status || "pending"}">
            ${issue.status || "pending"}
          </span>
        </td>
      `;

      tableBody.appendChild(row);
    });

    updateStats(filtered);
  }

  // Events
  searchInput.addEventListener("input", renderIssues);
  filterSelect.addEventListener("change", renderIssues);

  // Initial load
  renderIssues();
});

/* ADMIN PANEL */

document.addEventListener("DOMContentLoaded", function() 
{
  const tableBody = document.getElementById("adminIssueTable");

  const totalIssues = document.getElementById("totalIssues");
  const solvedIssues = document.getElementById("solvedIssues");

  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");

  if (!tableBody || !totalIssues || !solvedIssues || !searchInput || !filterSelect) 
{
    return;
  }

  let issues = JSON.parse(localStorage.getItem("issues")) || [];

  function saveIssues() 
{
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  function updateStats() 
{
    totalIssues.textContent = issues.length;

    solvedIssues.textContent = issues.filter(issue =>
      issue.status === "solved"
    ).length;
  }

  function renderIssues() 
{
    tableBody.innerHTML = "";

    let filteredIssues = issues.filter(issue => 
{
      const searchText = searchInput.value.toLowerCase().trim();

      const searchMatch =
        issue.id.toString().includes(searchText) ||
        issue.title.toLowerCase().includes(searchText) ||
        issue.category.toLowerCase().includes(searchText);

      const filterMatch =
        filterSelect.value === "all" ||
        issue.status === filterSelect.value;

      return searchMatch && filterMatch;
    });

    if (filteredIssues.length === 0) 
{
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center;">
            No issues found
          </td>
        </tr>
      `;

      updateStats();
      return;
    }

    filteredIssues.forEach(issue =>
{
      const originalIndex = issues.findIndex(i => i.id === issue.id);
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${issue.id}</td>
        <td>${issue.title}</td>
        <td>${issue.category}</td>
        <td>${issue.description}</td>
        <td>${issue.date}</td>
        <td>${issue.priority}</td>

        <td>
          <select class="statusSelect" data-index="${originalIndex}">
            <option value="pending" ${issue.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="approved" ${issue.status === "approved" ? "selected" : ""}>Approved</option>
            <option value="in-progress" ${issue.status === "in-progress" ? "selected" : ""}>In Progress</option>
            <option value="solved" ${issue.status === "solved" ? "selected" : ""}>Solved</option>
          </select>
        </td>

        <td>
          <button class="deleteBtn" data-index="${originalIndex}">
            Delete
          </button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    updateStats();
  }

  tableBody.addEventListener("change", function(e) 
{
    if (e.target.classList.contains("statusSelect")) 
{
      const index = e.target.dataset.index;

      issues[index].status = e.target.value;

      saveIssues();

      renderIssues();
    }
  });

  tableBody.addEventListener("click", function(e) 
{
    if (e.target.classList.contains("deleteBtn")) 
{
      const index = e.target.dataset.index;

      if (confirm("Delete this issue?")) 
{
        issues.splice(index, 1);

        saveIssues();

        renderIssues();
      }
    }
  });

  searchInput.addEventListener("input", renderIssues);

  filterSelect.addEventListener("change", renderIssues);

  renderIssues();
});

/* BUTTONS */

document.addEventListener("DOMContentLoaded", function() 
{
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const reportissueBtn = document.getElementById("reportissueBtn");
  const viewdashboardBtn = document.getElementById("viewdashboardBtn");

  if (registerBtn) 
{
    registerBtn.addEventListener("click", function() 
{
      window.location.href = "register.html";
    });
  }

  if (loginBtn) 
{
    loginBtn.addEventListener("click", function() 
{
      window.location.href = "login.html";
    });
  }

  if (reportissueBtn) 
{
    reportissueBtn.addEventListener("click", function() 
{
      window.location.href = "reportissue.html";
    });
  }

  if (viewdashboardBtn) 
{
    viewdashboardBtn.addEventListener("click", function() 
{
      window.location.href = "dashboard.html";
    });
  }
});
document.addEventListener("DOMContentLoaded", function () 
{
  const loginForm = document.getElementById("loginForm");
  const showPassword = document.getElementById("showPassword");

  if (loginForm) 
{
    loginForm.addEventListener("submit", function (event) 
{
      event.preventDefault();
      loginUser();
    });
  }

  if (showPassword) 
{
    showPassword.addEventListener("change", togglePassword);
  }
});
