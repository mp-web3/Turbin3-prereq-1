// Decode base64 to original string
const base64String = "bXAtd2ViMw==";
const buffer = Buffer.from(base64String, 'base64');
const decodedString = buffer.toString('utf-8');

console.log("Base64 string:", base64String);
console.log("Decoded string:", decodedString); 