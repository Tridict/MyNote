import { getTags, updateTag, createTag, delTag } from '@/api/tag'
import { createNoteTagMap, getTagsByNote } from '@/api/tag'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export interface Tag {
  id: number // 作为keys用的，不用于objId
  text: string
  color?: string
  objId: string
}

export const useTag = (postId: string) => {
  const tagList = ref<Tag[]>([])
  const allTagList = ref<Tag[]>([])
  const showPopInput = ref(false)
  const newTagName = ref('')

  // 获取标签列表
  const _getAllTags = async () => {
    const res = await getTags()
    allTagList.value = res.results.map((x, idx) => {
      return {
        id: idx,
        text: x.tagName,
        objId: x.objectId
      }
    })
  }

  // 获取某篇笔记的所有标签
  const _queryTagsByNote = async () => {
    const res = await getTagsByNote(postId)
    tagList.value = res.results.map((x, idx) => {
      return {
        id: idx,
        text: x.tagName,
        objId: x.objectId
      }
    })
  }

  // 初始化TagList
  const _init = async () => {
    await _queryTagsByNote()
    await _getAllTags()
  }

  // 从TagList中搜索Tag；若存在，return tagObj; 否则，return null
  const _filterByName = (tagName: string, array: Tag[]): Tag | null => {
    for (const x of array) {
      if (x.text == tagName) {
        console.log('yes!')
        return x
      }
    }
    console.log('no')
    return null
  }

  // 把已有的tag添加到笔记（根据tagName从allTagList中筛选）
  const _createMapByName = (tagName: string) => {
    const tagObj = _filterByName(tagName, allTagList.value)
    if (tagObj) {
      // 从笔记中新增该标签
      tagObj.color = '#7232dd'
      createNoteTagMap(tagObj.objId, postId)
      tagList.value.push(tagObj)
    }
  }

  // 创建一个tag到allTagList
  const handleCreateTag = async () => {
    const tagName = newTagName.value
    // 检查tagName是否重复
    const results = await createTag(tagName)

    console.log('新建标签完成，id为', results.objectId)

    // 把tagId信息存到allTagList中
    allTagList.value.push({
      id: allTagList.value.length + 1,
      text: tagName,
      objId: results.objectId
    })
    return results.objectId
  }

  // 创建一个tag到allTagList，并添加到笔记
  const handleAddTag = async () => {
    await handleCreateTag()

    // 建立新标签和笔记的关联
    _createMapByName(newTagName.value)
  }

  // 把选择的tag添加到笔记 / 从笔记中移除（未写）
  const handleSelectTag = (event: MouseEvent) => {
    const el = event.target as HTMLElement
    const tagName = el.innerText
    console.log(tagName)
    const obj = _filterByName(tagName, tagList.value)
    if (obj) {
      // 从笔记中移除该标签（删除相应的NoteTagMap）
      console.log(`从笔记中移除该标签: ${obj.text}`)
    } else {
      _createMapByName(tagName)
    }
  }

  // const handleDelTag = async (id: number) => {
  //   const tagId = tagList.value[id].objId
  //   await delTag(tagId)
  //   // tagList中移除对应项
  //   console.log('删除标签完成')
  // }

  // const handleRenameTag = async (id: number, newName: string) => {
  //   const tagId = tagList.value[id].objId
  //   await updateTag({ tagName: newName, tagId })
  //   // tagList中更新对应项的名称
  //   console.log('标签已更新完成')
  // }

  // const handleRemoveTagNote = () => {
  //   //
  //   console.log('移除文章的标签', postId)
  // }

  onMounted(_init)

  return {
    tagList,
    allTagList,
    showPopInput,
    newTagName,
    handleSelectTag,
    // handleCreateTag,
    handleAddTag
    // handleDelTag,
    // handleRenameTag,
    // handleRemoveTagNote
  }
}
