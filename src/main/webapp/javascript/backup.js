var displayInvoer = "";
var operator = "";
var cijfers = "";
var oldcijfers = "";
var antwoord = 0;

function knop_zero(event){
  cijfers += "0";
  displayInvoer += "0";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_one(event){
  cijfers += "1";
  displayInvoer += "1";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_two(event){
  cijfers +="2";
  displayInvoer += "2";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_three(event){
  cijfers +="3";
  displayInvoer += "3";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_four(event){
  cijfers +="4";
  displayInvoer += "4";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_five(event){
  cijfers +="5";
  displayInvoer += "5";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_six(event){
  cijfers +="6";
  displayInvoer += "6";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_seven(event){
  cijfers +="7";
  displayInvoer += "7";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_eight(event){
  cijfers +="8";
  displayInvoer += "8";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_nine(event){
  cijfers +="9";
  displayInvoer += "9";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_plus(event){
  oldcijfers = cijfers;
  cijfers = "";
  operator += "+";
  displayInvoer += "+";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_min(event){
  oldcijfers = cijfers;
  cijfers = "";
  operator += "-";
  displayInvoer += "-";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_div(event){
  oldcijfers = cijfers;
  cijfers = "";
  operator += "/";
  displayInvoer += "/";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function knop_prod(event){
  oldcijfers = cijfers;
  cijfers = "";
  operator += "*";
  displayInvoer += "*";
  document.querySelector("#display").innerHTML = displayInvoer;
}

function berekening(event){
  if(operator == "+"){
    antwoord = parseInt(oldcijfers) + parseInt(cijfers);
  }

  else if(operator == "-"){
    antwoord = parseInt(oldcijfers) - parseInt(cijfers);
  }

  else if(operator == "/"){
    antwoord = parseInt(oldcijfers) / parseInt(cijfers);
  }

  else if(operator == "*"){
    antwoord = parseInt(oldcijfers) * parseInt(cijfers);
  }
  document.querySelector("#display").innerHTML = antwoord;
  operator = "";
  displayInvoer = antwoord;
  oldcijfers = "";
  cijfers = antwoord;

}

function clear(event){
  displayInvoer = "";
  operator = "";
  cijfers = "";
  oldcijfers = "";
  antwoord = 0;
  document.querySelector("#display").innerHTML = 0;
}

document.querySelector("#btn_0").addEventListener("click", knop_zero);
document.querySelector("#btn_1").addEventListener("click", knop_one);
document.querySelector("#btn_2").addEventListener("click", knop_two);
document.querySelector("#btn_3").addEventListener("click", knop_three);
document.querySelector("#btn_4").addEventListener("click", knop_four);
document.querySelector("#btn_5").addEventListener("click", knop_five);
document.querySelector("#btn_6").addEventListener("click", knop_six);
document.querySelector("#btn_7").addEventListener("click", knop_seven);
document.querySelector("#btn_8").addEventListener("click", knop_eight);
document.querySelector("#btn_9").addEventListener("click", knop_nine);

document.querySelector("#btn_plus").addEventListener("click", knop_plus);
document.querySelector("#btn_min").addEventListener("click", knop_min);
document.querySelector("#btn_div").addEventListener("click", knop_div);
document.querySelector("#btn_prod").addEventListener("click", knop_prod);

document.querySelector("#btn_eq").addEventListener("click", berekening);
document.querySelector("#btn_clear").addEventListener("click", clear);
