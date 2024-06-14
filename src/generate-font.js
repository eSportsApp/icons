const webfont = require('webfont').default;
const path = require('path');
const fs = require('fs');
const fg = require('fast-glob');

const svgFiles = fg.sync('src/icons/*.svg'); 

console.log('SVG-Dateien:', svgFiles);  // Debug-Ausgabe

if (svgFiles.length === 0) {
  console.error('Keine SVG-Dateien gefunden');
  process.exit(1);
}

webfont({
  files: 'src/icons/*.svg',
  fontName: 'epp-icons',
  formats: ['woff', 'woff2'],
  dest: 'dist',
}).then(result => {
  console.log('Result:', result);  // Debug-Ausgabe
  
  if (result.template) {
    fs.writeFileSync(path.join('dist', 'epp-icons.css'), result.template);
  } else {
    console.log('Keine Vorlage gefunden');
  }
  
  if (result.woff) {
    fs.writeFileSync(path.join('dist', 'epp-icons.woff'), result.woff);
    console.log('WOFF-Datei erfolgreich generiert');
  } else {
    console.log('Keine WOFF-Datei gefunden');
  }
  
  if (result.woff2) {
    fs.writeFileSync(path.join('dist', 'epp-icons.woff2'), result.woff2);
    console.log('WOFF2-Datei erfolgreich generiert');
  } else {
    console.log('Keine WOFF2-Datei gefunden');
  }

  console.log('Icons erfolgreich generiert!');
}).catch(error => {
  console.error('Fehler beim Generieren der Icons:', error);
});