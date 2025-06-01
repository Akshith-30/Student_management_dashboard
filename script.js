//Student Class (OOP) 
class Student {
  constructor(id, name, age, grade, subject) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.grade = grade;
    this.subject = subject;
  }
  update(details) {
    Object.assign(this, details);
  }
}

// DOM Elements 
const studentForm = document.getElementById('studentForm');
const studentsList = document.getElementById('studentsList');
const studentCount = document.getElementById('studentCount');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const gradeFilter = document.getElementById('gradeFilter');
const sortBy = document.getElementById('sortBy');
const sortOrder = document.getElementById('sortOrder');
const clearAllBtn = document.getElementById('clearAll');
const exportDataBtn = document.getElementById('exportData');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalConfirm = document.getElementById('modalConfirm');
const modalCancel = document.getElementById('modalCancel');

// Timer Feature 
let notificationTimeout;
function showNotification(message, type = "info") {
  let notif = document.getElementById("notification");
  if (!notif) {
    notif = document.createElement("div");
    notif.id = "notification";
    notif.style.position = "fixed";
    notif.style.bottom = "32px";
    notif.style.right = "32px";
    notif.style.background = type === "success" ? "#22c55e" : type === "error" ? "#e53e3e" : "#3A82F7";
    notif.style.color = "#fff";
    notif.style.padding = "14px 24px";
    notif.style.borderRadius = "8px";
    notif.style.fontSize = "1rem";
    notif.style.zIndex = "9999";
    notif.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
    document.body.appendChild(notif);
  }
  notif.textContent = message;
  notif.style.display = "block";
  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    notif.style.display = "none";
  }, 2000);
}

// Async Simulated Storage
function fakeApiDelay(ms = 600) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let students = [];
let editId = null;

async function loadStudents() {
  try {
    showNotification("Loading students...", "info");
    await fakeApiDelay();
    const data = localStorage.getItem('students');
    students = data
      ? JSON.parse(data).map(
          (s) => new Student(s.id, s.name, s.age, s.grade, s.subject)
        )
      : [];
    showNotification("Students loaded!", "success");
  } catch (e) {
    students = [];
    showNotification('Failed to load students from storage.', "error");
  }
}

async function saveStudents() {
  showNotification("Saving...", "info");
  await fakeApiDelay();
  localStorage.setItem('students', JSON.stringify(students));
  showNotification("Saved!", "success");
}

// Modal 
function showModal(title, message, onConfirm) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.style.display = 'flex';
  modalConfirm.onclick = () => {
    modal.style.display = 'none';
    onConfirm();
  };
  modalCancel.onclick = () => {
    modal.style.display = 'none';
  };
}

