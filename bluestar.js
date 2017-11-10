#!/usr/bin/env node

const fs = require('fs')
const path = require('path')


const prefix = 'data:image/___;base64,'

const extensions = ['.gif', '.png', '.ico', '.jpg', '.jpeg', '.bmp', '.tiff']

const htemplate = `
  <img src="___" />
`

const convert = function(f, cb) {
  const extname = path.extname(f);
  
  if (extname === '' || extname === '.' || extensions.filter(function(e) {return e === extname;}).length === 0) {
    const msg = 'File must have a valid graphic extension (.gif, .png, .ico, .jpg, .jpeg, .bmp, .tiff) in order to be processed'
    if (!cb) {
      console.error(msg)
      return -3;
    }
    else {
      return cb({message: msg, number: -3}, null)
    }
  }
  
  const basename = path.basename(f, extname);
  
  const newPrefix = prefix.replace('___', extname.replace('.', ''));
  
  fs.readFile(f, function (err, data) {
    if (err) {
      if (!cb) {
        console.error(err.message);
      }
      else {
        cb({message: err.message, number: -4}, null)
      }
    }
    else {
      const contents = `${newPrefix}${data.toString('base64')}`;
      if (!cb) {
        console.log(contents)
      }
      else {
        cb(null, contents)
      }
    }
  });
}


const main = function(f) {
  if (!f) {
    console.error("Must provide a file to convert.");
    process.exit(-1);
  }
  
  if (!fs.existsSync(f)) {
    console.error("Must provide an existing file to convert.");
    process.exit(-2);
  }

  convert(f, function(err, contents) {
    if (err) {
      console.error(err.message)
      process.exit(err.number)
    }

    const html = htemplate.replace('___', contents)
    const basename = path.basename(f, path.extname(f))
    
    fs.writeFileSync(`${basename}.b64`, contents, 'utf8')
    fs.writeFileSync(`${basename}.html`, html, 'utf8')
  
    console.error(`Written files ${basename}.b64 and ${basename}.html`);
    process.exit(0)
  });
  
}


if (!module.parent) {
  const file = process.argv[2]
  main(file)  
}

if (module) {module.exports = convert}
if (!(typeof exports === 'undefined')) {exports.convert = convert}
if (!(typeof define === 'undefined')) {define(function() {return convert;})}  
