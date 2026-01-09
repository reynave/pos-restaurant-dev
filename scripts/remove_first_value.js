const fs = require('fs');
const path = require('path');

const inFile = path.resolve(__dirname, '..', 'journal.sql');
const outFile = path.resolve(__dirname, '..', 'journal_noid.sql');

try {
  const txt = fs.readFileSync(inFile, 'utf8');
  const re = /VALUES\s*\(\s*\d+\s*,/g;
  const matches = txt.match(re) || [];
  const cleaned = txt.replace(re, 'VALUES (');
  fs.writeFileSync(outFile, cleaned, 'utf8');
  console.log('Processed', matches.length, 'INSERT lines. Output:', outFile);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
