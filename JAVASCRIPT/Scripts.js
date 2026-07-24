document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. REAL-TIME PLATFORM STATISTICS & LANDING NAV
    // ==========================================
    const registeredStudentsEl = document.getElementById("registered-students");
    const issueReportedEl = document.getElementById("issue-reported");
    const issuePendingEl = document.getElementById("issue-pending");
    const issueSolvedEl = document.getElementById("issue-solved");

    if (registeredStudentsEl && issueReportedEl && issueSolvedEl) {
        const users = JSON.parse(localStorage.getItem("resolveHubUsers")) || [];
        const issues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
        
        const pendingCount = issues.filter(issue => {
            const status = issue.status ? issue.status.toLowerCase() : "";
            return status === "pending" || status === "in progress";
        }).length;
        
        const solvedCount = issues.filter(issue => issue.status && issue.status.toLowerCase() === "solved").length;

        registeredStudentsEl.textContent = users.length + "+";
        issueReportedEl.textContent = issues.length + "+";
        if (issuePendingEl) issuePendingEl.textContent = pendingCount + "+";
        issueSolvedEl.textContent = solvedCount + "+";
    }

    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            window.location.href = "register.html";
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }

    const joinBtn = document.getElementById("joinBtn");
    const learnMoreBtn = document.getElementById("learnMoreBtn");

    if (joinBtn) {
        joinBtn.addEventListener("click", () => {
            window.location.href = "register.html";
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener("click", () => {
            window.location.href = "#working";
        });
    }

    // ==========================================
    // 2. SHOW/HIDE PASSWORD LOGIC
    // ==========================================
    const togglePasswords = document.querySelectorAll(".toggle-password");

    togglePasswords.forEach(toggle => {
        toggle.addEventListener("click", function () {
            const input = this.previousElementSibling;
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";

            if (isPassword) {
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                `;
            } else {
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                `;
            }
        });
    });

    // ==========================================
    // 3. REGISTRATION LOGIC
    // ==========================================
    const registerForm = document.getElementById("registerForm");
    const departmentSelect = document.getElementById("department");
    const otherContainer = document.getElementById("otherDepartmentContainer");
    const otherInput = document.getElementById("otherDepartmentInput");

    if (departmentSelect && otherContainer && otherInput) {
        departmentSelect.addEventListener("change", function() {
            if (this.value === "Others") {
                otherContainer.style.display = "block";
                otherInput.required = true;
            } else {
                otherContainer.style.display = "none";
                otherInput.required = false;
                otherInput.value = "";
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            
            let department = departmentSelect ? departmentSelect.value : "";
            if (department === "Others" && otherInput) {
                department = otherInput.value.trim();
            }

            const rollno = document.getElementById("rollno").value.trim();
            const password = document.getElementById("regPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match! Please try again.");
                return; 
            }

            let existingUsers = JSON.parse(localStorage.getItem("resolveHubUsers")) || [];

            const userExists = existingUsers.some(user => user.email === email);
            if (userExists) {
                alert("An account with this email already exists! Please log in.");
                return;
            }

            const newUser = {
                name: name,
                email: email,
                department: department,
                rollno: rollno,
                password: password,
                profilePic: "profile.png" 
            };
            
            existingUsers.push(newUser);
            localStorage.setItem("resolveHubUsers", JSON.stringify(existingUsers));

            alert("Registration successful! You can now log in.");
            window.location.href = "login.html"; 
        });
    }

    // ==========================================
    // 4. LOGIN LOGIC (Fancy Welcome Toast)
    // ==========================================
    const loginForm = document.getElementById("loginForm");

    const showWelcomeToast = (userName = "User") => {
        const existingToast = document.querySelector('.welcome-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'welcome-toast';
        toast.innerHTML = `
            <div class="toast-icon">✨</div>
            <div class="toast-text">
                <h4>Welcome Back, ${userName}!</h4>
                <p>Glad to see you again at ResolveHub.</p>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    };

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const loginEmail = document.getElementById("email").value.trim();
            const loginPassword = document.getElementById("password").value;

            if (loginEmail === "admin@resolvehub.com" && loginPassword === "admin123") {
                const adminUser = {
                    name: "Admin User",
                    email: "admin@resolvehub.com",
                    rollno: "Administrator",
                    department: "Campus Management",
                    profilePic: "profile.png"
                };
                localStorage.setItem("resolveHubAdminUser", JSON.stringify(adminUser));
                showWelcomeToast("Admin");
                setTimeout(() => window.location.href = "adminmenu.html", 1200);
                return;
            }

            let existingUsers = JSON.parse(localStorage.getItem("resolveHubUsers")) || [];

            const matchedUser = existingUsers.find(
                user => user.email === loginEmail && user.password === loginPassword
            );

            if (matchedUser) {
                localStorage.setItem("resolveHubStudentUser", JSON.stringify(matchedUser));
                showWelcomeToast(matchedUser.name);
                setTimeout(() => window.location.href = "studentmenu.html", 1200);
            } else {
                alert("Invalid email or password. Please check your details and try again.");
            }
        });
    }
});


// ==========================================
// 5. SECURITY CHECK & UNIVERSAL HEADER INJECTION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const usernameElement = document.getElementById("username");
    const rollnoElement = document.getElementById("rollno");
    const pageUsernameElement = document.getElementById("page-username");
    const pageRollnoElement = document.getElementById("page-rollno");
    const pageDeptElement = document.getElementById("page-department");
    const pageEmailElement = document.getElementById("page-email");

    if (usernameElement && rollnoElement) {
        const isAdminPage = window.location.href.includes("adminmenu.html") || window.location.href.includes("registeredstudents.html");
        const sessionKey = isAdminPage ? "resolveHubAdminUser" : "resolveHubStudentUser";
        const currentUserData = localStorage.getItem(sessionKey);

        if (currentUserData) {
            const currentUser = JSON.parse(currentUserData);

            usernameElement.textContent = currentUser.name || "User";
            rollnoElement.textContent = currentUser.rollno || "N/A";
            if (pageUsernameElement) pageUsernameElement.textContent = currentUser.name;
            if (pageRollnoElement) pageRollnoElement.textContent = currentUser.rollno;
            if (pageDeptElement) pageDeptElement.textContent = currentUser.department || "N/A";
            if (pageEmailElement) pageEmailElement.textContent = currentUser.email || "N/A";

            let finalProfilePic = currentUser.profilePic;
            
            if (currentUser.name) {
                const initial = currentUser.name.charAt(0).toUpperCase();
                const svgAvatar = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#4d7ad9;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#20a8e0;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="150" height="150" fill="url(#grad)" />
                    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Poppins, sans-serif" font-size="70px" font-weight="700">${initial}</text>
                </svg>`;
                
                if (!finalProfilePic || finalProfilePic === "profile.png") {
                    finalProfilePic = `data:image/svg+xml;base64,${btoa(svgAvatar)}`;
                }
            } else if (!finalProfilePic) {
                finalProfilePic = "profile.png";
            }

            const navProfilePics = document.querySelectorAll(".profile-pic img");
            navProfilePics.forEach(img => img.src = finalProfilePic);

            const sidebarProfilePic = document.getElementById("sidebar-profile-pic");
            if (sidebarProfilePic) sidebarProfilePic.src = finalProfilePic;

        } else if (!window.location.href.includes("index.html") && !window.location.href.includes("admin-index.html")) {
            alert("No active session found. Please log in.");
            window.location.href = isAdminPage ? "admin-index.html" : "login.html";
        }
    }
});

