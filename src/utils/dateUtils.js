import moment from 'moment';


function formatingDate(date) {
  // console.log(date);
  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  // console.log(year);
  // console.log(month);
  // console.log(day);
  // console.log(hour)
  // const second = date.getSeconds();
  // const ymd = [year, month, day].map(formatNumber).join('/');
  const hms = [hour, minute].map(formatNumber).join(':');
  // console.log(hms)
  const timeArr = date.toDateString().split(' ');
  // console.log(timeArr);
 

  return `${timeArr[1]}.${timeArr[2]}, ${timeArr[3]} ${hms}`;

}

export const formatNumber = n => {
  const n1 = n.toString();
  return n1[1] ? n1 : `0${n1}`;
};

export function formatDate (date){
  
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const formattedDate = `${week[date.getDay()]}, ${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    return formattedDate;
}



// export function dateStringToTime (dateString) {
//   const date = new Date(dateString);
//   // console.log(date);
//   return formatingDate(date);
// }

/**
 *  format date as yyyy-MM-dd
 * @param {*} dateStr 
 * @returns 
 */
export function dateStringToTime(dateStr){
  const date = new Date(dateStr);
  const hour = date.getHours();
  const minute = date.getMinutes();
  
  const hms = [hour, minute].map(formatNumber).join(':');
  const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${hms}`;
  return formattedDate;
}


export function date2YMD(dateStr){
  
  const date = new Date(dateStr);
  const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  return formattedDate;
}






// export default formatDate;