import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar.jfif",
    siteTitle: "我的个人空间",
    github: "https://github.com/CreatBeWorld",
    qq: "466840028",
    qqQrCode: "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/qq.png",
    weixin: "13870829832",
    weixinQrCode: "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/weixin.png",
    mail: "xsj20@outlook.com",
    icp: "黑ICP备17001719号",
    githubName: "CreatBeWorld",
    favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
  }
})