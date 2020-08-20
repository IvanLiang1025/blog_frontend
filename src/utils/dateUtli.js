



const formatDate = (date) => {
  
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const formattedDate = `${week[date.getDay()]}, ${date.getMonth()}-${date.getDay()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    return formattedDate;
}

export default formatDate;