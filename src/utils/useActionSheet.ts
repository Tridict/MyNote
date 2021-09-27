import { ref } from 'vue'

const useEditorOptions = () => {
  const showMore = ref(false)
  const onInput = () => {
    console.log('导入笔记')
  }
  const onOutput = () => {
    console.log('导出笔记')
  }
  const options = [
    {
      name: '导入笔记',
      subname: '导入笔记将覆盖您当前输入的内容',
      callback: onInput
    },
    {
      name: '导出笔记',
      callback: onOutput
    }
  ]

  return {
    showMore,
    options
  }
}

// const useUploaderOptions = () => {
//   const showMore = ref(false)
//   const onInput = () => {
//     console.log('导入笔记')
//   }
//   const options = [
//     {
//       name: '导入笔记',
//       subname: '导入笔记将覆盖您当前输入的内容',
//       callback: onInput
//     },
//     { name: '导出笔记' }
//   ]

//   return {
//     showMore,
//     options
//   }
// }

export { useEditorOptions }