//Render Students
function renderStudents(list = students) {
  studentsList.innerHTML = '';
  studentCount.textContent = list.length;
  if (list.length === 0) {
    studentsList.innerHTML = `<div class="no-students"><p>No students found. Add your first student above!</p></div>`;
    return;
  }
  list.forEach(({ id, name, age, grade, subject }) => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
      <div class="student-info">
        <div>
          <span class="info-label">Name</span>
          <div class="info-value">${name}</div>
        </div>
        <div>
          <span class="info-label">Age</span>
          <div class="info-value">${age}</div>
        </div>
        <div>
          <span class="info-label">Grade</span>
          <div class="info-value"><span class="grade-badge grade-${grade}">${grade}</span></div>
        </div>
        <div>
          <span class="info-label">Subject</span>
          <div class="info-value">${subject}</div>
        </div>
      </div>
      <div class="student-actions">
        <button class="edit-btn" data-id="${id}">Edit</button>
        <button class="delete-btn" data-id="${id}">Delete</button>
      </div>
    `;
    studentsList.appendChild(card);
  });
}

//Add Student
async function addStudent({ name, age, grade, subject }) {
  const id = Date.now().toString();
  const student = new Student(id, name, age, grade, subject);
  students.push(student);
  await saveStudents();
  renderStudents(getFilteredSortedStudents());
  showNotification("Student added!", "success");
}

//Delete Student
function deleteStudent(id) {
  showModal('Delete Student', 'Are you sure you want to delete this student?', async () => {
    students = students.filter((s) => s.id !== id);
    await saveStudents();
    renderStudents(getFilteredSortedStudents());
    showNotification("Student deleted.", "success");
  });
}

//Edit Student
function editStudent(id) {
  const student = students.find((s) => s.id === id);
  if (student) {
    studentForm['name'].value = student.name;
    studentForm['age'].value = student.age;
    studentForm['grade'].value = student.grade;
    studentForm['subject'].value = student.subject;
    editId = id;
    submitBtn.textContent = 'Update Student';
    cancelBtn.style.display = 'inline-block';
    showNotification("Editing student...", "info");
    // Scroll to the form section
    document.getElementById('formSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

//Clear Form
function clearForm() {
  studentForm.reset();
  editId = null;
  submitBtn.textContent = 'Add Student';
  cancelBtn.style.display = 'none';
}

//Form Handling
studentForm.onsubmit = async function (e) {
  e.preventDefault();
  const name = studentForm['name'].value.trim();
  const age = parseInt(studentForm['age'].value);
  const grade = studentForm['grade'].value;
  const subject = studentForm['subject'].value.trim();

  if (!name || isNaN(age) || age < 1 || age > 100 || !grade || !subject) {
    showNotification('Please fill all fields correctly!', "error");
    return;
  }

  if (editId) {
    const student = students.find((s) => s.id === editId);
    if (student) {
      student.update({ name, age, grade, subject });
      await saveStudents();
      showNotification("Student updated!", "success");
    }
  } else {
    await addStudent({ name, age, grade, subject });
  }

  renderStudents(getFilteredSortedStudents());
  clearForm();
};

cancelBtn.onclick = clearForm;

//Students List Actions
studentsList.onclick = function (e) {
  if (e.target.classList.contains('edit-btn')) {
    editStudent(e.target.dataset.id);
  }
  if (e.target.classList.contains('delete-btn')) {
    deleteStudent(e.target.dataset.id);
  }
};

//Search, Filter, Sort
function getFilteredSortedStudents() {
  let filtered = [...students];
  const search = searchInput.value.trim().toLowerCase();
  if (search) {
    filtered = filtered.filter(
      s =>
        s.name.toLowerCase().includes(search) ||
        s.subject.toLowerCase().includes(search)
    );
  }
  const gradeVal = gradeFilter.value;
  if (gradeVal) {
    filtered = filtered.filter(s => s.grade === gradeVal);
  }
  const sortKey = sortBy.value;
  const order = sortOrder.dataset.order;
  filtered.sort((a, b) => {
    let valA = a[sortKey], valB = b[sortKey];
    if (sortKey === 'age') {
      valA = Number(valA);
      valB = Number(valB);
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }
    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return filtered;
}

function updateList() {
  renderStudents(getFilteredSortedStudents());
}

searchInput.oninput = updateList;
gradeFilter.onchange = updateList;
sortBy.onchange = updateList;
sortOrder.onclick = function () {
  const order = sortOrder.dataset.order === 'asc' ? 'desc' : 'asc';
  sortOrder.dataset.order = order;
  sortOrder.textContent = order === 'asc' ? '↑ Ascending' : '↓ Descending';
  updateList();
};

//Clear All Students
clearAllBtn.onclick = function () {
  showModal('Clear All Students', 'Are you sure you want to remove all students?', async () => {
    students = [];
    await saveStudents();
    renderStudents(getFilteredSortedStudents());
    showNotification("All students cleared.", "success");
  });
};

//Export Data
exportDataBtn.onclick = function () {
  const dataStr = JSON.stringify(students, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'students.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showNotification("Exported student data.", "success");
};

//Initialization
window.onload = async function () {
  await loadStudents();
  renderStudents(getFilteredSortedStudents());
  clearForm();
};
