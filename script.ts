
document
  .getElementById("addExperience")
  ?.addEventListener("click", addExperience);
document
  .getElementById("addEducation")
  ?.addEventListener("click", addEducation);
document.getElementById("generateCV")?.addEventListener("click", generateCV);
document.getElementById("editButton")?.addEventListener("click", editCV);
document.getElementById("pdfButton")?.addEventListener("click", downloadCV);
document.getElementById("addSkills")?.addEventListener("click", addSkills);
document
  .getElementById("addLanguages")
  ?.addEventListener("click", addLanguages);

// Function to preview the uploaded image
function previewImage(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files ? fileInput.files[0] : null;
  const resumeImage = document.getElementById(
    "resumeImage"
  ) as HTMLImageElement;

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (e.target?.result) {
        resumeImage.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  } else {
    resumeImage.src = "";
  }
}

// Function to add an experience entry
function addExperience(): void {
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
  document.getElementById("experience-container")?.appendChild(container);
}

// Function to add an education entry
function addEducation(): void {
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
  document.getElementById("education-container")?.appendChild(container);
}

// Function to add a skill entry
function addSkills(): void {
  const container = document.createElement("div");
  container.classList.add("skill-entry");
  container.innerHTML = `
    <input type="text" placeholder="Skill" required class="form-control" />
    <button type="button" onclick="removeEntry(this)">Remove</button>
  `;
  document.getElementById("skills-container")?.appendChild(container);
}

// Function to add a language entry
function addLanguages(): void {
  const container = document.createElement("div");
  container.classList.add("language-entry");
  container.innerHTML = `
    <input type="text" placeholder="Language" required class="form-control" />
    <button type="button" onclick="removeEntry(this)">Remove</button>
  `;
  document.getElementById("languages-container")?.appendChild(container);
}

// Function to remove an entry
function removeEntry(button: HTMLButtonElement): void {
  button.parentElement?.remove();
}

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Phone validation function
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9]+$/; // Checks if it contains only digits
  return phoneRegex.test(phone);
}

// Function to generate the CV
function generateCV(): void {
  // Collect data from the form
  const name =
    (document.getElementById("nameField") as HTMLInputElement).value ||
    "John Doe";
  const objective =
    (document.getElementById("objectiveField") as HTMLInputElement).value ||
    "Objective goes here.";
  const contact = (document.getElementById("contactField") as HTMLInputElement)
    .value;
  const email = (document.getElementById("gmailField") as HTMLInputElement)
    .value;
  const address = (document.getElementById("addressField") as HTMLInputElement)
    .value;
  const birth = (document.getElementById("birthField") as HTMLInputElement)
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
  const skills = Array.from(
    document.querySelectorAll<HTMLInputElement>("#skills-container input")
  )
    .map((input) => input.value)
    .filter((value) => value)
    .join(", ");

  const languages = Array.from(
    document.querySelectorAll<HTMLInputElement>("#languages-container input")
  )
    .map((input) => input.value)
    .filter((value) => value)
    .join(", ");

  // Get experience entries
  const experiences = Array.from(
    document.querySelectorAll<HTMLDivElement>("#experience-container .entry")
  ).map((entry) => {
    const jobTitle = (entry.children[0] as HTMLInputElement).value;
    const companyName = (entry.children[1] as HTMLInputElement).value;
    const startDate = (entry.children[2] as HTMLInputElement).value;
    const endDate = (entry.children[3] as HTMLInputElement).value;
    const location = (entry.children[4] as HTMLInputElement).value;

    return {
      jobTitle,
      companyName,
      startDate,
      endDate,
      location,
    };
  });

  // Get education entries
  const educations = Array.from(
    document.querySelectorAll<HTMLDivElement>("#education-container .entry")
  ).map((entry) => {
    const degree = (entry.children[0] as HTMLInputElement).value;
    const institution = (entry.children[1] as HTMLInputElement).value;
    const startDate = (entry.children[2] as HTMLInputElement).value;
    const endDate = (entry.children[3] as HTMLInputElement).value;
    const location = (entry.children[4] as HTMLInputElement).value;

    return {
      degree,
      institution,
      startDate,
      endDate,
      location,
    };
  });

  // Update the generated CV with data
  document.getElementById("resumeName")!.textContent = name;
  document.getElementById("resumeObjective")!.textContent = objective;
  document.getElementById("resumeContact")!.textContent = contact;
  document.getElementById("resumeEmail")!.textContent = email;
  document.getElementById("resumeAddress")!.textContent = address;
  document.getElementById("resumeBirth")!.textContent = birth;
  document.getElementById("resumeSkills")!.textContent = skills;
  document.getElementById("resumeLanguages")!.textContent = languages;

  // Populate experiences in the CV
  document.getElementById("resumeExperience")!.innerHTML = experiences
    .map(
      (exp) =>
        `<p>${exp.jobTitle} at ${exp.companyName} (${exp.startDate} - ${exp.endDate}), ${exp.location}</p>`
    )
    .join("");

  // Populate education in the CV
  document.getElementById("resumeEducation")!.innerHTML = educations
    .map(
      (edu) =>
        `<p>${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate}), ${edu.location}</p>`
    )
    .join("");

  // Show the generated CV and hide the form
  document.getElementById("generatedResume")!.style.display = "block";
  document.getElementById("inputForm")!.style.display = "none";
}

// Function to edit CV
function editCV(): void {
  document.getElementById("generatedResume")!.style.display = "none";
  document.getElementById("inputForm")!.style.display = "block";
}

// Print CV Function
function printCV(): void {
  window.print();
}

// Download CV as PDF Function
function downloadCV(): void {
  // Implement PDF download logic here
}
