import { ref } from 'vue'

const useActionSheet = () => {
  const showMore = ref(false)
  const options = [
    {
      name: '导入笔记',
      subname: '导入笔记将覆盖您当前输入的内容',
      callback: onInput
    },
    { name: '导出笔记' }
  ]
  const onInput = () => {
    console.log('导入笔记')
  }

  return {
    showMore,
    options
  }
}

export default useActionSheet
