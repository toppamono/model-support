# Prompt Bridge — Webプロトタイプ

GitHub Pages向け1ファイルWebアプリです（PC・スマートフォン両対応）。変換ボタンは左右の枠の中央にあります。

## ファイル
- index.html — 左右2ペイン、中央の変換ボタン、入力停止後の自動変換、3モード、手動編集・コピー。
- backend-worker.js — Cloudflare Workers用の任意のAI中継サーバー例。

## GitHub Pages公開
現在は既存の toppamono/model-support リポジトリ内の独立フォルダに置いています。

GitHubで Settings → Pages → Build and deployment を確認してください。
「Deploy from a branch」の場合、main / (root) に設定すると、
https://toppamono.github.io/model-support/prompt-bridge/ で公開される想定です。

**既存のサイトが動いている場合、Pages設定の変更で影響が出る可能性があります。既存設定を変更する前に確認してください。**
ファイルのアップロードだけでPagesが公開されたとは限りません。

## 接続なしの簡易変換
初期設定は「簡易変換（接続不要）」です。よく使う人物の位置関係、対面座位、抱き合う姿勢、画面比率、顔・服装・背景の維持、左右移動など、登録した日本語表現だけを英語に言い換えます。自由な文章全体をAIで解釈する機能ではありません。未対応の意味は省略される場合があります。生成文は必ず確認してください。未対応だけの場合はエラーを示します。

## AI変換（自由入力）を有効にする
GitHub Pagesは静的サイトなので、AIキーを安全に扱うためには別のバックエンドが必要です。
同梱の backend-worker.js はCloudflare Workers向けの実装例です。

1. Cloudflare Workerを作成し backend-worker.js の内容をデプロイ。
2. Cloudflare WorkerのSecretsに OPENAI_API_KEY（OpenAIの秘密鍵）と APP_TOKEN（別の長くランダムな共有トークン）を設定。
3. WorkerのVariablesに ALLOWED_ORIGIN=https://toppamono.github.io を設定。必要なら OPENAI_MODEL を設定。
4. Web画面の「接続設定」でWorkerのHTTPS URLとAPP_TOKENを入力。
5. 変換方式を「AI中継サーバー」にすると、入力が止まってから約0.75秒後に英語プロンプトを生成。

**重要な注意**
- APIキーをGitHubやindex.htmlに絶対に貼り付けないこと。
- Web設定画面にはOpenAI APIキーを入れず、別に設定した APP_TOKEN だけを入れること。
- APP_TOKENはこのブラウザ内のメモリだけに保持され、再読み込み後に再入力が必要。
- 本番公開では利用量制限や認証の強化を推奨。Cloudflare WorkersとOpenAI APIはそれぞれ利用条件・料金を確認。
- 児童等の個人情報は入力しないこと。
- 簡易変換モードは対応表現のみのルールベース変換であり、AIによる自由変換ではないこと。
- ChatGPTの有料契約にAPI使用料は含まれません。

## 対応範囲
自由な日本語をAIで変換するのは、別途Workerを公開・接続してからです。
AIによる翻訳の質、すべての画像生成モデルでのプロンプト受理は保証できません。
