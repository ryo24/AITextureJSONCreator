# AI Texture JSON Creator

Minecraft向け16x16テクスチャJSONを読み込み、ブラウザ上でプレビュー、編集、PNG/JSON保存できるプロトタイプです。

## 使い方

`index.html` をブラウザで開きます。

```text
index.html
```

ビルドや依存パッケージのインストールは不要です。

## できること

- 外部AIが生成したJSONの読み込み
- 16x16テクスチャの拡大プレビュー
- ピクセル単位の塗り・透明化
- Minecraft向けのテクスチャ名検証
- ブロック用 / アイテム用の種別切り替え
- 編集後JSONの書き出し
- PNG保存
- JSONエラー時のAI修正依頼文生成
- カスタムGem用プロンプトの表示とコピー

## JSON仕様

JSON仕様は [docs/json_format_spec.md](./docs/json_format_spec.md) を参照してください。

主なルール:

- `resolution` は `{ "width": 16, "height": 16 }`
- `texture_type` は `"block"` または `"item"`
- `texture_name` は `^[a-z0-9_]+$`
- `pixel_data` は16行x16列
- ピクセル値は `#RRGGBB` または `transparent`

## 決定事項

制作前に決まったことは [docs/project_decisions.md](./docs/project_decisions.md) にまとめています。

## ファイル構成

```text
.
├── index.html
├── styles.css
├── app.js
├── README.md
├── implementation_plan.md
├── gemini_prompt.md
└── docs
    ├── json_format_spec.md
    └── project_decisions.md
```

## デザイン方針

初期版はMinecraftのトーンを参考にしつつ、制作サービスとして使いやすいプロトタイプUIにしています。
Stitchで作る本デザインに差し替えやすいよう、HTML、CSS、JavaScriptを分離しています。
