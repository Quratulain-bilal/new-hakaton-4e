"use strict";
var _a, _b, _c, _d, _e, _f, _g;
const experience = [
    {
        title: "Software Engineer",
        company: "Company XYZ",
        dates: "(2021 - Present)",
    },
];
const education = [
    {
        degree: "Computer Science",
        institution: "University ABC",
        dates: "(2017 - 2021)",
    },
];
// Event Listeners
(_a = document
    .getElementById("addExperience")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addExperience);
(_b = document
    .getElementById("addEducation")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addEducation);
(_c = document.getElementById("generateCV")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", generateCV);
(_d = document.getElementById("editButton")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", editCV);
(_e = document.getElementById("pdfButton")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", downloadCV);
(_f = document.getElementById("addSkills")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", addSkills);
(_g = document
    .getElementById("addLanguages")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", addLanguages);
// Function to preview the uploaded image
function previewImage(event) {
    const fileInput = event.target;
    const file = fileInput.files ? fileInput.files[0] : null;
    const resumeImage = document.getElementById("resumeImage");
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                resumeImage.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
    else {
        resumeImage.src = "";
    }
}
// Function to add an experience entry
function addExperience() {
    var _a;
    const container = document.createElement("div");
    container.classList.add("entry");
    container.innerHTML = `
    <input type="text" placeholder="Job Title" required class="form-control" />
    <input type="text" placeholder="Company Name" required class="form-control" />
    <input type="date" required class="form-control" />
    <input type="date" required class="form-control" />
    <input type="text" placeholder="Location" required class="form-control" />
    <button type="button" onclick="removeEntry(this)">Remove</button>
  `;
    (_a = document.getElementById("experience-container")) === null || _a === void 0 ? void 0 : _a.appendChild(container);
}
// Function to add an education entry
function addEducation() {
    var _a;
    const container = document.createElement("div");
    container.classList.add("entry");
    container.innerHTML = `
    <input type="text" placeholder="Degree/Field of Study" required class="form-control" />
    <input type="text" placeholder="Institution Name" required class="form-control" />
    <input type="date" required class="form-control" />
    <input type="date" required class="form-control" />
    <input type="text" placeholder="Location" required class="form-control" />
    <button type="button" onclick="removeEntry(this)">Remove</button>
  `;
    (_a = document.getElementById("education-container")) === null || _a === void 0 ? void 0 : _a.appendChild(container);
}
// Function to add a skill entry
function addSkills() {
    var _a;
    const container = document.createElement("div");
    container.classList.add("skill-entry");
    container.innerHTML = `
    <input type="text" placeholder="Skill" required class="form-control" />
    <button type="button" onclick="removeEntry(this)">Remove</button>
  `;
    (_a = document.getElementById("skills-container")) === null || _a === void 0 ? void 0 : _a.appendChild(container);
}
// Function to add a language entry
function addLanguages() {
    var _a;
    const container = document.createElement("div");
    container.classList.add("language-entry");
    container.innerHTML = `
    <input type="text" placeholder="Language" required class="form-control" />
    <button type="button" onclick="removeEntry(this)">Remove</button>
  `;
    (_a = document.getElementById("languages-container")) === null || _a === void 0 ? void 0 : _a.appendChild(container);
}
// Function to remove an entry
function removeEntry(button) {
    var _a;
    (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
}
// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Phone validation function
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]+$/; // Checks if it contains only digits
    return phoneRegex.test(phone);
}
// Function to generate the CV
function generateCV() {
    // Collect data from the form
    const name = document.getElementById("nameField").value ||
        "John Doe";
    const objective = document.getElementById("objectiveField").value ||
        "Objective goes here.";
    const contact = document.getElementById("contactField")
        .value;
    const email = document.getElementById("gmailField")
        .value;
    const address = document.getElementById("addressField")
        .value;
    const birth = document.getElementById("birthField")
        .value;
    // Validate all fields before generating CV
    if (!name || !objective || !contact || !email || !address || !birth) {
        alert("Please fill in all fields.");
        return;
    }
    // Validate email and phone
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!isValidPhone(contact)) {
        alert("Please enter a valid phone number .");
        return;
    }
    // Get skills and languages entries
    const skills = Array.from(document.querySelectorAll("#skills-container input"))
        .map((input) => input.value)
        .filter((value) => value)
        .join(", ");
    const languages = Array.from(document.querySelectorAll("#languages-container input"))
        .map((input) => input.value)
        .filter((value) => value)
        .join(", ");
    // Get experience entries
    const experiences = Array.from(document.querySelectorAll("#experience-container .entry")).map((entry) => {
        const jobTitle = entry.children[0].value;
        const companyName = entry.children[1].value;
        const startDate = entry.children[2].value;
        const endDate = entry.children[3].value;
        const location = entry.children[4].value;
        return {
            jobTitle,
            companyName,
            startDate,
            endDate,
            location,
        };
    });
    // Get education entries
    const educations = Array.from(document.querySelectorAll("#education-container .entry")).map((entry) => {
        const degree = entry.children[0].value;
        const institution = entry.children[1].value;
        const startDate = entry.children[2].value;
        const endDate = entry.children[3].value;
        const location = entry.children[4].value;
        return {
            degree,
            institution,
            startDate,
            endDate,
            location,
        };
    });
    // Update the generated CV with data
    document.getElementById("resumeName").textContent = name;
    document.getElementById("resumeObjective").textContent = objective;
    document.getElementById("resumeContact").textContent = contact;
    document.getElementById("resumeEmail").textContent = email;
    document.getElementById("resumeAddress").textContent = address;
    document.getElementById("resumeBirth").textContent = birth;
    document.getElementById("resumeSkills").textContent = skills;
    document.getElementById("resumeLanguages").textContent = languages;
    // Populate experiences in the CV
    document.getElementById("resumeExperience").innerHTML = experiences
        .map((exp) => `<p>${exp.jobTitle} at ${exp.companyName} (${exp.startDate} - ${exp.endDate}), ${exp.location}</p>`)
        .join("");
    // Populate education in the CV
    document.getElementById("resumeEducation").innerHTML = educations
        .map((edu) => `<p>${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate}), ${edu.location}</p>`)
        .join("");
    // Show the generated CV and hide the form
    document.getElementById("generatedResume").style.display = "block";
    document.getElementById("inputForm").style.display = "none";
}
// Function to edit CV
function editCV() {
    document.getElementById("generatedResume").style.display = "none";
    document.getElementById("inputForm").style.display = "block";
}
// Print CV Function
function printCV() {
    window.print();
}
// Download CV as PDF Function
function downloadCV() {
    // Implement PDF download logic here
}
