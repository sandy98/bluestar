# Bluestar

Tiny node.js based utility to convert images to base64 encoded string suitable to be embedded in web pages.


## Install

Either

```sh
git clone https://github.com/sandy98/bluestar.git

cd bluestar

npm install

npm build

```

or

```sh
sudo npm install -g bluestar
```

In the first case you get an executable version of the script: bluestar and 3 binary executables: bluestar-linux, bluestar.macos and bluestar-win.exe.

You can choose to copy your OS specific executable within a location in your path and you're done.

In the second case, npm or yarn install, you get a system wide available version of the executable script.


## Usage

This is the simplest part: just do 
```sh 
bluestar whatever.png 
```
and get 2 files: whatever.b64 and whatever.html, which is a ready made html file to test the created image.

With version 0.1.1 onwards, you also can import/require convert function for usage in your own apps, like so:

```js
const convert = require('bluestar');
convert('photo.gif', (err, data) => {
  if (err) console.error("Error No: " + err.number + " " + err.message)
  else console.log(data)});

```
