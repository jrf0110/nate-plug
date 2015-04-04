# Nate Plug!

> This a stupid game I started writing on an RV on the way to Palo Duro. My buddy nate was plugging in a charger while we were driving and it looked real funny, so I made this.

Play at http://nate-plug.j0.hn

![Screenshot](./screen.png)

__Setup:__

```
git clone https://github.com/jrf0110/nate-plug
cd nate-plug
npm install
npm start
```

Then open your browser to http://localhost:8080

`npm start` will watch for changes in the source directories and re-build on the fly. It will also start a web server on port 8080. If you don't want to start a webserver and serve the files from your own, you'll need to build the source:

```
./node_modules/.bin/gulp build
```