import Home from '@/views/Home'
import About from '@/views/About'
import Blog from '@/views/Blog'
import Message from '@/views/Message'
import Project from '@/views/Project'
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
    path: '/message',
    component: Message,
    name: 'Message',
  },
  {
    path: '/project',
    component: Project,
    name: 'Project',
  }
]