## TODO

* Documentation'da buy kismi guncellenecek.

## Bug fixes

## Update

* [Clean CSS](https://github.com/jakubpawlowicz/clean-css)

Download the git master branch. Extract to a folder. Open terminal inside

```
cd clean-css
npm install
npm run browserify
```

Copy the output
```
cleancss-browser.js
```
file to
```
dist/clean-ss
```
folder.

* [SASS.js](https://github.com/medialize/sass.js/)

Download the git master branch. Copy
```
sass.js/dist/sass.sync.js
```
to local
```
dist/sass
```
folder.

* [Babel](https://github.com/babel/babel-standalone)

Check the dist and update the version at the dist folder.
```
https://unpkg.com/babel-standalone@6/babel.min.js
```

## Helper

```
file_put_contents( dirname(__FILE__) . '/deneme.txt', print_r($tags, true), FILE_APPEND );
```