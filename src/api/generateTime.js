const generateTime = () => {
    let currentDate = new Date();
    let dayOfMonth = currentDate.getDate();
    if(dayOfMonth < 10){
        dayOfMonth = '0' + dayOfMonth;
    }
    let month = currentDate.getMonth() + 1;
    if(month < 10){
        month = '0' + month;
    }
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    if(hours < 10){
        hours = '0' + hours;
    }
    let minutes = currentDate.getMinutes();
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    let formattedDate = dayOfMonth + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    return formattedDate;
}

export default generateTime;