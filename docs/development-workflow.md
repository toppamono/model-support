# 開発ワークフロー

## 基本方針
GitHub の `main` を唯一の最新版として扱います。ChatGPT と Codex は、同じGitHubリポジトリを共有する二つの作業者として扱います。

## ChatGPT
- 教育的・理論的な設計検討
- UI/UX改善
- 支援モデルや質問項目の構造化
- Issue整理
- コードレビュー
- 小規模修正

## Codex
- 複数ファイルにまたがる実装
- リファクタリング
- テスト追加
- ブラウザ動作確認
- ローカル環境でのデバッグ

## Codex作業開始時
```bash
git checkout main
git pull origin main
```

変更が大きい場合:
```bash
git checkout -b codex/issue-番号-短い説明
```

## 推奨フロー
1. GitHub `main` を最新にする
2. ChatGPTで仕様・問題点を検討する
3. 必要ならIssueを作る
4. CodexまたはChatGPTが変更する
5. 大きな変更はPRで確認する
6. `main` へ統合する
7. GitHub Pagesで公開版を確認する
8. 次の改善は再び最新の `main` から始める

## 衝突を避けるルール
- ChatGPTとCodexが同時に同じファイルを編集しない
- Codex作業中にChatGPT側で同じ箇所を変更する場合は、先にCodex変更をGitHubへ反映する
- 長時間のローカル作業後はpush前に最新状態との差分を確認する
- 仕様変更の理由はIssueまたはPR本文に残す

## 公開版
https://toppamono.github.io/model-support/
