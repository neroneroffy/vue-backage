export default function formatDate(date){
  var now = new Date(date)
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  var hour=now.getHours();
  if(month<10){
    month = "0"+month
  }
  if(hour<10){
    hour = "0"+hour
  }
  var minute=now.getMinutes();
  if(minute<10){
    minute = "0"+minute
  }
  var second=now.getSeconds();
  if(second<10){
    second = "0"+second
  }
  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
};

