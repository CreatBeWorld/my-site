import request from "./request";
export async function commitMessage(data) {
  return await request.post("/api/message",data);
}
export async function getMessage(page=1, limit=10) {
  return await request.get("/api/message", {
    params:{page,limit}
  })
}