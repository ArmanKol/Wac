var resultaat = 0;
var operator = "";
var cijfers = 0;

function berekening(event){
  if(document.querySelector("#btn_1")){
    cijfers += 1;
    console.log(cijfers);
    document.querySelector("#display").innerHTML = 1;
  }
  if(document.querySelector("#btn_plus")){

  }
}

var nummer_een_button = document.querySelector("#btn_1");


nummer_een_button.addEventListener("click", berekening);
