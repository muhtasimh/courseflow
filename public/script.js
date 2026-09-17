const addCourseButton = document.getElementById("add-course-btn");
const courseForm = document.getElementById("course-form");
const saveCourseButton = document.getElementById("save-course-btn");
const courseCodeInput = document.getElementById("course-code");
const courseNameInput = document.getElementById("course-name");
const courseCreditsInput = document.getElementById("course-credits");
const courseStatusInput = document.getElementById("course-status");
const courseList = document.getElementById("course-list");
const courseSearchInput = document.getElementById("course-search");

const totalCourses = document.getElementById("total-courses");
const totalCredits = document.getElementById("total-credits");
const completedCredits = document.getElementById("completed-credits");

function updateSummary(courses) {
    const credits = courses.reduce(
        (total, course) => total + (course.credits ?? 3),
        0
    );

    const completed = courses
        .filter(course => course.status === "Completed")
        .reduce(
            (total, course) => total + (course.credits ?? 3),
            0
        );

    totalCourses.textContent = `${courses.length} courses`;
    totalCredits.textContent = `${credits} credits`;
    completedCredits.textContent = `${completed} completed`;
}

addCourseButton.addEventListener("click", () => {
    courseForm.style.display = "block";
});

saveCourseButton.addEventListener("click", () => {
    const courseCode = courseCodeInput.value;
    const courseName = courseNameInput.value;
    const courseCredits = Number(courseCreditsInput.value);
    const courseStatus = courseStatusInput.value;
    let courseId;

    if (courseCode.trim() === "" || courseName.trim() === "") {
        alert("Please enter both a course code and course name.");
        return;
    }

    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    courseCard.innerHTML = `
    <h2>${courseCode}</h2>
    <p>${courseName}</p>
    <p>${courseCredits} credits • ${courseStatus}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
`;

    const deleteButton = courseCard.querySelector(".delete-btn");

    deleteButton.addEventListener("click", async () => {
        await fetch(`/api/courses/${courseId}`, {
            method: "DELETE"
        });

        courseCard.remove();
    });

    courseList.appendChild(courseCard);

    fetch("/api/courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code: courseCode,
            name: courseName,
            credits: courseCredits,
            status: courseStatus
        })
    })
    .then(response => {
        console.log("POST status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("POST response:", data);
        courseId = data.course._id;
    })
    .catch(error => console.error("POST error:", error));

    courseCodeInput.value = "";
    courseNameInput.value = "";
    courseForm.style.display = "none";
});

fetch("/api/courses")
    .then(response => response.json())
    .then(courses => {
        updateSummary(courses);
        courses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");

            courseCard.innerHTML = `
    <h2>${course.code}</h2>
    <p>${course.name}</p>
    <p>${course.credits ?? 3} credits • <span class="status-badge">${course.status ?? "Planned"}</span></p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    `;

            const deleteButton = courseCard.querySelector(".delete-btn");
            const editButton = courseCard.querySelector(".edit-btn");

            editButton.addEventListener("click", async () => {
                const newCode = prompt("Enter new course code:", course.code);
                const newName = prompt("Enter new course name:", course.name);

                if (!newCode || !newName) return;

                const newCredits = Number(
    prompt("Enter credits:", course.credits ?? 3)
);

const newStatus = prompt(
    "Enter status (Planned, In Progress, or Completed):",
    course.status ?? "Planned"
);

if (!newCredits || !newStatus) return;

                await fetch(`/api/courses/${course._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                    body: JSON.stringify({
    code: newCode,
    name: newName,
    credits: newCredits,
    status: newStatus
})
});

                courseCard.querySelector("h2").textContent = newCode;
courseCard.querySelector("p").textContent = newName;
courseCard.querySelectorAll("p")[1].textContent =
    `${newCredits} credits • ${newStatus}`;
});

            deleteButton.addEventListener("click", async () => {
                await fetch(`/api/courses/${course._id}`, {
                    method: "DELETE"
                });

                courseCard.remove();
            });

            courseList.appendChild(courseCard);
        });
    });

    courseSearchInput.addEventListener("input", () => {
    const searchTerm = courseSearchInput.value.toLowerCase();

    const courseCards = document.querySelectorAll(".course-card");

    courseCards.forEach(courseCard => {
        const courseText = courseCard.textContent.toLowerCase();

        if (courseText.includes(searchTerm)) {
            courseCard.style.display = "block";
        } else {
            courseCard.style.display = "none";
        }
    });
});