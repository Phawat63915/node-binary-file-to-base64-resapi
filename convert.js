const fs = require('fs');

const inputFile = process.argv[2];
const outputFile = process.argv[3] || `${inputFile}.txt`;

// อ่านไฟล์อินพุตเป็นบัฟเฟอร์
const fileData = fs.readFileSync(inputFile);

// แปลงบัฟเฟอร์เป็น Base64 และเขียนลงไฟล์ .txt
fs.writeFileSync(outputFile, fileData.toString('base64'));

console.log(`convert ${inputFile} to ${outputFile} successful`);