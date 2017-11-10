#!/usr/bin/env node

fs = require('fs')

file = process.argv[2]


const convert = function(f) {
  if (!f) {
    console.log("Must provide a file to convert.");
    return -1;
  }
  
  console.error(`File: ${f}`);
  return 0;
}

process.exit(convert(file));

