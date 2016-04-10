var inputs = $(".gradeInput");
var completed;
var all;
var sum;
var creditIndex;
var kki;


$("#count").on("click", function(){
  correctInputs();
  countKKI();
  $("#indexes").css("display", "initial");
  $("#kki").text(kki);
  $("#ki").text(creditIndex.toFixed(2));
});


function correctInputs(){
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].value < 0){
      inputs[i].value = Number(inputs[i].value) * (-1);
    }
  }
}


function countCredits(){
  all = 0;
  completed = 0;
  for(var i = 0; i < inputs.length; i++){
    all += Number(inputs[i].value);
    if(inputs[i].id != "grade1"){
      completed += Number(inputs[i].value);
    }
  }
}


function countSum()
{
  sum = 0;
  var credit5 = Number($("#grade5").val());
  var credit4 = Number($("#grade4").val());
  var credit3 = Number($("#grade3").val());
  var credit2 = Number($("#grade2").val());

  var mul5 = 5 * credit5;
  var mul4 = 4 * credit4;
  var mul3 = 3 * credit3;
  var mul2 = 2 * credit2;

  sum = mul5 + mul4 + mul3 + mul2;
}


function countKI(){
  creditIndex = sum / 30;
}


function countKKI(){
  countSum();
  countKI();
  countCredits();
  kki = (creditIndex * completed / all).toFixed(2);
}