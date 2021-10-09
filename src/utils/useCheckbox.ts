import { ref, onBeforeUpdate } from 'vue'

export const useCheckbox = () => {
  const checked = ref([])
  const checkboxRefs = ref([])
  const toggleCheckbox = (index: number) => {
    if (checkboxRefs.value[index]) {
      checkboxRefs.value[index].toggle()
    }
  }
  onBeforeUpdate(() => {
    checkboxRefs.value = []
  })

  return { checked, checkboxRefs, toggleCheckbox }
}
