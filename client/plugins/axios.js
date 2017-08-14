import Vue from 'vue'
import axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.SERVER_BUILD) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

axios.create(options)
Vue.prototype.$http = axios
// export default axios.create(options)
