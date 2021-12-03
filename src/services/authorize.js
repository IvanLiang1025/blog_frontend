// import { getAccessToke } from "./storage";

export const checkAuth = () => {
  const token = getAccessToken();
  const loginTime = getLoginTime();
  const now = new Date().getTime();

  // clear auth after 3 hours
  if(now - loginTime > (1000 * 60 * 60 * 3)){
      resetAuth();
      return false;
  }

  if(token) {
    return true;
  }

  return false;
}

export const resetAuth = () => {
  localStorage.removeItem("blog-access-token");
  localStorage.removeItem("blog-login-date");
}


/**
 * set authentification
 * @param {*} token 
 */
export const setLoginAuth = (token) => {
  setAccessToken(token);
  setLoginTime();
}

export const setAccessToken = (token) => {
  localStorage.setItem("blog-access-token", token)
}

export const setLoginTime = () => {
  const loginTime = new Date().getTime();
  localStorage.setItem("blog-login-time", loginTime);
}

export const getAccessToken = () => {
  return localStorage.getItem("blog-access-token");
}

export const getLoginTime = () => {
  
  const time = localStorage.getItem("blog-login-time");

  if(!time) return 0;

  return time;
}

// export function authorize(data, callback) {
//   console.log(data);
//   localStorage.setItem('jwt', JSON.stringify(data));
//   if (callback) {
//     callback()
//   }
// }

// export const isAuthenticated = () => {
//   if (typeof window == "undefined") {
//     return false;
//   }
//   if (localStorage.getItem("jwt")) {
//     return JSON.parse(localStorage.getItem("jwt"));
//   } else {
//     return false;
//   }
// }

// export const removeToken = () => {
//   localStorage.removeItem('jwt');
// }