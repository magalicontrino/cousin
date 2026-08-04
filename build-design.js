// Fabrique design.html = essai.html + la peau éditoriale. Rejouable autant de fois qu'on veut.
const fs=require('fs');
const skin=fs.readFileSync('/private/tmp/claude-501/-Users-magalicontrino-SAMU/6c3455a2-7895-4960-9570-8ea4ec3bf642/scratchpad/skin.css','utf8');
let h=fs.readFileSync('essai.html','utf8');
h=h.replace('</head>', skin+'</head>');
h=h.replace(/const APP_VERSION = 'v[0-9]+-essai'/, "const APP_VERSION = 'v405-design'");
h=h.replace('<title>COUSIN — ESSAI (grand écran) · ne pas partager</title>','<title>COUSIN — essai de design · branche</title>');
fs.writeFileSync('design.html',h);
const o=(h.match(/<style/g)||[]).length, f=(h.match(/<\/style>/g)||[]).length;
console.log('design.html refait — style',o+'/'+f,'| peau',/peau-editoriale/.test(h));
