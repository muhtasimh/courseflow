const addCourseButton = document.getElementById("add-course-btn");
const courseForm = document.getElementById("course-form");
const saveCourseButton = document.getElementById("save-course-btn");
const courseCodeInput = document.getElementById("course-code");
const courseNameInput = document.getElementById("course-name");
const courseList = document.getElementById("course-list");

addCourseButton.addEventListener("click", () => {
    courseForm.style.display = "block";
});

saveCourseButton.addEventListener("click", () => {
    const courseCode = courseCodeInput.value;
    const courseName = courseNameInput.value;
    let courseId;

    if (courseCode.trim() === "" || courseName.trim() === "") {
    alert("Please enter both a course code and course name.");
    return;
}

    const courseCard = document.createElement("div");

  courseCard.innerHTML = `
    <h2>${courseCode}</h2>
    <p>${courseName}</p>
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
        name: courseName
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
        courses.forEach(course => {
            const courseCard = document.createElement("div");

            courseCard.innerHTML = `
    <h2>${course.code}</h2>
    <p>${course.name}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
`;

const deleteButton = courseCard.querySelector(".delete-btn");
const editButton = courseCard.querySelector(".edit-btn");

editButton.addEventListener("click", async () => {
    const newCode = prompt("Enter new course code:", course.code);
    const newName = prompt("Enter new course name:", course.name);

    if (!newCode || !newName) return;

    await fetch(`/api/courses/${course._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code: newCode,
            name: newName
        })
    });

    courseCard.querySelector("h2").textContent = newCode;
    courseCard.querySelector("p").textContent = newName;
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