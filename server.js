const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// API endpoint để lưu cấu hình
app.post('/save-config', (req, res) => {
    const newConfig = req.body;

    
    const filePath = path.join(__dirname, 'public', 'config.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading config file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let configs = [];
        if (data) {
            configs = JSON.parse(data);
        }

        
        configs.push(newConfig);

        
        fs.writeFile(filePath, JSON.stringify(configs, null, 2), (err) => {
            if (err) {
                console.error('Error writing to config file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.send('Configuration saved successfully!');
        });
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
