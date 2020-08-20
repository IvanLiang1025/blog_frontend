import axios from 'axios';
import {API} from '../config/apiConfig';
import { message } from 'antd';


export function apiGet(pathname, data={}){
  return new Promise((resolve, reject) => {
    const promise = axios.get(`${API}${pathname}`, data);
    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      if(err.response.data){
        message.error(err.response.data.error)
      }else{
        message.error(err.message)
      }
    })
  })

  // return axios.get(`${API}${pathname}`, data)
}


export function apiPost(pathname, data={}){

  return new Promise((resolve, reject) => {
    const promise = axios.post(`${API}${pathname}`, data);
    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      if(err.response.data){
        message.error(err.response.data.error)
      }else{
        message.error(err.message)
      }
    })
  })

  // return axios.post(`${API}${pathname}`, data)
}

export function apiDelete(pathname, token){
  return new Promise((resolve, reject) => {
    const promise = axios.delete(`${API}${pathname}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      if(err.response.data){
        message.error(err.response.data.error)
      }else{
        message.error(err.message)
      }
    })
  })
}

// export const signin = (user) => {
//   return axios.post(`${API}/signin`, user)
//           .then(res => {
//               return res.data;
//           })
//           .catch(err => {
//               if(err.response.data){
//                   return err.response.data;
//               }else{
//                   console.log(err);
//               }
//           })
// } 

// export function parseSubmitDetail(res) => {

// }