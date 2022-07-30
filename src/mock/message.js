import Mock from "mockjs";
import qs from "query-string";
Mock.mock("/api/message", "post", {
  code: 0,
  msg: "",
  data: {
    id: "@guid",
    nickname: "@cname",
    content: "@cparagraph(1, 10)",
    createDate: Date.now(),
    "avatar|1": [
      "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar2.jpg",
      "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar4.jpg",
      "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar6.jpg",
      "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar8.jpg",
    ],
  },
});
Mock.mock(/^\/api\/message(\?.+)?$/, "get", (options) => {
  const limit = qs.parse(
    options.url.substring(options.url.indexOf("?") + 1)
  ).limit;
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      total: 52,
      [`rows|${limit}`]: [
        {
          id: "@guid",
          nickname: "@cname",
          content: "@cparagraph(1,10)",
          createDate: "@date(T)",
          "avatar|1": [
            "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar2.jpg",
            "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar4.jpg",
            "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar6.jpg",
            "https://xsj-site.oss-cn-chengdu.aliyuncs.com/img/avatar8.jpg",
          ],
        },
      ],
    },
  });
});
