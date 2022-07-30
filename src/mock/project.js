import Mock from "mockjs";
Mock.mock("/api/project", "get", {
  code: 0,
  msg: "",
  "data|5-15": [{
    id: "@guid",
    name: "@ctitle",
    "url|1": ["@url", ""],
    "github|1": ["@url", ""],
    "description|1-4": ["@cparagraph(3,8)"],
    thumb: "@image(150x120,@color,#fff,@natural)",
    "order|+1":1
  }]
})