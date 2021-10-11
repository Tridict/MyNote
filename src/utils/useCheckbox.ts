import { ref, onBeforeUpdate } from 'vue'
import type { CheckboxInstance } from 'vant'

export const useCheckbox = () => {
  const checked = ref([])
  const checkboxRefs = ref<CheckboxInstance[]>([])
  const toggleCheckbox = (index: number) => {
    if (checkboxRefs.value[index]) {
      checkboxRefs.value[index]?.toggle()
    }
  }
  onBeforeUpdate(() => {
    checkboxRefs.value = []
  })

  return { checked, checkboxRefs, toggleCheckbox }
}
