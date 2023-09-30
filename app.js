const express = require("express");
const path = require("path");
const fs = require("fs");
const { dir } = require("console");

const app = express();
app.use(express.static("./public"));
const PORT = 3000;

const currentDir = process.cwd();
const htmlPathes = `${currentDir}/public/html`;

//ファイル名とディレクトリ名のリスト
const files = fs.readdirSync(htmlPathes);
//ディレクトリに絞る
const dirList = files.filter((file) => {
  return fs.statSync(path.join(htmlPathes, file));
});
console.log(dirList);

// ルーティングの設定
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// ディレクトリごとにルーティング
dirList.forEach((element) => {
  app.get(`/${element}`, (req, res) => {
    res.sendFile(path.join(__dirname, `public/html/${element}`));
  });
});

// HTTPサーバを起動する
app.listen(
  process.env.PORT || PORT,
  console.log(`listening at http://localhost:${PORT}`)
);
