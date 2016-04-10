var inputs = $(".gradeInput");
var completed;
var all;
var sum;
var creditIndex;
var kki;


loadData();
checkFields();

$("#count").on("click", function(){
  correctInputs();
  countKKI();
  $("#indexes").css("display", "initial");
  $("#kki").text(kki);
  $("#ki").text(creditIndex.toFixed(2));
});

$("#clearFields").on("click",function(){
  clearData();
});

$("#saveSemester").on("click", function(){
  save();
  window.location.href = "saveKKI.html";
});

$("#calculateSemester").on("click", function(){
  window.location.href = "index.html";
});

$("#loadSemester").on("click", function(){
   window.location.href = "loadKKI.html";
});

inputs.on("change", function(){
  checkFields();
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
  if(all > 0)
    kki = (creditIndex * completed / all).toFixed(2);
  else
    kki = (0).toFixed(2);

  setKKIBackgroundColor(kki);
}


function save(){
  window.sessionStorage.setItem ("grade5", $("#grade5").val());
  window.sessionStorage.setItem ("grade4", $("#grade4").val());
  window.sessionStorage.setItem ("grade3", $("#grade3").val());
  window.sessionStorage.setItem ("grade2", $("#grade2").val());
  window.sessionStorage.setItem ("grade1", $("#grade1").val());
}


function loadData(){
  Number($("#grade5").val(window.sessionStorage.getItem("grade5")));
  Number($("#grade4").val(window.sessionStorage.getItem("grade4")));
  Number($("#grade3").val(window.sessionStorage.getItem("grade3")));
  Number($("#grade2").val(window.sessionStorage.getItem("grade2")));
  Number($("#grade1").val(window.sessionStorage.getItem("grade1")));
}

function clearData(){
  clearSession();
  location.reload();
}


function checkFields(){
  if( Number($("#grade5").val()) != 0 ||
      Number($("#grade4").val()) != 0 ||
      Number($("#grade3").val()) != 0 ||
      Number($("#grade2").val()) != 0 ||
      Number($("#grade1").val()) != 0 ||
      Number($("#grade5").val()) != "" ||
      Number($("#grade4").val()) != "" ||
      Number($("#grade3").val()) != "" ||
      Number($("#grade2").val()) != "" ||
      Number($("#grade1").val()) != "" )
  {
    $("#clearFields").css("display", "initial");
  }
}


function clearSession(){
  window.sessionStorage.setItem ("Name", false);
  window.sessionStorage.setItem ("grade5", false);
  window.sessionStorage.setItem ("grade4", false);
  window.sessionStorage.setItem ("grade3", false);
  window.sessionStorage.setItem ("grade2", false);
  window.sessionStorage.setItem ("grade1", false);
}


function setKKIBackgroundColor(kki){
  var area = $("#kki");
  if(kki < 1.5)
    area.css("background", "#FFA6A6");
  else if(kki < 2.5)
    area.css("background", "#FCFFA8");
  else if(kki < 3.3)
    area.css("background", "#FEFFEB");
  else if(kki < 4.2)
    area.css("background", "#D6F5CB");
  else
    area.css("background", "#ABF593");
}