// ==========================================
// 6. MENU SWITCHING & LOGOUT LOGIC
// ==========================================
function handleMenuSwitch(selectElement) {
    const selectedValue = selectElement.value;
    
    if (selectedValue === 'logout') {
        if (window.location.href.includes("adminmenu.html") || window.location.href.includes("registeredstudents.html")) {
            localStorage.removeItem("resolveHubAdminUser");
            window.location.href = "admin-index.html"; 
        } else {
            localStorage.removeItem("resolveHubStudentUser");
            window.location.href = "index.html"; 
        }
    } else if (selectedValue) {
        window.location.href = selectedValue;
    }
    
    selectElement.selectedIndex = 0;
}

// ==========================================
// 7. EDIT PROFILE MODAL LOGIC (With Picture Removal & Others Toggle)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const editBtn = document.getElementById("editProfileBtn");
    const modal = document.getElementById("editProfileModal");
    const closeBtn = document.querySelector(".close-btn");
    const editForm = document.getElementById("editProfileForm");
    const editDeptSelect = document.getElementById("editDept");
    const editOtherContainer = document.getElementById("otherDepartmentContainer");
    const editOtherInput = document.getElementById("otherDepartmentInput");

    const standardCourses = ["BCA", "BBA", "BFMO", "BJMC", "B.Com", "ELL", "BMS", "BFA"];

    if (editDeptSelect && editDeptSelect.tagName === "SELECT" && editOtherContainer && editOtherInput) {
        editDeptSelect.addEventListener("change", function() {
            if (this.value === "Others") {
                editOtherContainer.style.display = "block";
                editOtherInput.required = true;
            } else {
                editOtherContainer.style.display = "none";
                editOtherInput.required = false;
                editOtherInput.value = "";
            }
        });
    }

    if (editBtn && modal && editForm) {
        const isAdminPage = window.location.href.includes("adminmenu.html") || window.location.href.includes("registeredstudents.html");
        const sessionKey = isAdminPage ? "resolveHubAdminUser" : "resolveHubStudentUser";

        editBtn.addEventListener("click", () => {
            const currentUser = JSON.parse(localStorage.getItem(sessionKey));
            if (currentUser) {
                document.getElementById("editName").value = currentUser.name || "";
                
                const removePicCheckbox = document.getElementById("removePic");
                if (removePicCheckbox) removePicCheckbox.checked = false;

                const editRoll = document.getElementById("editRoll");
                if (editRoll && editRoll.tagName === "INPUT" && !isAdminPage) {
                    editRoll.value = currentUser.rollno || "";
                }
                
                document.getElementById("editEmail").value = currentUser.email || "";

                if (editDeptSelect && editDeptSelect.tagName === "SELECT") {
                    const userDept = currentUser.department || "";
                    if (standardCourses.includes(userDept)) {
                        editDeptSelect.value = userDept;
                        if (editOtherContainer) editOtherContainer.style.display = "none";
                        if (editOtherInput) {
                            editOtherInput.required = false;
                            editOtherInput.value = "";
                        }
                    } else if (userDept) {
                        editDeptSelect.value = "Others";
                        if (editOtherContainer) editOtherContainer.style.display = "block";
                        if (editOtherInput) {
                            editOtherInput.value = userDept;
                            editOtherInput.required = true;
                        }
                    } else {
                        editDeptSelect.selectedIndex = 0;
                        if (editOtherContainer) editOtherContainer.style.display = "none";
                        if (editOtherInput) {
                            editOtherInput.required = false;
                            editOtherInput.value = "";
                        }
                    }
                }
            }
            modal.style.display = "flex"; 
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const currentUser = JSON.parse(localStorage.getItem(sessionKey));
            let allUsers = JSON.parse(localStorage.getItem("resolveHubUsers")) || [];
            
            const newName = document.getElementById("editName").value.trim();
            const newEmail = document.getElementById("editEmail").value.trim();
            const picInput = document.getElementById("editPic");
            const removePicChecked = document.getElementById("removePic") ? document.getElementById("removePic").checked : false;

            let newDept = currentUser.department;
            if (editDeptSelect && editDeptSelect.tagName === "SELECT") {
                newDept = editDeptSelect.value;
                if (newDept === "Others" && editOtherInput) {
                    newDept = editOtherInput.value.trim();
                }
            }

            if (!isAdminPage) {
                const emailExists = allUsers.some(u => u.email === newEmail && u.email !== currentUser.email);
                if (emailExists) {
                    alert("This email is already in use by another account.");
                    return;
                }
            }

            const saveAndApplyProfile = (picDataUrl) => {
                currentUser.name = newName;
                currentUser.email = newEmail;
                
                if (!isAdminPage) {
                    currentUser.department = newDept;
                    const editRoll = document.getElementById("editRoll");
                    if (editRoll && editRoll.value && editRoll.tagName === "INPUT") {
                        currentUser.rollno = editRoll.value;
                    }
                }
                
                if (removePicChecked) {
                    currentUser.profilePic = "profile.png";
                } else if (picDataUrl) {
                    currentUser.profilePic = picDataUrl;
                }

                localStorage.setItem(sessionKey, JSON.stringify(currentUser));

                if (!isAdminPage) {
                    const userIndex = allUsers.findIndex(u => u.email === currentUser.email);
                    if (userIndex !== -1) {
                        allUsers[userIndex] = currentUser;
                        localStorage.setItem("resolveHubUsers", JSON.stringify(allUsers));
                    }
                }

                modal.style.display = "none";

                const toast = document.createElement("div");
                toast.className = "profile-toast";
                toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Profile changes updated successfully!`;
                document.body.appendChild(toast);

                const usernameElement = document.getElementById("username");
                const rollnoElement = document.getElementById("rollno");
                const pageUsernameElement = document.getElementById("page-username");
                const pageRollnoElement = document.getElementById("page-rollno");
                const pageDeptElement = document.getElementById("page-department");
                const pageEmailElement = document.getElementById("page-email");

                if (usernameElement) usernameElement.textContent = currentUser.name;
                if (rollnoElement) rollnoElement.textContent = currentUser.rollno || "N/A";
                if (pageUsernameElement) pageUsernameElement.textContent = currentUser.name;
                if (pageRollnoElement) pageRollnoElement.textContent = currentUser.rollno;
                if (pageDeptElement) pageDeptElement.textContent = currentUser.department || "N/A";
                if (pageEmailElement) pageEmailElement.textContent = currentUser.email || "N/A";

                let finalProfilePic = currentUser.profilePic;
                if (currentUser.name) {
                    const initial = currentUser.name.charAt(0).toUpperCase();
                    const svgAvatar = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#4d7ad9;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#20a8e0;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <rect width="150" height="150" fill="url(#grad)" />
                        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Poppins, sans-serif" font-size="70px" font-weight="700">${initial}</text>
                    </svg>`;
                    
                    if (!finalProfilePic || finalProfilePic === "profile.png") {
                        finalProfilePic = `data:image/svg+xml;base64,${btoa(svgAvatar)}`;
                    }
                }

                document.querySelectorAll(".profile-pic img").forEach(img => img.src = finalProfilePic);
                const sidebarProfilePic = document.getElementById("sidebar-profile-pic");
                if (sidebarProfilePic) sidebarProfilePic.src = finalProfilePic;

                setTimeout(() => {
                    toast.remove();
                }, 2600);
            };

            if (picInput.files && picInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    saveAndApplyProfile(event.target.result); 
                };
                reader.readAsDataURL(picInput.files[0]);
            } else {
                saveAndApplyProfile(null);
            }
        });
    }
});

