let students = [];
const studentTable = document.getElementById('student-table').getElementsByTagName('tbody')[0];

function renderTable() {
    studentTable.innerHTML = '';
    students.forEach((student, index) => {
        const row = studentTable.insertRow();
        row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.gender}</td>
                    <td>${student.amountPaid}</td>
                    <td>${student.completionStatus}</td>
                    <td>${student.amountDate}</td>
                    <td>${student.birthDate}</td>
                    <td>${student.address}</td>
                    <td>
                        <button class="btn btn-warning btn-edit" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editStudentModal">Sửa</button>
                        <button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button>
                    </td>
                `;
    });

    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            const student = students[index];
            // Populate the edit form with the selected student's data
            document.getElementById('editIndex').value = index;
            document.getElementById('editStudentName').value = student.name;
            document.getElementById('editGender').value = student.gender;
            document.getElementById('editAmountPaid').value = student.amountPaid;
            document.getElementById('editCompletionStatus').value = student.completionStatus;
            document.getElementById('editamountDate').value = student.amountDate;
            document.getElementById('editBirthDate').value = student.birthDate;
            document.getElementById('editAddress').value = student.address;
        });
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
                students.splice(index, 1);
                renderTable();
            }
        });
    });
}

document.getElementById('saveStudentBtn').addEventListener('click', () => {
    const student = {
        name: document.getElementById('studentName').value,
        gender: document.getElementById('gender').value,
        amountPaid: document.getElementById('amountPaid').value,
        completionStatus: document.getElementById('completionStatus').value,
        amountDate: document.getElementById('amountDate').value,
        birthDate: document.getElementById('birthDate').value,
        address: document.getElementById('address').value,
    };

    if (Object.values(student).some(value => !value)) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    students.push(student);
    renderTable();
    document.getElementById('addStudentForm').reset();
    const addStudentModal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
    addStudentModal.hide();
});

document.getElementById('updateStudentBtn').addEventListener('click', () => {
    const index = document.getElementById('editIndex').value;
    const student = {
        name: document.getElementById('editStudentName').value,
        gender: document.getElementById('editGender').value,
        amountPaid: document.getElementById('editAmountPaid').value,
        completionStatus: document.getElementById('editCompletionStatus').value,
        amountDate: document.getElementById('editamountDate').value,
        birthDate: document.getElementById('editBirthDate').value,
        address: document.getElementById('editAddress').value,
    };

    if (Object.values(student).some(value => !value)) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    students[index] = student;
    renderTable();
    const editStudentModal = bootstrap.Modal.getInstance(document.getElementById('editStudentModal'));
    editStudentModal.hide();
});

// Initial render
renderTable();


