const fs = require('fs');
const path = require('path');

const inFile = path.resolve(__dirname, '..', 'journal.sql');
const outFile = path.resolve(__dirname, '..', 'journal_prefixed.sql');

try {
  const txt = fs.readFileSync(inFile, 'utf8');
  const re = /VALUES\s*\(\s*(\d+)\s*,/g;
  const matches = txt.match(re) || [];
  const transformed = txt.replace(re, (m, p1) => `VALUES (1${p1},`);
  fs.writeFileSync(outFile, transformed, 'utf8');
  console.log('Processed', matches.length, 'INSERT lines. Output:', outFile);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