// ==========================================
// 8. REPORT ISSUE LOGIC (With Reporter Stamping)[cite: 27, 28]
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const reportForm = document.querySelector(".rpissue");

    if (reportForm) {
        reportForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            const category = document.querySelector(".category-card select.cdd").value;
            const title = document.querySelector(".category-card input[type='textti']").value.trim();
            const description = document.querySelector(".description-card textarea").value.trim();
            const location = document.querySelector(".location-card textarea").value.trim();
            
            const priorityElement = document.querySelector('input[name="priority"]:checked');
            const priority = priorityElement ? priorityElement.value : "Not specified";

            if (!title || !description || !location) {
                alert("Please fill in all the required text fields before submitting.");
                return;
            }

            const currentStudent = JSON.parse(localStorage.getItem("resolveHubStudentUser")) || {};

            const newIssue = {
                id: "ISS-" + Math.floor(1000 + Math.random() * 9000), 
                title: title,
                category: category,
                description: description,
                location: location,
                priority: priority,
                date: new Date().toLocaleDateString(), 
                status: "Pending",
                studentName: currentStudent.name || "Unknown Student",
                studentEmail: currentStudent.email || "N/A",
                studentRoll: currentStudent.rollno || "N/A",
                studentDept: currentStudent.department || "N/A"
            };

            let existingIssues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
            
            existingIssues.push(newIssue);
            localStorage.setItem("resolveHubIssues", JSON.stringify(existingIssues));

            alert("Issue reported successfully!");
            window.location.href = "dashboard.html";
        });
    }
});

