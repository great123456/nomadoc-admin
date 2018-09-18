import axios from 'axios'
import router from '@/router'
import qs from 'qs'

// http request 拦截器
axios.interceptors.request.use((config) => {
  if (localStorage.getItem('admin-token')) {
    config.headers['Authorization'] = `bearer ${localStorage.getItem('admin-token')}`
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
   }
   return config
}, (error) => {
  // _.toast('错误的传参', 'fail')
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  if (response.data.code !== 'undefined') {
    switch(response.data.code){
      case 401:
        router.replace({
            path: '/login'
        })
        break
    }
    return response
  } else {
    return response
  }
}, error => {
  if (error.response) {
    
  }
  return Promise.reject(error.response.data) // 返回接口返回的错误信息
})

// fetch 类似于 Ajax
export default function fetch (url, params, method) {
  let requestConfig = {
    method: method || 'GET',
    url: url
  }

  if (requestConfig.method === 'GET') {
    requestConfig.params = params
  } else {
    requestConfig.data = params
  }

  return new Promise((resolve, reject) => {
    axios(requestConfig)
    .then(response => {
      resolve(response.data)
    }, err => {
      resolve(err)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
