const btnAdd = document.getElementById('btn-add');
const btnEdit = document.getElementById('btn-edit');
const btnDelete = document.getElementById('btn-delete');
const btnSave = document.getElementById('btn-save');

const studentsData = document.getElementById('students-data');
const studentsForm = document.getElementById('student-form');

const inputSearch = document.getElementById('search');
const inputFilter = document.getElementById('filter');
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputGroup = document.getElementById('group');
const inputDoesWork = document.getElementById('doesWork');

let students = JSON.parse(localStorage.getItem('students')) || [];
let studentToEdit = null;

function saveStudent() {
  students = JSON.parse(localStorage.getItem('students')) || [];
  let newStudents;
  let newStudent;
  if (studentToEdit) {
    newStudent = {
      id: studentToEdit.id,
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      group: inputGroup.value,
      doesWork: inputDoesWork.checked,
    };
    newStudents = students.map((student) =>
      student.id !== studentToEdit.id ? student : newStudent
    );
  } else {
    newStudent = {
      id: Math.floor(Math.random() * 100000),
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      group: inputGroup.value,
      doesWork: inputDoesWork.checked,
    };
    newStudents = [...students, newStudent];
  }
  localStorage.setItem('students', JSON.stringify(newStudents));
  displayStudents(newStudents);
  studentsForm.reset();
  studentToEdit = null;
}

function deleteStudent(id) {
  students = JSON.parse(localStorage.getItem('students')) || [];
  if (window.confirm('SIZ PROGRAMISTNI OSHIRMOHCHIMISIZ ?')) {
    let filteredStudents = students.filter((student) => student.id !== id);
    localStorage.setItem('students', JSON.stringify(filteredStudents));
    displayStudents(filteredStudents);
    students = JSON.parse(localStorage.getItem('students'));
  }
}

function editStudent(id) {
  let student = students.find((student) => student.id === id);
  studentToEdit = { ...student };
  inputFirstName.value = studentToEdit.firstName;
  inputLastName.value = studentToEdit.lastName;
  inputGroup.value = studentToEdit.group;
  inputDoesWork.checked = studentToEdit.doesWork;
}

btnSave.addEventListener('click', saveStudent);

inputFilter.addEventListener('change', function (e) {
  students = JSON.parse(localStorage.getItem('students')) || [];
  let val = e.target.value;
  let filteredNewStudents =
    val === 'all'
      ? students
      : students.filter((student) => student.group === val);
  displayStudents(filteredNewStudents);
});

function displayStudents(students) {
  let str = '';
  students.map((student, index) => {
    str += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.group}</td>
      <td>${student.doesWork ? 'Yes' : 'No'}</td>
      <td>
        <button id="btn-edit" class="btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick="editStudent(${
          student.id
        })">Edit</button>
        <button id="btn-delete" class="btn btn-danger" onclick="deleteStudent(${
          student.id
        })">Delete</button>
      </td>
    </tr>
    `;
  });
  studentsData.innerHTML = str;
}

displayStudents(students);


function searchStudents() {
  students = JSON.parse(localStorage.getItem('students')) || [];
  let searchValue = inputSearch.value.toLowerCase();
  let filteredStudents = students.filter((student) => {
    let fullName = student.firstName.toLowerCase() + ' ' + student.lastName.toLowerCase();
    return (
      student.id.toString().includes(searchValue) ||
      fullName.includes(searchValue)
    );
  });
  displayStudents(filteredStudents);
}

inputSearch.addEventListener('input', searchStudents);