// ==========================================
// 9. DASHBOARD LOGIC (Shows All Campus Issues)[cite: 25, 28]
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const issueTable = document.getElementById("issueTable");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");

    if (!document.getElementById("studentDetailModal")) {
        const modalHtml = `
        <div id="studentDetailModal" class="modal">
            <div class="modal-content" style="max-width: 400px; text-align: center;">
                <span class="close-btn" id="closeStudentModal">&times;</span>
                <h2 style="margin-bottom: 20px; color: #1b2d59;">Reporter Details</h2>
                <div style="text-align: left; display: flex; flex-direction: column; gap: 12px; background: #f8fafc; padding: 20px; border-radius: 14px; border: 1px solid #e2e8f0;">
                    <p><strong>Name:</strong> <span id="modalStudentName" style="color: #475569;">-</span></p>
                    <p><strong>Email:</strong> <span id="modalStudentEmail" style="color: #475569;">-</span></p>
                    <p><strong>Roll No:</strong> <span id="modalStudentRoll" style="color: #475569;">-</span></p>
                    <p><strong>Department:</strong> <span id="modalStudentDept" style="color: #475569;">-</span></p>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const studentModal = document.getElementById("studentDetailModal");
    const closeStudentModal = document.getElementById("closeStudentModal");

    if (closeStudentModal) {
        closeStudentModal.addEventListener("click", () => {
            studentModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === studentModal) {
            studentModal.style.display = "none";
        }
    });

    if (issueTable && !document.querySelector(".student-menu-layout") && !document.getElementById("adminIssueTable")) {
        const renderDashboardTable = () => {
            const issues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
            const filterValue = filterSelect ? filterSelect.value.toLowerCase() : "all";

            let totalCount = issues.length;
            let solvedCount = 0;
            let pendingCount = 0;

            issues.forEach(issue => {
                const statusLower = issue.status ? issue.status.toLowerCase() : "";
                if (statusLower === "solved") {
                    solvedCount++;
                } else if (statusLower === "pending" || statusLower === "in progress") {
                    pendingCount++;
                }
            });

            const totalIssuesEl = document.getElementById("totalIssues");
            const solvedIssuesEl = document.getElementById("solvedIssues");
            const pendingIssuesEl = document.getElementById("pendingIssues");

            if (totalIssuesEl) totalIssuesEl.textContent = totalCount;
            if (solvedIssuesEl) solvedIssuesEl.textContent = solvedCount;
            if (pendingIssuesEl) pendingIssuesEl.textContent = pendingCount;

            issueTable.innerHTML = "";

            const filteredIssues = issues.filter(issue => {
                const matchesSearch = 
                    (issue.id && issue.id.toLowerCase().includes(searchTerm)) ||
                    (issue.title && issue.title.toLowerCase().includes(searchTerm)) ||
                    (issue.category && issue.category.toLowerCase().includes(searchTerm)) ||
                    (issue.description && issue.description.toLowerCase().includes(searchTerm)) ||
                    (issue.location && issue.location.toLowerCase().includes(searchTerm));
                    
                const sanitizedStatus = issue.status ? issue.status.toLowerCase() : "";
                const matchesFilter = (filterValue === "all") || (sanitizedStatus === filterValue);

                return matchesSearch && matchesFilter;
            });

            if (filteredIssues.length === 0) {
                issueTable.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 25px; color: #666;">No issues found matching your criteria.</td></tr>`;
                return;
            }

            filteredIssues.forEach(issue => {
                const row = document.createElement("tr");
                
                let statusColor = "#1b2d59";
                const statLower = issue.status ? issue.status.toLowerCase() : "";
                if (statLower === "solved") statusColor = "#28a745";
                else if (statLower === "pending") statusColor = "#fd7e14";
                else if (statLower === "in progress") statusColor = "#007bff";
                else if (statLower === "rejected") statusColor = "#dc3545";

                row.innerHTML = `
                    <td style="font-weight: bold; color: #1b2d59;">${issue.id || 'N/A'}</td>
                    <td>${issue.title || 'N/A'}</td>
                    <td>${issue.category || 'N/A'}</td>
                    <td>${issue.description || 'N/A'}</td>
                    <td>${issue.location || 'N/A'}</td>
                    <td>${issue.date || 'N/A'}</td>
                    <td>${issue.priority || 'N/A'}</td>
                    <td style="font-weight: bold; color: ${statusColor};">${issue.status || 'Pending'}</td>
                    <td>
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <button class="admin-view-student-btn" data-id="${issue.id}" title="View Student Info" style="padding: 6px 10px; border: none; border-radius: 50%; background: #20a8e0; color: white; cursor: pointer; transition: transform 0.2s ease;"><i class="fa-solid fa-eye"></i></button>
                        </div>
                    </td>
                `;
                issueTable.appendChild(row);
            });

            document.querySelectorAll(".admin-view-student-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const issueId = e.currentTarget.getAttribute("data-id");
                    const issues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
                    const foundIssue = issues.find(i => i.id === issueId);

                    if (foundIssue) {
                        document.getElementById("modalStudentName").textContent = foundIssue.studentName || "Not Available";
                        document.getElementById("modalStudentEmail").textContent = foundIssue.studentEmail || "Not Available";
                        document.getElementById("modalStudentRoll").textContent = foundIssue.studentRoll || "Not Available";
                        document.getElementById("modalStudentDept").textContent = foundIssue.studentDept || "Not Available";
                        studentModal.style.display = "flex";
                    }
                });
            });
        };

        if (searchInput) searchInput.addEventListener("input", renderDashboardTable);
        if (filterSelect) filterSelect.addEventListener("change", renderDashboardTable);

        renderDashboardTable();
    }
});


