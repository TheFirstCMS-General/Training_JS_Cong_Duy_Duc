// Hàm để mở popup tìm kiếm
function openSearchPopup() {
    document.getElementById('searchPopup').classList.add('active');
    document.getElementById('searchOverlay').classList.add('active');
}

// Hàm để đóng popup tìm kiếm
function closeSearchPopup() {
    document.getElementById('searchPopup').classList.remove('active');
    document.getElementById('searchOverlay').classList.remove('active');
}

// Sự kiện khi nhấn nút tìm kiếm
document.getElementById('searchBtn').addEventListener('click', function() {
    // Lấy các tiêu chí tìm kiếm
    const name = document.getElementById('searchName').value.toLowerCase();
    const amountDate = document.getElementById('searchAmountDate').value;

    // Lấy các hàng của bảng
    const table = document.getElementById('student-table');
    const rows = table.getElementsByTagName('tr');

    // Lọc các hàng dựa trên tiêu chí tìm kiếm
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const studentName = cells[0].textContent.toLowerCase();
        const paymentDate = cells[4].textContent;

        let match = true;
        if (name && !studentName.includes(name)) {
            match = false;
        }
        if (amountDate && paymentDate !== amountDate) {
            match = false;
        }

        // Hiển thị hoặc ẩn hàng tùy thuộc vào kết quả lọc
        if (match) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }

    // Đóng popup tìm kiếm
    closeSearchPopup();
});
