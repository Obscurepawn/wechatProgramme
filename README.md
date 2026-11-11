# My Time Capsule

微信原生小程序练习项目，包含账本与日记首页、日记编辑界面，以及“历史上的今天”查询页面。项目配置中的名称为 `timeCapsule`。

## 本地预览

1. 克隆本仓库，在微信开发者工具中导入仓库根目录；该目录包含 [project.config.json](project.config.json) 和 [app.json](app.json)。
2. 选择你有权限使用的小程序 AppID。仓库内的 AppID 属于原项目，不能代替开发者账号权限。
3. 编译后默认进入 `pages/auth/auth` 授权页。若只查看界面，可在开发者工具的编译模式中将启动页面设为 `pages/mainPage/mainPage` 或 `pages/diary/diary`。

项目直接使用 JavaScript、WXML 和 WXSS，没有 npm 构建步骤。配置记录的基础库版本为 `2.10.4`；授权页使用 `wx.getUserInfo` 和 `open-type="getUserInfo"`，接入账号前需核对所选基础库的接口支持情况。

## 页面与当前状态

| 目录 | 内容 |
| --- | --- |
| [pages/auth](pages/auth) | 授权入口与首页跳转 |
| [pages/mainPage](pages/mainPage) | 账本、日记时间轴；当前展示代码内的样例数据 |
| [pages/diary](pages/diary) | 日记输入、字号、颜色和选图交互；保存流程尚未完成 |
| [pages/cashBook](pages/cashBook) | 账本页面占位 |
| [pages/hisSearch](pages/hisSearch)、[pages/history](pages/history) | 历史事件查询及结果页面 |
| [pages/bottomMenu](pages/bottomMenu) | 底部菜单界面 |
| [images](images)、[utils](utils) | 图片资源与公共工具 |

历史查询代码包含外部 HTTP 服务地址，仓库没有配套后端。联调前需替换为自己可用的服务配置，并配置请求域名；本地界面预览不代表查询接口已可用。日记与账本目前也没有完整的数据持久化流程。