// ==========================================
// 10. STUDENT MENU TABLE & STATS LOGIC (Filtered strictly by Current User)[cite: 24, 28]
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const studentIssueTable = document.getElementById("issueTable");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");

    if (studentIssueTable && document.querySelector(".student-menu-layout")) {
        const renderStudentTable = () => {
            const allIssues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
            const currentStudent = JSON.parse(localStorage.getItem("resolveHubStudentUser")) || {};

            const issues = allIssues.filter(issue => 
                (currentStudent.email && issue.studentEmail === currentStudent.email) ||
                (currentStudent.name && issue.studentName === currentStudent.name)
            );

            const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
            const filterValue = filterSelect ? filterSelect.value.toLowerCase() : "all";

            let totalCount = issues.length;
            let solvedCount = 0;
            let pendingCount = 0;

            issues.forEach(issue => {
                const statusLower = issue.status ? issue.status.toLowerCase() : "";
                if (statusLower === "solved") {
                    solvedCount++;
                } else if (statusLower === "pending" || statusLower === "in progress") {
                    pendingCount++;
                }
            });

            const statTotal = document.getElementById("studentTotalIssues");
            const statSolved = document.getElementById("studentSolvedIssues");
            const statPending = document.getElementById("studentPendingIssues");

            if (statTotal) statTotal.textContent = totalCount;
            if (statSolved) statSolved.textContent = solvedCount;
            if (statPending) statPending.textContent = pendingCount;

            studentIssueTable.innerHTML = "";

            const filteredIssues = issues.filter(issue => {
                const matchesSearch = 
                    (issue.id && issue.id.toLowerCase().includes(searchTerm)) ||
                    (issue.title && issue.title.toLowerCase().includes(searchTerm)) ||
                    (issue.category && issue.category.toLowerCase().includes(searchTerm)) ||
                    (issue.description && issue.description.toLowerCase().includes(searchTerm)) ||
                    (issue.location && issue.location.toLowerCase().includes(searchTerm));
                    
                const sanitizedStatus = issue.status ? issue.status.toLowerCase() : "";
                const matchesFilter = (filterValue === "all") || (sanitizedStatus === filterValue);

                return matchesSearch && matchesFilter;
            });

            if (filteredIssues.length === 0) {
                studentIssueTable.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px; color: #666;">No issues found matching your criteria.</td></tr>`;
                return;
            }

            filteredIssues.forEach(issue => {
                const row = document.createElement("tr");
                
                row.innerHTML = `
                    <td style="font-weight: bold; color: #1b2d59;">${issue.id}</td>
                    <td>${issue.title}</td>
                    <td>${issue.category}</td>
                    <td>${issue.description}</td>
                    <td>${issue.location}</td>
                    <td>${issue.date}</td>
                    <td>${issue.priority}</td>
                    <td style="font-weight: bold; color: ${issue.status === 'Solved' ? 'green' : (issue.status === 'Pending' ? 'orange' : '#1b2d59')};">${issue.status}</td>
                `;
                studentIssueTable.appendChild(row);
            });
        };

        if (searchInput) searchInput.addEventListener("input", renderStudentTable);
        if (filterSelect) filterSelect.addEventListener("change", renderStudentTable);

        renderStudentTable();
    }
});


