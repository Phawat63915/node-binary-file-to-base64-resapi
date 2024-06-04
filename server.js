const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = `${__dirname}/${filename}`;

  // ตรวจสอบว่าไฟล์ .txt มีอยู่หรือไม่
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('not found file');
  }

  // อ่านไฟล์ .txt เป็นสตรีม
  const readStream = fs.createReadStream(filePath);

  // ดึงชื่อไฟล์ต้นฉบับจากชื่อไฟล์ .txt
  const originalFilename = filename.replace('.txt', '');

  // ตั้งค่า header สำหรับการดาวน์โหลด
  res.setHeader('Content-Disposition', `attachment; filename="${originalFilename}"`);

  // แปลงข้อมูล Base64 ในสตรีมเป็นบัฟเฟอร์และส่งไปยัง client
  readStream.on('data', (chunk) => {
    const buffer = Buffer.from(chunk.toString(), 'base64');
    res.write(buffer);
  });

  readStream.on('end', () => {
    res.end();
  });
});

app.listen(port, () => {
  console.log(`api express ${port}`);
});