import Axios from 'axios'
import { Message, Loading  } from 'element-ui';
import router from '../router'

let loading;
Axios.interceptors.request.use(config => {
  let token =sessionStorage.getItem('token');
  if(token){
    config.headers.common['Authorization']='Bearer ' + token;
  }
  // loading = Loading.service({
  //   text: '数据加载中……'
  // })
  return config;
}, error => {  //请求错误处理
  Message.error(error);
  Promise.reject(error)
});

Axios.interceptors.response.use(
  response => {  //成功请求到数据
    // loading.close();
      //这里根据后端提供的数据进行对应的处理
      if (response.data.code === 0) {
          return response.data;
      } else {
        Message.error(response.data.retDsc);
      }
  },
  err => {  //响应错误处理
    // loading.close();
    if (err && err.response) {
      switch (err.response.status) {
        case 400: err.message = '请求错误(400)'; break;
        case 401:
          err.message = '用户验证失败，请重新登录';
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userInfo');
          router.push('/')
          break;
        case 403: err.message = '拒绝访问(403)'; break;
        case 404: err.message = '请求出错(404)'; break;
        case 408: err.message = '请求超时(408)'; break;
        case 500: err.message = '服务器错误(500)'; break;
        case 501: err.message = '服务未实现(501)'; break;
        case 502: err.message = '网络错误(502)'; break;
        case 503: err.message = '服务不可用(503)'; break;
        case 504: err.message = '网络超时(504)'; break;
        case 505: err.message = 'HTTP版本不受支持(505)'; break;
        default: err.message = `连接出错(${err.response.status})!`;
      }
    } else {
        err.message = '连接服务器失败!'
    }
    Message.error( err.message );
    return Promise.reject(err)
  }
);
export default Axios;