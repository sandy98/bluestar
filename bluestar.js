#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const file = process.argv[2]

const prefix = 'data:image/___;base64,'

const extensions = ['.gif', '.png', '.ico', '.jpg', '.jpeg', '.bmp', '.tiff']

const htemplate = `
  <img src="___" />
`
const convert = function(f) {
  if (!f) {
    console.error("Must provide a file to convert.");
    return -1;
  }
  
  if (!fs.existsSync(f)) {
    console.error("Must provide an existing file to convert.");
    return -2;
  }
  
  const extname = path.extname(f);
  
  if (extname === '' || extname === '.' || extensions.filter(function(e) {return e === extname;}).length === 0) {
    console.error('File must have a valid graphic extension (.gif, .png, .ico, .jpg, .jpeg, .bmp, .tiff) in order to be processed')
    return -3;
  }
  
  const basename = path.basename(f, extname);
  
  const newPrefix = prefix.replace('___', extname.replace('.', ''));
  
  const contents = `${newPrefix}${fs.readFileSync(f).toString('base64')}`;
  
  const html = htemplate.replace('___', contents)
  
  fs.writeFileSync(`${basename}.b64`, contents, 'utf8')
  fs.writeFileSync(`${basename}.html`, html, 'utf8')
  
  console.error(`Written files ${basename}.b64 and ${basename}.html`);
  
  return 0;
}

process.exit(convert(file));

