function inhoudCheck(){
  var inputElement = document.getElementById("input").value;

  if(inputElement !== oudeText){
    oudeText = inputElement;
    console.log(inputElement)
  }
}
var oudeText = document.getElementById("input").value
var timer = setInterval(inhoudCheck, 5000);
