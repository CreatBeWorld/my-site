import Home from '@/views/Home'
import About from '@/views/About'
import Blog from '@/views/Blog'
import Message from '@/views/Message'
import Project from '@/views/Project'
import BlogDetail from "@/views/Blog/BlogDetail"
//路由匹配规则
export default [{
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/about',
    component: About,
    name: 'About', //设置路由名字
  },
  {
    path: '/article',
    component: Blog,
    name: 'Blog',
  },
  {
    path: '/article/cate/:categoryId', //动态路由，其中变化的部分被称为params
    component: Blog,
    name: 'CategoryBlog',
  },
  {
    path: '/message',
    component: Message,
    name: 'Message',
  },
  {
    path: '/project',
    component: Project,
    name: 'Project',
  },
  {
    path: "/article/:id",
    name: "BlogDetail",
    component: BlogDetail
  }
]