// ==========================================
// 11. ADMIN PANEL LOGIC, REGISTERED STUDENTS TABLE & ADD/REMOVE STUDENTS[cite: 24, 26, 28]
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const adminIssueTable = document.getElementById("adminIssueTable");
    const adminSearchInput = document.getElementById("adminSearchInput");
    const adminFilterSelect = document.getElementById("adminFilterSelect");

    // Registered Students Elements
    const regStudentsTableBody = document.getElementById("registeredStudentsTableBody");
    const studentSearchInput = document.getElementById("studentSearchInput");
    const studentFilterSelect = document.getElementById("studentFilterSelect");
    const addStudentBtn = document.getElementById("addStudentBtn");
    const addStudentModal = document.getElementById("addStudentModal");
    const closeAddStudentModal = document.getElementById("closeAddStudentModal");
    const addStudentForm = document.getElementById("addStudentForm");

    if (regStudentsTableBody) {
        const renderRegisteredStudentsTable = () => {
            const users = JSON.parse(localStorage.getItem("resolveHubUsers")) || [];
            const searchTerm = studentSearchInput ? studentSearchInput.value.toLowerCase().trim() : "";
            const deptFilter = studentFilterSelect ? studentFilterSelect.value.toLowerCase().trim() : "all";

            regStudentsTableBody.innerHTML = "";

            const filteredUsers = users.filter(user => {
                const matchesSearch = 
                    (user.name && user.name.toLowerCase().includes(searchTerm)) ||
                    (user.email && user.email.toLowerCase().includes(searchTerm)) ||
                    (user.rollno && user.rollno.toLowerCase().includes(searchTerm)) ||
                    (user.department && user.department.toLowerCase().includes(searchTerm));
                
                const userDept = user.department ? user.department.toLowerCase() : "";
                const matchesDept = (deptFilter === "all") || (userDept === deptFilter);

                return matchesSearch && matchesDept;
            });

            if (filteredUsers.length === 0) {
                regStudentsTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 25px; color: #666;">No registered students found matching your criteria.</td></tr>`;
                return;
            }

            filteredUsers.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td style="font-weight: bold; color: #1b2d59;">${user.name || 'N/A'}</td>
                    <td>${user.email || 'N/A'}</td>
                    <td>${user.rollno || 'N/A'}</td>
                    <td>${user.department || 'N/A'}</td>
                    <td>
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <button class="remove-student-btn" data-email="${user.email}" style="padding: 6px 14px; border: none; border-radius: 30px; background: #ff4757; color: white; font-weight: bold; cursor: pointer; font-size: 13px;">Remove</button>
                        </div>
                    </td>
                `;
                regStudentsTableBody.appendChild(row);
            });

            // Bind Remove Button Functionality
            document.querySelectorAll(".remove-student-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const emailToRemove = e.target.getAttribute("data-email");
                    if (confirm(`Are you sure you want to remove the student with email ${emailToRemove}?`)) {
                        let users = JSON.parse(localStorage.getItem("resolveHubUsers")) || [];
                        users = users.filter(u => u.email !== emailToRemove);
                        localStorage.setItem("resolveHubUsers", JSON.stringify(users));
                        renderRegisteredStudentsTable();
                    }
                });
            });
        };

        if (studentSearchInput) studentSearchInput.addEventListener("input", renderRegisteredStudentsTable);
        if (studentFilterSelect) studentFilterSelect.addEventListener("change", renderRegisteredStudentsTable);
        
        renderRegisteredStudentsTable();
    }

    // Modal Controls for Adding Student
    if (addStudentBtn && addStudentModal) {
        addStudentBtn.addEventListener("click", () => {
            addStudentModal.style.display = "flex";
        });
    }

    if (closeAddStudentModal && addStudentModal) {
        closeAddStudentModal.addEventListener("click", () => {
            addStudentModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === addStudentModal) {
            addStudentModal.style.display = "none";
        }
    });

    if (addStudentForm) {
        addStudentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("newStudentName").value.trim();
            const email = document.getElementById("newStudentEmail").value.trim();
            const rollno = document.getElementById("newStudentRoll").value.trim();
            const department = document.getElementById("newStudentDept").value;
            const password = document.getElementById("newStudentPassword").value;

            let users = JSON.parse(localStorage.getItem("resolveHubUsers")) || [];
            if (users.some(u => u.email === email)) {
                alert("A student with this email already exists.");
                return;
            }

            const newStudent = {
                name,
                email,
                rollno,
                department,
                password,
                profilePic: "profile.png"
            };

            users.push(newStudent);
            localStorage.setItem("resolveHubUsers", JSON.stringify(users));

            addStudentModal.style.display = "none";
            addStudentForm.reset();
            alert("Student account successfully added!");
            
            // Re-render table if on registered students page
            if (regStudentsTableBody) {
                // Dispatch input event to refresh table view
                if (studentSearchInput) studentSearchInput.dispatchEvent(new Event('input'));
            }
        });
    }

    // Existing Admin Issue Table Logic[cite: 24, 28]
    if (!document.getElementById("studentDetailModal")) {
        const modalHtml = `
        <div id="studentDetailModal" class="modal">
            <div class="modal-content" style="max-width: 400px; text-align: center;">
                <span class="close-btn" id="closeStudentModal">&times;</span>
                <h2 style="margin-bottom: 20px; color: #1b2d59;">Reporter Details</h2>
                <div style="text-align: left; display: flex; flex-direction: column; gap: 12px; background: #f8fafc; padding: 20px; border-radius: 14px; border: 1px solid #e2e8f0;">
                    <p><strong>Name:</strong> <span id="modalStudentName" style="color: #475569;">-</span></p>
                    <p><strong>Email:</strong> <span id="modalStudentEmail" style="color: #475569;">-</span></p>
                    <p><strong>Roll No:</strong> <span id="modalStudentRoll" style="color: #475569;">-</span></p>
                    <p><strong>Department:</strong> <span id="modalStudentDept" style="color: #475569;">-</span></p>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const studentModal = document.getElementById("studentDetailModal");
    const closeStudentModal = document.getElementById("closeStudentModal");

    if (closeStudentModal) {
        closeStudentModal.addEventListener("click", () => {
            studentModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === studentModal) {
            studentModal.style.display = "none";
        }
    });

    if (adminIssueTable) {
        const renderAdminTable = () => {
            const issues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
            const searchTerm = adminSearchInput ? adminSearchInput.value.toLowerCase().trim() : "";
            const filterValue = adminFilterSelect ? adminFilterSelect.value.toLowerCase().trim() : "all";

            let solvedCount = 0;
            let pendingCount = 0;

            issues.forEach(issue => {
                const statusLower = issue.status ? issue.status.toLowerCase() : "";
                if (statusLower.includes("solved")) {
                    solvedCount++;
                } else if (statusLower.includes("pending") || statusLower.includes("in progress")) {
                    pendingCount++;
                }
            });

            const adminTotal = document.getElementById("adminTotalIssues");
            const adminSolved = document.getElementById("adminSolvedIssues");
            const adminPending = document.getElementById("adminPendingIssues");

            if (adminTotal) adminTotal.textContent = issues.length;
            if (adminSolved) adminSolved.textContent = solvedCount;
            if (adminPending) adminPending.textContent = pendingCount;

            adminIssueTable.innerHTML = "";

            const filteredIssues = issues.filter(issue => {
                const matchesSearch = 
                    (issue.id && issue.id.toLowerCase().includes(searchTerm)) ||
                    (issue.title && issue.title.toLowerCase().includes(searchTerm)) ||
                    (issue.category && issue.category.toLowerCase().includes(searchTerm)) ||
                    (issue.location && issue.location.toLowerCase().includes(searchTerm)) ||
                    (issue.description && issue.description.toLowerCase().includes(searchTerm));
                    
                const sanitizedStatus = issue.status ? issue.status.toLowerCase().replace(/\s+/g, '-') : "pending";
                const normalizedFilter = filterValue.replace(/\s+/g, '-');
                const matchesFilter = (normalizedFilter === "all") || (sanitizedStatus === normalizedFilter);

                return matchesSearch && matchesFilter;
            });

            if (filteredIssues.length === 0) {
                adminIssueTable.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 25px; color: #666;">No issues found matching your criteria.</td></tr>`;
                return;
            }

            filteredIssues.forEach(issue => {
                const row = document.createElement("tr");
                
                let statusColor = "#1b2d59";
                const statLower = issue.status ? issue.status.toLowerCase() : "";
                if (statLower === "solved") statusColor = "#28a745";
                else if (statLower === "pending") statusColor = "#fd7e14";
                else if (statLower === "in progress") statusColor = "#007bff";
                else if (statLower === "rejected") statusColor = "#dc3545";

                row.innerHTML = `
                    <td style="font-weight: bold; color: #1b2d59;">${issue.id || 'N/A'}</td>
                    <td>${issue.title || 'N/A'}</td>
                    <td>${issue.category || 'N/A'}</td>
                    <td>${issue.description || 'N/A'}</td>
                    <td>${issue.location || 'N/A'}</td>
                    <td>${issue.date || 'N/A'}</td>
                    <td>${issue.priority || 'N/A'}</td>
                    <td>
                        <select class="admin-status-dropdown" data-id="${issue.id}" style="padding: 6px 10px; border-radius: 30px; border: 1px solid #d9efff; outline: none; background: #fdfdfd; cursor: pointer; color: ${statusColor}; font-weight: bold;">
                            <option value="Pending" ${issue.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="In Progress" ${issue.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Solved" ${issue.status === 'Solved' ? 'selected' : ''}>Solved</option>
                            <option value="Rejected" ${issue.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        </select>
                    </td>
                    <td>
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <button class="admin-view-student-btn" data-id="${issue.id}" title="View Student Info" style="padding: 6px 10px; border: none; border-radius: 50%; background: #20a8e0; color: white; cursor: pointer; transition: transform 0.2s ease;"><i class="fa-solid fa-eye"></i></button>
                        </div>
                    </td>
                    <td>
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <button class="admin-delete-btn" data-id="${issue.id}" style="padding: 6px 14px; border: none; border-radius: 30px; background: #ff4757; color: white; font-weight: bold; cursor: pointer;">Delete</button>
                        </div>
                    </td>
                `;
                adminIssueTable.appendChild(row);
            });

            document.querySelectorAll(".admin-status-dropdown").forEach(dropdown => {
                dropdown.addEventListener("change", (e) => {
                    const issueId = e.target.getAttribute("data-id");
                    const newStatus = e.target.value;
                    updateIssueStatus(issueId, newStatus);
                });
            });

            document.querySelectorAll(".admin-view-student-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const issueId = e.currentTarget.getAttribute("data-id");
                    const issues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
                    const foundIssue = issues.find(i => i.id === issueId);

                    if (foundIssue) {
                        document.getElementById("modalStudentName").textContent = foundIssue.studentName || "Not Available";
                        document.getElementById("modalStudentEmail").textContent = foundIssue.studentEmail || "Not Available";
                        document.getElementById("modalStudentRoll").textContent = foundIssue.studentRoll || "Not Available";
                        document.getElementById("modalStudentDept").textContent = foundIssue.studentDept || "Not Available";
                        studentModal.style.display = "flex";
                    }
                });
            });

            document.querySelectorAll(".admin-delete-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const issueId = e.target.getAttribute("data-id");
                    deleteIssue(issueId);
                });
            });
        };

        const updateIssueStatus = (id, newStatus) => {
            let issues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
            const issueIndex = issues.findIndex(i => i.id === id);
            if (issueIndex !== -1) {
                issues[issueIndex].status = newStatus;
                localStorage.setItem("resolveHubIssues", JSON.stringify(issues));
                renderAdminTable(); 
            }
        };

        const deleteIssue = (id) => {
            if(confirm(`Are you sure you want to permanently delete issue ${id}?`)) {
                let issues = JSON.parse(localStorage.getItem("resolveHubIssues")) || [];
                issues = issues.filter(i => i.id !== id);
                localStorage.setItem("resolveHubIssues", JSON.stringify(issues));
                renderAdminTable(); 
            }
        };

        if (adminSearchInput) adminSearchInput.addEventListener("input", renderAdminTable);
        if (adminFilterSelect) adminFilterSelect.addEventListener("change", renderAdminTable);

        renderAdminTable();
    }
});