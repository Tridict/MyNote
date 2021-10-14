import { computed, onBeforeMount, Ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, Notify } from 'vant'
import { decode } from 'js-base64'
import { VantFile } from '@/types'
import store from '@/utils/stores'
import useFile from '@/utils/notes/useFile'
import { getQueryParams } from '@/utils/urlQuery'
import {
  getNote,
  updateNote,
  createNote,
  delNote,
  makePublicNote,
  cancelPublicNote,
  pinnedNote
} from '@/api/notes'

export const useText = (mode: Ref<'edit' | 'preview' | 'editable'>) => {
  const BEGIN_TEXT = '## 在此编辑您的内容' //记录初始文本，如果没有修改，则不需要保存
  let saveText = '' //记录上次保存的内容，如果有本地内容未保存，则在退出时候给提示
  const postInfo = reactive({
    content: '',
    // createdAt: '',
    // deleted: boolean,
    // isDraft: boolean,
    isPublicRead: false,
    isPublicWrite: false,
    pinned: false,
    tags: [''],
    postId: '',
    canWrite: true
    // updatedAt: string
  })
  const status = reactive({
    isImporting: false,
    isSaving: false,
    isPublicing: false,
    isPinning: false
  })
  const { fileMetaList, onImportFiles } = useFile()
  const router = useRouter()

  const init = async () => {
    const objId = getQueryParams('id')
    if (objId) {
      postInfo.postId = objId
      try {
        const result = await getNote(objId)
        postInfo.content = decode(result.content)
        postInfo.isPublicRead = result.isPublicRead || false
        postInfo.isPublicWrite = result.isPublicWrite || false
        postInfo.pinned = result.pinned || false
        postInfo.tags = result.tags || ['']
        saveText = postInfo.content

        // 若该笔记是公开只读的，判断是否为笔记owner
        if (postInfo.isPublicRead && !postInfo.isPublicWrite) {
          postInfo.canWrite =
            result.owner.objectId === store.get('LcUserInfo')?.objectId
        }
      } catch (error) {
        console.log(error)
        router.replace('/notes')
        Notify(`${error}`)
      }
    } else {
      mode.value = 'edit'
      postInfo.content = BEGIN_TEXT
    }
  }

  const importNote = async (file: VantFile) => {
    status.isImporting = true
    await onImportFiles(file)
    const result = fileMetaList.value[0]?.content
    if (result) {
      postInfo.content = result
      postInfo.postId = ''
      router.replace('/post')
    } else {
      Notify('读取文件出现错误')
    }
    status.isImporting = false
  }

  const saveNote = async () => {
    status.isSaving = true
    // 保存
    try {
      if (postInfo.postId) {
        await updateNote({
          noteContent: postInfo.content,
          postId: postInfo.postId
        })
      } else {
        // 还没有postId，新建笔记
        const res = await createNote(postInfo.content)
        postInfo.postId = res.objectId
        router.replace('/post?id=' + postInfo.postId)
      }
      saveText = postInfo.content
      Notify({ type: 'success', message: `保存成功`, duration: 800 })
      status.isSaving = false
      return true
    } catch (error) {
      Notify(`保存失败：${error}`)
      status.isSaving = false
      return false
    }
  }

  const deleteNote = () => {
    // 确认删除的回调
    const deletingNote = (action: string): Promise<boolean> =>
      new Promise((resolve) => {
        if (action === 'confirm') {
          if (postInfo.postId) {
            delNote(postInfo.postId)
              .then(() => {
                Notify({ type: 'success', message: `操作成功：笔记已删除` })
                router.push('/notes')
              })
              .catch((error) => {
                Notify(`删除失败：${error}`)
              })
              .finally(() => {
                resolve(true)
              })
          } else {
            Notify(`删除失败：笔记未保存，不需要删除`)
            resolve(true)
          }
        } else {
          // 拦截取消操作
          resolve(true)
        }
      })

    // 首先弹出窗口确认是否要删除
    Dialog.confirm({
      title: '文件删除后将无法恢复',
      // message: '文件删除后将无法恢复',
      confirmButtonText: '删除',
      beforeClose: deletingNote
    })
  }

  const comfirmPublicWrite = async () => {
    try {
      await Dialog.confirm({
        message: '请选择其他用户对该笔记的权限',
        confirmButtonText: '编辑',
        cancelButtonText: '只读'
      })
      return true
    } catch {
      return false
    }
  }

  const handlePublic = async () => {
    status.isPublicing = true
    try {
      if (postInfo.postId) {
        if (postInfo.isPublicRead) {
          await cancelPublicNote(postInfo.postId)
          postInfo.isPublicWrite = false
        } else {
          const editable = await comfirmPublicWrite()
          await makePublicNote(postInfo.postId, editable)
          if (editable) {
            postInfo.isPublicWrite = true
          }
        }
        const msg = postInfo.isPublicRead ? `取消公开` : `公开`
        postInfo.isPublicRead = !postInfo.isPublicRead
        Notify({ type: 'success', message: `操作成功：笔记已${msg}` })
      } else {
        Notify(`请先保存笔记`)
      }
    } catch (error) {
      Notify(`${error}`)
    }
    status.isPublicing = false
  }

  const handlePin = async () => {
    status.isPinning = true
    try {
      if (postInfo.postId) {
        await pinnedNote(postInfo.postId, postInfo.pinned)
        const msg = postInfo.pinned ? `取消置顶` : `置顶`
        postInfo.pinned = !postInfo.pinned
        Notify({ type: 'success', message: `操作成功：笔记已${msg}` })
      } else {
        Notify(`请先保存笔记`)
      }
    } catch (error) {
      Notify(`${error}`)
    }
    status.isPinning = false
  }

  const handleAddtag = () => {
    console.log('新建标签')
  }

  const checkIfSaved = async () => {
    if (postInfo.content == BEGIN_TEXT || postInfo.content == saveText) {
      return true
    } else {
      try {
        await Dialog.confirm({
          title: '确认返回吗？',
          message: '笔记不会自动保存哦'
        })
        return true
      } catch {
        return false
      }
    }
  }

  const saveFileName = computed(() => {
    const title = postInfo.content.split('\n')[0]
    if (title[0] == '#') {
      return title.replace(/#+ /g, '')
    } else {
      return title
    }
  })

  onBeforeMount(init)

  // 目前仅实现了在文末加文字的功能...（需要知道光标位置？）
  // const addText = (txt = '*') => {
  //   postInfo.content += '\n' + txt
  // }

  // 官方提供的例子
  // selected 为当前选中的文本
  // editor.insert((selected) => {
  //   const prefix = '**'
  //   const suffix = '**'
  //   const content = selected || '粗体'

  //   return {
  //     // 要插入的文本
  //     text: `${prefix}${content}${suffix}`,
  //     // 插入后要选中的文本
  //     selected: content
  //   }
  // })

  return {
    saveFileName,
    postInfo,
    status,
    handleAddtag,
    handlePin,
    handlePublic,
    saveNote,
    deleteNote,
    importNote,
    checkIfSaved
  }
}
