# Security Notes

请勿提交：

- `.env`
- SSH 私钥
- 数据库密码
- Twikoo 管理凭据
- Umami `APP_SECRET`
- COS/S3 SecretId / SecretKey

生产环境优先使用 GitHub Actions Secrets、EdgeOne 环境变量或服务器 Secret 管理。

如果发现安全问题，请不要公开创建 issue，优先通过项目维护者的私下安全渠道报告。
