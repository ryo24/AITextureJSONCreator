# AI Texture JSON Creator

Minecraft向け16x16テクスチャJSONを読み込み、ブラウザ上でプレビュー、編集、PNG/JSON保存できる静的Webアプリです。

## 公開サイト

以下のURLにアクセスすると、そのまま利用できます。

[https://lit-minecraft-aitexturejson-creator.netlify.app/](https://lit-minecraft-aitexturejson-creator.netlify.app/)

## 主な機能

- 外部AIが生成したJSONの読み込み
- 16x16テクスチャの拡大プレビュー
- ピクセル単位の塗り・透明化
- 自由色と16色プリセットの切り替え
- Minecraft向けのテクスチャ名検証
- ブロック用 / アイテム用の種別切り替え
- 編集後JSONの書き出し
- PNG保存
- JSONエラー時のAI修正依頼文生成
- 外部AI用プロンプトの表示とコピー

## ローカル確認

ビルドや依存パッケージのインストールは不要です。`index.html` をブラウザで開くだけで動作します。

## JSON仕様

JSON仕様は [docs/specs/json_format_spec.md](./docs/specs/json_format_spec.md) を参照してください。

主なルール:

- `resolution` は `{ "width": 16, "height": 16 }`
- `texture_type` は `"block"` または `"item"`
- `texture_name` は `^[a-z0-9_]+$`
- `pixel_data` は16行x16列
- ピクセル値は `#RRGGBB` または `transparent`

## ドキュメント

- 仕様: [docs/specs/json_format_spec.md](./docs/specs/json_format_spec.md)
- 設計メモ: [docs/notes/project_decisions.md](./docs/notes/project_decisions.md)
- 外部AI用プロンプト: [docs/prompts/gemini_custom_gem_prompt.md](./docs/prompts/gemini_custom_gem_prompt.md)
- 実装計画の履歴: [docs/archive/implementation_plan.md](./docs/archive/implementation_plan.md)

## ファイル構成

```text
.
├── index.html
├── README.md
├── LICENSE
├── src
│   ├── app.js
│   └── styles.css
└── docs
    ├── archive
    │   └── implementation_plan.md
    ├── notes
    │   └── project_decisions.md
    ├── prompts
    │   └── gemini_custom_gem_prompt.md
    └── specs
        └── json_format_spec.md
```

## 公開について

このリポジトリは静的サイトとして公開できる構成です。Netlify 上の公開先は [lit-minecraft-aitexturejson-creator](https://app.netlify.com/projects/lit-minecraft-aitexturejson-creator/overview) です。

## License

MIT
