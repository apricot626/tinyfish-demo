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
      <p>売上: 1,000,000円</p>
      <p>ユーザー数: 523人</p>
      <p>ステータス: 正常</p>
    `);

  } catch (e) {
    res.statusCode = 500;
    res.end('サーバーエラー');
  }
}