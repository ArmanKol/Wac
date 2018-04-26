var displayInvoer = "";
var operator = "";
var cijfers = 0;

function berekening(event){
  if(document.querySelector("#btn_1")){
    displayInvoer += 1;
    console.log(displayInvoer);
    document.querySelector("#display").innerHTML = displayInvoer;
  }
}

for(var i =0; i == 9; i++){
  var button_[i] = document.querySelector("#btn_"+i);
  console.log(i);
  button_[i].addEventListener("click", berekening);
}
