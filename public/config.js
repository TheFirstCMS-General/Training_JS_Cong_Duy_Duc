document.addEventListener('DOMContentLoaded', function () {

    // Hàm gửi dữ liệu lên server để lưu vào file
    function saveConfigToServer(config) {
        fetch('/save-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            displayConfigs();
        })
        .catch(error => console.error('Error:', error));
    }

    // Hàm hiển thị dữ liệu từ file
    function displayConfigs() {
        fetch('/config.json')
            .then(response => response.json())
            .then(configs => {
                const table = document.getElementById('config-table').getElementsByTagName('tbody')[0];
                table.innerHTML = ''; // Xóa các hàng hiện có

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
            })
            .catch(error => console.error('Error:', error));
    }

    // Khi submit form, gửi cấu hình lên server và hiển thị
    document.getElementById('feeConfigForm').addEventListener('submit', function (e) {
        e.preventDefault();

        
        const totalAmount = document.getElementById('totalAmount').value;
        const installments = document.getElementById('installments').value;
        const amountPerInstallment = document.getElementById('amountPerInstallment').value;
        const dueDate = document.getElementById('dueDate').value;

        
        if (!totalAmount || !installments || !amountPerInstallment || !dueDate) {
            alert('Vui lòng nhập đầy đủ thông tin trong tất cả các trường!');
            return; // Dừng quá trình lưu nếu thiếu dữ liệu
        }

        
        const config = {
            totalAmount,
            installments,
            amountPerInstallment,
            dueDate
        };

        
        saveConfigToServer(config);

        
        document.getElementById('feeConfigForm').reset();
    });

    // Hiển thị các cấu hình đã lưu khi tải trang
    displayConfigs();
});
