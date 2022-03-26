<template>
  <!-- <div>
    <input v-model="isDarkMode" /> -->
    <VueEditor :editor="editor" />
  <!-- </div> -->
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import { Editor, rootCtx, defaultValueCtx, themeManagerCtx } from '@milkdown/core' // 等下个版本才有themeManagerCtx
import { VueEditor, useEditor } from '@milkdown/vue'

// optional
import { nordDark, nordLight } from '@milkdown/theme-nord'

// plugins
import { gfm } from '@milkdown/preset-gfm'
import { clipboard } from '@milkdown/plugin-clipboard'
import { cursor } from '@milkdown/plugin-cursor'
import { diagram } from '@milkdown/plugin-diagram'
import { emoji } from '@milkdown/plugin-emoji'
import { history } from '@milkdown/plugin-history'
import { indent } from '@milkdown/plugin-indent'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { math } from '@milkdown/plugin-math'
import { menu } from '@milkdown/plugin-menu'
import { prism } from '@milkdown/plugin-prism'
import { slash } from '@milkdown/plugin-slash'
import { tooltipPlugin, tooltip } from '@milkdown/plugin-tooltip'

const props = defineProps<{
  defaultText: string
}>()

const emit = defineEmits<{
  (e: 'input', text: string): void
}>()

const isDarkMode = ref(true)
const editorReady = ref(false)
const editorRef2 = ref<Editor | null>(null)
// const editorRef = ref<EditorRef>({ get: () => undefined, dom: () => null })

const setEditorReady = (isReady: boolean) => {
  editorReady.value = isReady
}

const editor = useEditor((root) =>
  editorRef2.value = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, props.defaultText)
      ctx.get(listenerCtx)
        .markdownUpdated((ctx, markdown, prevMarkdown) => {
          emit('input', markdown)
        })
        .mounted((ctx)=>{
          setEditorReady(true)
        })
    })
    .use(nordLight)
    .use(gfm)
    .use(clipboard)
    .use(listener)
    .use(history)
    .use(cursor)
    .use(prism)
    .use(emoji)
    .use(math)
    .use(diagram)
    .use(indent)
    .use(slash)
    .use(
      // tooltip
      tooltip.configure(tooltipPlugin, {
        link: {
          placeholder: 'Please input link...',
          buttonText: 'Confirm'
        },
        image: {
          placeholder: 'Please input image link...',
          buttonText: 'OK'
        },
        inlineMath: {
          placeholder: 'Please input inline math...'
        }
      })
    )
    .use(menu())
)

const switchDarkMode = () => {
  if (!editorReady.value) return;
  const editor = editorRef2.value
  if (!editor) return
  editor.action((ctx) => {
    if (!themeManagerCtx) {
      console.log('没有themeManagerCtx')
      return
    }
    const themeManager = ctx.get(themeManagerCtx)
    themeManager.switch(ctx, isDarkMode.value ? nordDark : nordLight)
  })
}

watch(isDarkMode, switchDarkMode)

const code = {
  light: 'https://unpkg.com/prism-themes/themes/prism-material-light.css',
  dark: 'https://unpkg.com/prism-themes/themes/prism-nord.css'
}

const getStyleLink = () => {
  const target = document.querySelector('#prism-theme')

  if (target) {
    return target
  }

  const link = document.createElement('link')
  link.id = 'prism-theme'
  link.setAttribute('rel', 'stylesheet')
  document.head.appendChild(link)
  return link
}

const target = getStyleLink()
target.setAttribute('href', isDarkMode.value ? code.dark : code.light)
</script>

<style lang="scss">
.milkdown {
  .bullet-list {
    list-style: disc;
    padding-left: 2rem;
  }
  .ordered-list {
    list-style: auto;
    padding-left: 2rem;
  }
}
</style>
