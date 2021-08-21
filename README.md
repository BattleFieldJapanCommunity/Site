# Site

Battlefield Japan Community 公式ホームページ

## 開発
### 基本的な開発
pull requestを送ってください。  
レビュワーを必ず立ててください。
### StatusCheck
pull requestのMainBrunchに対するCodeQLが通されます。  
完了と出るまではマージをすることができません。
### マージ
マージは絶対的なSquashMergeになります。
### 質問
質問はDiscussion・Issueでお願いします。
### 注意点
- pushする前にかならず`gulp build`を走らせてください。
- `./docs`はGulpから出力されたファイルが入ります。編集してもタスクを走らせた際、上書きされてしまうので注意してください。

## 実装
### フロントエンド
HTML JS Sass + Gulp
### 使用モジュール
`gulp`, `gulp-changed`, `gulp-imagemin`, `gulp-postcss`, `gulp-sass`, `gulp-terser`
`browsersync`, `cssnano`, `imagemin-mozjpeg`, `imagemin-pngquant`, `postcss`, `sass`
### Gulpタスク
`./docs`へ書き出し + `browsersync`を使ったデバッグ
```
gulp run
```
`./docs`への書き出しのみ
```
gulp build
```
### その他
- [CodeQL](https://github.com/BattleFieldJapanCommunity/Site/actions/workflows/codeql-analysis.yml)
- Dependabot alerts 
