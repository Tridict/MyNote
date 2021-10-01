import * as LC from 'leancloud-storage'
import { Notify } from 'vant'

// 以下返回Promise<Object>应该是Promise<Note>
interface Note {
  objectId: string
}

const getData = (class="Note"): Promise<Object> => {
  return LC.CLASS(class).find()   //.orderBy(["createdAt", "updatedAt", "content"]).find()
  // return LC.CLASS(class).include().orderBy().find()
}

const addData = (noteId: string, content: string): Promise<Object> => {
  const note = { content, owner: getUser() }
  return LC.CLASS("Note").add(note).then((x) => {
    Notify('success', `成功创建笔记「${x.objectId}」`, 500)
    return LC.CLASS("Note").object(x.objectId).get()
  })
}

const updateData = (noteId: string, content: string): Promise<Object> => {
  const note = {content, owner: getUser()}
  return LC.CLASS("Note").object(noteId).update(note).then((x) => {
    Notify('success', `成功更新笔记「${x.objectId}」`, 500)
    return LC.CLASS("Note").object(x.objectId).get()
  })
}

// 获取公众号文章
// interface Result {
// meta: []
// content: []
// }

// const getGzh = (paramsJson): Promise<Result> => {
//   return LC.Cloud.run('spy', paramsJson)
// }

// signup().then(successHandle).catch(errorHandle)
