document.addEventListener('DOMContentLoaded', function () {

    // Hàm lưu dữ liệu vào localStorage
    function saveConfigToLocalStorage(config) {
        let configs = JSON.parse(localStorage.getItem('configs')) || [];
        configs.push(config);
        localStorage.setItem('configs', JSON.stringify(configs));
    }

    // Hàm hiển thị dữ liệu từ localStorage
    function displayConfigs() {
        let configs = JSON.parse(localStorage.getItem('configs')) || [];
        const table = document.getElementById('config-table').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear existing rows

        configs.forEach(config => {
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);

            cell1.innerHTML = config.totalAmount;
            cell2.innerHTML = config.installments;
            cell3.innerHTML = config.amountPerInstallment;
            cell4.innerHTML = config.dueDate;
        });
    }

    // Khi submit form, lưu cấu hình và hiển thị
    document.getElementById('feeConfigForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Lấy giá trị từ form
        const totalAmount = document.getElementById('totalAmount').value;
        const installments = document.getElementById('installments').value;
        const amountPerInstallment = document.getElementById('amountPerInstallment').value;
        const dueDate = document.getElementById('dueDate').value;

        // Kiểm tra các trường dữ liệu có được nhập đầy đủ hay không
        if (!totalAmount || !installments || !amountPerInstallment || !dueDate) {
            alert('Vui lòng nhập đầy đủ thông tin trong tất cả các trường!');
            return; // Dừng quá trình lưu nếu thiếu dữ liệu
        }

        // Tạo đối tượng cấu hình
        const config = {
            totalAmount,
            installments,
            amountPerInstallment,
            dueDate
        };

        // Lưu cấu hình vào localStorage
        saveConfigToLocalStorage(config);

        // Hiển thị lại cấu hình mới
        displayConfigs();

        // Xóa form sau khi lưu
        document.getElementById('feeConfigForm').reset();
    });

    // Hiển thị các cấu hình đã lưu khi tải trang
    displayConfigs();

    // Nút Thoát về Trang 1 (trang Quản lý học sinh)
    document.querySelector('.btn-secondary').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});
