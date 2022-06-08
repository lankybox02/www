const editJsonFile = require('edit-json-file');
const express = require('express');
const fs = require("fs");
const app = express();

app.get('/', (req, res) => {
  res.send(parseHTML("Home", `
  <div class="box">
  <div class="box-header">
  What's happening?
  </div>
  <div class="box-content" id="activity">
  Hello, world!
  </div>
  </div>
  `))
});

function parseHTML(title, content) {
  let maintenance = fs.readFileSync(`${__dirname}/static/maintenance.html`).toString();
  let nav = fs.readFileSync(`${__dirname}/src/navigation.html`).toString();
  let style = fs.readFileSync(`${__dirname}/src/styling.css`).toString();
  let file = editJsonFile(`${__dirname}/flags.json`).get();
  if (file.maintenance) {
    return maintenance;
  }

return `
<!DOCTYPE html>
<html>
<head>
<title>${title} - Screech</title>
</head>
<body>
${nav}
${content}
<style>
${style}
</style>
</body>
</html>
`
}

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
