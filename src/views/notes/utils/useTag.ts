import { getAllTags, updateTag, createTag, delTag } from '@/api/tag'
import {
  createNoteTagMap,
  queryNoteTagMap,
  queryTagsByNote,
  delNoteTagMap
} from '@/api/noteTagMap'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export const TAG_COLOR_EXIST = '#7232dd'

export interface Tag {
  id: number // 作为keys用的，不用于objId
  text: string
  color?: string
  objId: string
}

// 获取某篇笔记的所有标签
export const getTagsByNote = async (noteId: string) => {
  const res = await queryTagsByNote(noteId)
  return res.results.map((x, idx) => {
    return {
      id: idx,
      text: x.tagName,
      objId: x.objectId
    }
  })
}

// 获取标签列表
export const useTagList = () => {
  const allTagList = ref<Tag[]>([])

  const _getAllTags = async () => {
    const res = await getAllTags()
    allTagList.value = res.results.map((x, idx) => {
      return {
        id: idx,
        text: x.tagName,
        objId: x.objectId
      }
    })
  }

  _getAllTags()

  return { allTagList }
}

export const useTag = (postId: string) => {
  const tagList = ref<Tag[]>([])
  const { allTagList } = useTagList()
  const showPopInput = ref(false)
  const newTagName = ref('')

  // 初始化TagList
  const _init = async () => {
    // 获取标签列表
    // allTagList.value = await getAllTagList()
  }

  // 从TagList中搜索Tag；若存在，return tagObj; 否则，return null
  const _filterByName = (tagName: string, array: Tag[]): Tag | null => {
    for (const x of array) {
      if (x.text == tagName) {
        return x
      }
    }
    return null
  }

  // 把已有的tag添加到笔记（根据tagName从allTagList中筛选）
  const _createMapByName = (tagName: string) => {
    const tagObj = _filterByName(tagName, allTagList.value)
    if (tagObj) {
      // 从笔记中新增该标签
      tagObj.color = TAG_COLOR_EXIST
      createNoteTagMap(tagObj.objId, postId)
      tagList.value.push(tagObj)
    }
  }

  // 移除tag和笔记的关联（根据tagName从allTagList中筛选）
  const _delMapByName = async (tagName: string) => {
    // 查询tagId
    const tagObj = _filterByName(tagName, allTagList.value)
    if (tagObj) {
      // 从笔记中移除该标签
      // 先移除颜色
      tagObj.color = undefined
      // 查找对应的mapId
      const results = await queryNoteTagMap({
        where: JSON.stringify({
          tag: {
            __type: 'Pointer',
            className: 'Tag',
            objectId: tagObj.objId
          },
          note: {
            __type: 'Pointer',
            className: 'Note',
            objectId: postId
          }
        })
      })
      // 删除map
      delNoteTagMap(results.results[0].objectId)
      // 从tagList中移除（使用原地操作保持使用引用值，实时更新父元素中的列表）
      for (const i in tagList.value) {
        if (tagList.value[i].text === tagName) {
          tagList.value.splice(+i, 1)
        }
      }
      // tagList.value = tagList.value.filter((x) => x.text !== tagName)
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
    const tagName = el.textContent || el.innerText
    console.log('tagName', tagName)
    const obj = _filterByName(tagName, tagList.value)
    if (obj) {
      _delMapByName(tagName)
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
