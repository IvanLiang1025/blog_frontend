// import axios from 'axios';
import { API } from '../config/apiConfig';
import { message } from 'antd';
import axios from '@/services/request.js';
import qs from 'qs';



export function apiGet(pathname, data = {}, callback) {

  // const queryData = {
  //   queryContent: JSON.stringify(data)
  // }

  return new Promise((resolve, reject) => {
    let promise;
    promise = axios.get(`${pathname}`, {
      baseURL: API,
      params: data,
      paramsSerializer: params => qs.stringify(params)
      // data: data
    });
    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      return;
    })
  })
}


export function apiPost(pathname, data = {}, ) {
  return new Promise((resolve, reject) => {
    let promise;
    // console.log('post body', data)
    promise = axios.post(`${API}${pathname}`, data);

    promise.then(res => {   
      console.log(res)   
      resolve(res.data);
    }).catch(err => {})
  })
}

export function apiUpload(pathname, data = {}, ) {
  return new Promise((resolve, reject) => {
    let promise;
    // console.log('post body', data)
    promise = axios.post(`${API}${pathname}`, data);

    promise.then(response => {   
      // resolve("https://res-blog-public.s3.ca-central-1.amazonaws.com/Screen+Shot+2021-11-08+at+3.33.54+PM.png")
      // console.log(response)   
      const res = response.data;
      // resolve(res.data);
      if (res) {
        if (res.status === 0) {
          // const data = { ...res.data };
          // console.log(data);
          resolve (res.data);
        }else{
        message.error(res.info);
        }
      }
      resolve(null);
    }).catch(err => {})
  })
}


export function apiDelete(pathname, data = {}) {
  // console.log(data);
  return new Promise((resolve, reject) => {
    const promise = axios.delete(`${API}${pathname}`, {
      data: data,
    });
    promise.then(res => {
      resolve(res.data);
      
    }).catch(err => {
    })
  })
}

// export function apiUpload()


export function parseResSubmit(response) {
  console.log('submit response', response);
  if (response) {
    if (response.status === 0) {
      const data = { ...response.data };
      return data;
    }
    message.error(response.info);
  }
  return null;
}

export function parseResDetail(response) {
  console.log('parse response detail', response);
  if (response) {
    if (response.status === 0) {
      return response.data;
    }
    message.error(response.info);
    return;
  }
  return null;
}

export function parseResList(response, pagination) {
  console.log('list response', response);
  if (response) {
    if (response.status === 0) {
      return {
        list: response.data,
        pagination: {
          ...pagination,
          total: response.total
        }
      };
    }
    message.error(response.info);
    return;
  }
  return null;
}


