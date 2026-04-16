export default function handler(req, res) {
  const auth = req.headers.authorization;

  if (!auth) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    return res.end('認証が必要です');
  }

  try {
    const base64 = auth.split(' ')[1];
    const decoded = Buffer.from(base64, 'base64').toString();
    const [user, pass] = decoded.split(':');

    if (user !== 'admin' || pass !== '1234') {
      res.statusCode = 401;
      return res.end('認証失敗');
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <h1>ダッシュボード</h1>

      <h2>📊 売上データ</h2>
      <p id="sales">今月の売上: 1,000,000円</p>
      <p>今日の売上: 120,000円</p>

      <h2>👥 ユーザー情報</h2>
      <p id="users">総ユーザー数: 523人</p>
      <p>アクティブユーザー: 87人</p>

      <h2>🚨 システム状態</h2>
      <p id="errors">エラー件数: 2件</p>
      <p>APIステータス: 正常</p>
    `);

  } catch (e) {
    res.statusCode = 500;
    res.end('サーバーエラー');
  }
}