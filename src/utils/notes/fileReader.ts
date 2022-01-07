interface FileMeta {
  obj: File
  name: string
  hasRead: boolean
  encodingGot: boolean
  encoding: string
  content?: string
}

interface Options {
  accept?: string
}

const readFileAsText = (
  fileWrap: FileMeta,
  options?: Options
): Promise<FileReader> => {
  const file = fileWrap.obj
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader)
    }
    reader.onerror = reject

    if (options?.accept && !new RegExp(options?.accept).test(file.type)) {
      reject({
        code: 1,
        msg: 'wrong file type'
      })
    }

    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file, fileWrap.encoding)
    } else {
      reader.readAsDataURL(file)
    }
  })
}

async function readFile(file: FileMeta, options?: Options): Promise<void> {
  const reader = await readFileAsText(file, options)
  if (typeof reader.result == 'string') {
    file.content = reader.result
  }
  file.hasRead = true
}

export default readFile
