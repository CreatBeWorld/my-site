import request from "./request";
//获取所有博客分类
export async function getBlogTypes() {
  return await request.get('/api/blogtype')
}
//分页获取博客
export async function getBlogs(params) {
  const page = params.page || 1;
  const limit = params.limit || 10
  const categoryId = params.categoryId || -1
  return await request.get('/api/blog', {
    params: {
      page,
      limit,
      categoryId,
    }
  })
}
//获取单个博客
export async function getSingleBlog(id) {
  return await request.get(`/api/blog/${id}`)
}
//提交评论
export async function commitComment(data) {
  return await request.post('/api/comment', data)
}
//分页获取评论
export async function getComments(blogid = -1, page = 1, limit = 10) {
  return await request.get('/api/comment', {
    params: {
      blogid,
      page,
      limit,
    }
  })
}