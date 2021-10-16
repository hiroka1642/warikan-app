# みんなでわりかん。

## → 割り勘アプリ

- 旅行時、誰が何を誰の分支払ったか、後々清算しやすいようなアプリを作ります

## 学びたいこと

- Supabase に触れ、PostgreSQL の仕組みを理解する
- TypeScript の使い方を学ぶ
- Figma を用いて設計する

## 実装したい機能

- ログイン機能
- 作成したプロジェクトを記憶
- プロジェクトの中でさらに割り勘する人を指定し、その中で割り勘する
- 誰が誰にいくら支払えばいいか一覧で表示する

## なぜ作ろうと思ったのか

- 大人数での旅行の際に最後の割り勘作業が複雑であり、分かりやすくできるアプリが欲しいと思った為
- 身近な人に使って頂き、フィードバックを得られそうだった為
- Supabase,TypeScript を用いた初めての開発に適切な難易度だと思った為

## 使用予定技術

- HTML,CSS,React,Next.js,TypeScript,TailwindCSS,ChakraUI,Supabase


## 学んだこと

2021/9/27 
・supabaseのAPIを利用したテーブルからのデータの取り出し。
・↑また、条件に応じたデータの取り出し
・ChakraUIを用いたモーダルウィンドウの実装

2021/10/9
・ニックネームの変更機能を追加
・updateを用いて、rowの書き換え
・構成の変更

2021/10/15
・unMount時に不要なstateを解放する必要がある（メモリーリークを防ぐ為）
・"strictNullChecks": trueにしておく。undefinedやnullが混在することを防ぐ


## やるべきこと

✅background-imageのレスポンシブ対応
・ハンバーガーメニューの作成
・他、レスポンシブ対応
・カラーの調整
✅githubログインを有効にする（今回は削除）
・userごとの管理ができるようにする
・TypeScriptの型設定をしっかりする
・リファクタリング
・支払いの削除機能
・使いやすいUIにする
✅割り勘する人を選ぶボタンを使いやすくする
・カーソルが始めからinputに合うようにする
・入力する字体が違う場合、エラーを出すようにする