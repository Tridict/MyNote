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

// 微信公众号文章相关配置
const WeSettings = {
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

// 掘金文章相关配置
const JuejinSettings = {
  meta: [
    {
      selector: 'h1.article-title',
      output_map: { class: 'meta', meta_key: 'title', meta_value: '__text' }
    },
    {
      selector: '.author-name',
      output_map: {
        class: 'meta',
        meta_key: 'author',
        meta_value: '@content'
      }
    }
  ],
  content: [
    {
      selector: '.article-content',
      output_map: {
        class: 'article_field',
        meta_key: 'abstract',
        meta_value: '__text_abstract'
      }
    }
  ]
}

// 分析公众号文章链接
export const spy = (url: string): Promise<SpyRes> => {
  return axios.post(`/1.1/functions/spy`, {
    url,
    setting: WeSettings
  })
}

// 分析掘金文章链接
export const spyJuejin = (url: string): Promise<SpyRes> => {
  return axios.post(`/1.1/functions/spy`, {
    url,
    setting: JuejinSettings
  })
}
