import { ref, computed, onBeforeMount, Ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, Notify } from 'vant'
import { decode } from 'js-base64'
import { VantFile } from '@/types'
import useFile from '@/utils/useFile'
import { getQueryParams } from '@/utils/urlQuery'
import {
  getNote,
  updateNote,
  createNote,
  delNote,
  publicNote,
  pinnedNote
} from '@/api/notes'

export const useText = (mode: Ref<'edit' | 'preview' | 'editable'>) => {
  const BEGIN_TEXT = '## 在此编辑您的内容' //记录初始文本，如果没有修改，则不需要保存
  let saveText = '' //记录上次保存的内容，如果有本地内容未保存，则在退出时候给提示
  const text = ref('')
  const postId = ref('')
  const { fileMetaList, onImportFiles } = useFile()
  const router = useRouter()
  const status = reactive({
    isImporting: false,
    isSaving: false,
    isPublicing: false,
    isPinning: false
  })

  const saveFileName = computed(() => {
    const title = text.value.split('\n')[0]
    if (title[0] == '#') {
      return title.replace(/#+ /g, '')
    } else {
      return title
    }
  })

  const importNote = async (file: VantFile) => {
    status.isImporting = true
    await onImportFiles(file)
    const result = fileMetaList.value[0]?.content
    if (result) {
      text.value = result
    } else {
      Notify('读取文件出现错误')
    }
    status.isImporting = false
  }

  const handleSave = async () => {
    status.isSaving = true
    // 保存
    try {
      if (postId.value) {
        await updateNote({ noteContent: text.value, postId: postId.value })
      } else {
        // 还没有postId，新建笔记
        const res = await createNote(text.value)
        postId.value = res.objectId
        router.replace('/post?id=' + postId.value)
      }
      saveText = text.value
      Notify({ type: 'success', message: `保存成功`, duration: 800 })
      // 返回
      // if (setting.backhandleSave) {
      // router.push('/notes')
      // }
    } catch (error) {
      Notify(`保存失败：${error}`)
    }
    status.isSaving = false
  }

  const deleteNote = () => {
    // 确认删除的回调
    const deletingNote = (action: string): Promise<boolean> =>
      new Promise((resolve) => {
        if (action === 'confirm') {
          if (postId.value) {
            delNote(postId.value)
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
      title: '确定要删除笔记吗？',
      message: '该操作不可恢复',
      beforeClose: deletingNote
    })
  }

  const handlePublic = async () => {
    status.isPublicing = true
    try {
      if (postId.value) {
        await publicNote(postId.value)
        Notify({ type: 'success', message: `笔记已公开` })
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
      if (postId.value) {
        await pinnedNote(postId.value)
        Notify({ type: 'success', message: `笔记置顶成功`})
      } else {
        Notify(`请先保存笔记`)
      }
    } catch (error) {
      Notify(`${error}`)
    }
    status.isPinning = false
  }

  const checkIfSaved = async () => {
    if (text.value == BEGIN_TEXT || text.value == saveText) {
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

  onBeforeMount(async () => {
    const objId = getQueryParams('id')
    if (objId) {
      postId.value = objId
      try {
        const result = await getNote(objId)
        // router.replace('/post')
        text.value = decode(result.content)
        saveText = text.value
      } catch (error) {
        console.log(error)
        router.replace('/notes')
        Notify(`${error}`)
      }
    } else {
      mode.value = 'edit'
      text.value = BEGIN_TEXT
    }
  })

  // 目前仅实现了在文末加文字的功能...（需要知道光标位置？）
  // const addText = (txt = '### 这是一个**可爱的**三级标题哦！') => {
  //   text.value += '\n' + txt
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
    text,
    saveFileName,
    status,
    handlePin,
    handlePublic,
    handleSave,
    deleteNote,
    importNote,
    checkIfSaved
  }
}
