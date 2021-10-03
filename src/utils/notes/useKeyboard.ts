import { ref, onMounted } from 'vue'

const useKeyboard = () => {
  const editorHeight = ref('calc(100vh - var(--van-nav-bar-height))')
  const isKeyboard = ref(false)
  const editor = ref(null) // html element?

  const onScroll = () => {
    if (isKeyboard.value) {
      console.log('滚动啦')
      // const value = document.documentElement.clientHeight - window.innerHeight
      // addText('clientHeight-innerHeight ' + value)
      // addText('scrollTop ' + document.documentElement.scrollTop)
      // toolbar.value.style = `bottom: ${
      //   value - document.documentElement.scrollTop
      // }px; top: auto`
      // toolbar.value.style = `top: ${window.innerHeight - 41}px; bottom: auto;`
      // toolbar.value.style = `bottom: 0`
    }
  }

  // const scrollTo = () => {
  //   // toolbar2.value.scrollIntoView()  // 实验中的功能，不起效果
  //   // window.scrollTo(0, currentTop)
  //   document.documentElement.scrollTop = 0
  // }

  const onKeyboard = () => {
    setTimeout(() => {
      isKeyboard.value = true
      editorHeight.value = '50vh'
      // editorHeight.value = `calc(100vh - var(--van-nav-bar-height) - ${
      //   document.documentElement.clientHeight - window.innerHeight
      // }px)`
      // toolbar.value.style = `bottom: ${
      //   document.documentElement.clientHeight -
      //   window.innerHeight -
      //   document.documentElement.scrollTop
      // }px; top: auto;`
      // toolbar.value.style = `top: ${window.innerHeight - 41}px; bottom: auto;`
      // 呈现吸底的toolbar
      // editor.value.appendChild(toolbar.value)
      // editor.value.style = `height: calc(100vh - ${
      //   document.documentElement.clientHeight - window.innerHeight
      // }px)`
    }, 300)
  }

  const offKeyboard = () => {
    setTimeout(() => {
      // 隐藏toolbar
      // toolbar.value.style = 'display: none'
      isKeyboard.value = false
      editorHeight.value = 'calc(100vh - var(--van-nav-bar-height))'
    }, 300)
  }

  onMounted(() => {
    const tt = document.querySelector('.CodeMirror-code')
    if (tt !== null) {
      tt.addEventListener('focus', onKeyboard)
      tt.addEventListener('blur', offKeyboard)
    }
    if (editor.value != null) {
      console.log(editor.value)
      // toolbar.value = document.querySelector('.v-md-editor__toolbar')
      editor.value.addEventListener('scroll', onScroll)
    }
    // 隐藏toolbar
    // toolbar.value.style = 'display: none'
  })

  return { editorHeight }
}
