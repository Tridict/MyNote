
import axios from '@/api'

interface SpyRes {
  result: {
    content: {
      class: string
      meta_key: string
      meta_value: string
    }[]
    meta: {
      class: string
      meta_key: string
      meta_value: string
    }[]
  }
}


// 分析公众号文章链接
export const spy = (url: string): Promise<SpyRes> => {
  return axios.post(`/1.1/functions/spy`, {
    url,
    setting: {
      meta: [
        {
          selector: 'h1#activity-name',
          output_map: { class: 'meta', meta_key: 'title', meta_value: '__text' }
        },
        {
          selector: 'h2#activity-name',
          output_map: { class: 'meta', meta_key: 'title2', meta_value: '__text' }
        },
        // {
        //   selector: 'meta[property=og:title]',
        //   output_map: { class: 'meta', meta_key: 'title3', meta_value: '__text' }
        // },
        {
          selector: '#profileBt #js_name',
          output_map: {
            class: 'meta',
            meta_key: 'channel',
            meta_value: '__text'
          }
        },
        {
          selector: 'meta[name=author]',
          output_map: {
            class: 'meta',
            meta_key: 'author',
            meta_value: '@content'
          }
        },
        {
          selector: 'meta[name=description]',
          output_map: {
            class: 'meta',
            meta_key: 'description',
            meta_value: '@content'
          }
        }
      ],
      content: [
        {
          selector: '#js_content',
          output_map: {
            class: 'article_field',
            meta_key: 'abstract',
            meta_value: '__text_abstract'
          }
        }
      ]
    }
  })
}
