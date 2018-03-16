export default function formatDate(date){
  var now = new Date(date)
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  var hour=now.getHours();
  var minute=now.getMinutes();
  var second=now.getSeconds();
  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
};

