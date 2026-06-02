# 儿童看图写话 零配置 GitHub Pages 部署指南 🚀

现在，本应用已经重构为**纯前端 (Pure SPA) 结构**：
- 🌟 所有 AI 批改、灵感句式生成均通过用户配置的 OpenAI API Key 直接发起。
- 🔒 所有的历史写话记录和配置都安全地存储在读者的浏览器本地缓存（`localStorage`）中。
- 📦 **完美兼容静态网页部署**——不仅没有任何服务器成本，还可以随时一键部署至免费的 GitHub Pages 服务！

为了方便您部署，我们已经在 `vite.config.ts` 中将基础路径配置为 `base: './'`（即相对路径），确保您的静态资源在 `username.github.io/repo-name/` 子文件夹下也能无缝加载。

---

## 方式一：使用 GitHub Actions 自动构建与部署（最推荐 ✨）

这是最现代、最简单的方法，每次您 `git push` 上传新代码时，GitHub 会自动为您在线构建并发布网站。

1. **新建 GitHub 仓库**：在 GitHub 上创一个名为 `look-and-write` (或任何您喜欢的名字) 的仓库，并将代码推送上去。
2. **启用 GitHub Actions 权限**：
   - 打开您的 GitHub 仓库页面，点击 **Settings (设置)** -> **Actions** -> **General**。
   - 滚动到最底部，将 **Workflow permissions** 改为 **Read and write permissions** (读写权限)，然后点击 **Save** 保存。
3. **设置 Pages 源**：
   - 点击 **Settings (设置)** -> **Pages**。
   - 在 **Build and deployment** 下的 **Source** 中选择 **GitHub Actions**。
4. **提交部署工作流文件**（系统已自动为您准备好）：
   - 在项目根目录下创建 `.github/workflows/deploy.yml` 文件。
   - 复制以下配置并保存、推送至仓库，它就会自动启动部署了！

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # 或者是 master

permissions:
  contents: write

jobs:
  build-and-deploy:
    concurrency: ci-${{ github.ref }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4

      - name: Install and Build 🔧
        run: |
          npm install
          npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist # Vite 构建生成的静态文件目录
          branch: gh-pages # 自动推送到 gh-pages 分支展示
```

推送后，在仓库的 **Actions** 标签页即可看到实时部署进度。部署完成后，您就可以在 `https://<您的用户名>.github.io/look-and-write/` 打开专属于您孩子的“看图写话乐园”啦！

---

## 方式二：手动打包部署（几行命令极速上线 ⚡）

如果不想配置 Actions，可通过安装辅助部署工具直接在终端打包并上传：

1. **安装 `gh-pages` 工具**：
   ```bash
   npm install -D gh-pages
   ```
2. **在 `package.json` 中配置脚本**：
   打开 `package.json` 文件，在 `"scripts"` 中添加下面两行命令：
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. **一键发布**：
   确保您的项目已经关联了 GitHub 远程仓库，然后在终端直接运行：
   ```bash
   npm run deploy
   ```
   *该命令会自动为您构建静态包并在 GitHub 上创建 `gh-pages` 分支上传部署。*
4. **设置网页源**：
   进项目库 **Settings** -> **Pages**，在 **Build and deployment** -> **Source** 中，将分支（Branch）选择为 `gh-pages` -> `/root`，点击 **Save**。

稍等片刻，您专属的静态链接就能运行啦！祝写话愉快！🎈
