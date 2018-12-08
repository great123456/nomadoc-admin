
let API_PATH = '/admin'


if (process.env.NODE_ENV === 'development') {

} else if (process.env.NODE_ENV === 'production') {
  // baseUrl = 'http://cangdu.org:8001'
}

export {
  API_PATH
}
