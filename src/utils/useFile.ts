import readFile from '@/utils/fileReader'
import { ref } from 'vue'
import { Notify } from 'vant'

interface FileMeta {
  obj: File
  name: string
  hasRead: boolean
  encodingGot: boolean
  encoding: string
  content?: string
}

// 提供fileMetaList
const useFile = () => {
  const fileMetaList = ref<FileMeta[]>([])
  const onImportFiles = (file: any) => {
    // 默认的input框处理
    if (file instanceof FileList) {
      readFileLists(file, fileMetaList.value)
    }
    // 接入vant-ui
    else if (file.file instanceof File) {
      readFileLists(file.file, fileMetaList.value)
    } else {
      console.log(file)
      // file.map((x: { content: string; file: File; message: string; status }) => {
      //   console.log(x)
      // })
    }
  }
  // const onImportFiles = (fileList: FileList | File) => {
  //   readFileLists(fileList, fileMetaList.value)
  // }
  const onDropFile = (event: DragEvent) => {
    event.preventDefault()

    if (event.type == 'drop') {
      const fileList = event.dataTransfer?.files
      if (fileList) {
        readFileLists(fileList, fileMetaList.value)
      }
    }
  }
  const onRemoveFile = (idx: number) => {
    fileMetaList.value.splice(idx, 1)
  }

  return { fileMetaList, onImportFiles, onDropFile, onRemoveFile }
}

const readFileLists = (fileList: FileList | File, fileMetaList: FileMeta[]) => {
  let files: FileList | File[] = []
  if (fileList instanceof File) {
    files = [fileList]
  }
  // 把文件保存为对象
  for (const file of files) {
    if (fileMetaList.map((f) => f.name).includes(file.name)) {
      Notify(`文件【${file.name}】重复。`)
    } else {
      // 用一个对象保存文件的meta信息
      fileMetaList.push({
        obj: file,
        name: file.name,
        hasRead: false,
        encodingGot: false,
        encoding: 'utf-8'
      })
    }
  }
  // 读取文件内容
  for (const file of fileMetaList) {
    if (file.hasRead) continue
    readFile(file).catch(({ error }) => {
      Notify({ type: 'warning', message: `${error}`, duration: 5000 })
    })
  }
}

export default useFile