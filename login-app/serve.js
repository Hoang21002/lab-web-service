const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Dữ liệu mẫu về sinh viên
const students = [
    { email: 'student1@example.com', password: 'password1', name: 'Student One', score: 85 },
    { email: 'student2@example.com', password: 'password2', name: 'Student Two', score: 92 },
    // Thêm các thông tin sinh viên khác nếu cần
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;

    if (path === '/login' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const requestBody = JSON.parse(body);
            console.log('Received data:', requestBody);
            const { email, password } = requestBody;

            const student = students.find(
                (s) => s.email === email && s.password === password
            );

            if (student) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Đăng nhập thành công',
                    name: student.name,
                    score: student.score,
                }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Sinh viên không có trong hệ thống' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route không hợp lệ' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
