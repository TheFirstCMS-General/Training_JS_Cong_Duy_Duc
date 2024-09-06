// Khởi tạo danh sách học sinh từ localStorage hoặc một mảng rỗng nếu chưa có
let students = JSON.parse(localStorage.getItem('students')) || [];
const studentTable = document.getElementById('student-table').getElementsByTagName('tbody')[0];

function getLatestDueDate() {
    let configs = JSON.parse(localStorage.getItem('configs')) || [];
    if (configs.length > 0) {
        const latestConfig = configs[configs.length - 1]; // Lấy cấu hình mới nhất
        return new Date(latestConfig.dueDate);
    }
    return null;
}

// Hàm hiển thị bảng danh sách học sinh
// Hàm hiển thị bảng danh sách học sinh
function renderTable() {
    const dueDate = getLatestDueDate(); // Lấy hạn đóng từ cấu hình
    console.log('Hạn đóng:', dueDate); // Kiểm tra hạn đóng có được lấy đúng không

    studentTable.innerHTML = '';

    // Sắp xếp học sinh
    students.sort((a, b) => {
        if (a.completionStatus === "Chưa hoàn thành" && b.completionStatus === "Hoàn thành") return -1;
        if (a.completionStatus === "Hoàn thành" && b.completionStatus === "Chưa hoàn thành") return 1;
        return new Date(a.amountDate) - new Date(b.amountDate);
    });

    students.forEach((student, index) => {
        const row = studentTable.insertRow();
        const amountDate = new Date(student.amountDate); // Lấy ngày thanh toán của học sinh

        // Chỉ tính toán nếu hạn đóng tồn tại và học sinh chưa hoàn thành
        if (dueDate && student.completionStatus === "Chưa hoàn thành") {
            const daysLeft = Math.ceil((dueDate - amountDate) / (1000 * 60 * 60 * 24)); // Tính số ngày còn lại giữa hạn đóng và ngày thanh toán

            // Kiểm tra điều kiện để gán màu
            if (daysLeft < 0) {
                row.classList.add('highlight-red'); // Quá hạn
            } else if (daysLeft <= 3) {
                row.classList.add('highlight-yellow'); // Còn 3 ngày hoặc ít hơn (0 đến 3 ngày)
            }
            console.log('Days left:', daysLeft); // Kiểm tra số ngày còn lại
        }

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
    // Xử lý các nút sửa và xóa như trước
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            const student = students[index];
            // Điền thông tin của học sinh đã chọn vào form sửa
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
                saveStudents();
                renderTable();
            }
        });
    });
}


// Lưu danh sách học sinh vào localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Xử lý nút thêm học sinh
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

    // Kiểm tra nếu còn trường nào chưa điền
    if (Object.values(student).some(value => !value)) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    students.push(student);
    saveStudents();
    renderTable();
    document.getElementById('addStudentForm').reset();
    const addStudentModal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
    addStudentModal.hide();
});

// Xử lý nút cập nhật học sinh
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

    // Kiểm tra nếu còn trường nào chưa điền
    if (Object.values(student).some(value => !value)) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    students[index] = student;
    saveStudents();
    renderTable();
    const editStudentModal = bootstrap.Modal.getInstance(document.getElementById('editStudentModal'));
    editStudentModal.hide();
});

// Xuất danh sách học sinh ra file Excel
function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Xuất file
    XLSX.writeFile(workbook, "danh_sach_hoc_sinh.xlsx");
}

// Xử lý nút xuất Excel
document.getElementById('exportBtn').addEventListener('click', exportToExcel);

// Nhập danh sách học sinh từ file Excel
function importFromExcel(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Giả sử dữ liệu nằm ở sheet đầu tiên
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const importedData = XLSX.utils.sheet_to_json(firstSheet);

        // Cập nhật danh sách học sinh
        students = importedData;
        saveStudents();
        renderTable();
    };

    reader.readAsArrayBuffer(file);
}

// Xử lý nút nhập Excel
document.getElementById('importBtn').addEventListener('change', importFromExcel);

// Render bảng ban đầu
renderTable();
