import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/"\/images\//g, '"./images/');
    const singleQuoteUpdated = updatedContent.replace(/'\/images\//g, "'./images/");
    if (content !== singleQuoteUpdated) {
      fs.writeFileSync(filePath, singleQuoteUpdated, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
