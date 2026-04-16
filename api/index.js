export default function handler(req, res) {
  const { username, password } = req.query;

  // ログイン成功
  if (username === 'admin' && password === '1234') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(`
      <h1>ダッシュボード</h1>
      <p id="sales">今月の売上: 1,000,000円</p>
      <p id="users">総ユーザー数: 523人</p>
    `);
  }

  // ログイン画面
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`
    <h1>ログイン</h1>
    <form method="GET">
      <input name="username" placeholder="username" />
      <input name="password" type="password" placeholder="password" />
      <button type="submit">ログイン</button>
    </form>
  `);
}