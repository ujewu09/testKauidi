import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5';
import router from '../router'
import { Message } from 'iview'

export const baseURL = 'http://api.paibaoex.com/Website'  // 上传用这个
// export const baseURL = 'http://39.99.246.93:8881/Website'

const api = 'http://api.paibaoex.com'


localStorage.setItem('url',baseURL)
localStorage.setItem('api',api)

export const http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  withCredentials: false,
  transformRequest: [function (data) {
    return qs.stringify(data);
  }]
});
export const post = async (url, data, contentType) => {   

  const KeyText = localStorage.getItem("KeyText")
  const token = localStorage.getItem("token")
  const cusId = localStorage.getItem("CusID")
  const _md5 = md5(JSON.stringify(data) + KeyText)
  const para = {
    JsonData: JSON.stringify(data),
    CusID: cusId,
    KeyMd5: _md5,
    Token: token
  }
  return await http.post(url, contentType ? data : para)
}

http.interceptors.response.use(function (res) {
  console.log(res)
  if(res.data.Rem == 401 ) {
    Message.error(res.data.MsgText);
    router.push('./login')
  }
  handlerError(res.data)
  return res;
});

export const handlerError = ({
  code,
  msg
}) => {

};
