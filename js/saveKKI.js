var savedGrade5 = window.sessionStorage.getItem("grade5");
var savedGrade4 = window.sessionStorage.getItem("grade4");
var savedGrade3 = window.sessionStorage.getItem("grade3");
var savedGrade2 = window.sessionStorage.getItem("grade2");
var savedGrade1 = window.sessionStorage.getItem("grade1");

var name = "";
$("#save").prop("disabled", false);

$("#save").on("click", function(){
  name = $("#saveName").val();
  save();
  $(this).prop("disabled", "disabled");
});


function save(){
  var request = window.indexedDB.open ("KKICounter", 1);

  request.onsuccess = function (e) {
      var db = this.result;

      var transaction = db.transaction ("Semesters", "readwrite");
      transaction.oncomplete = function () {
        db.close ();
      };
      transaction.onerror = function() {
        db.close();
      }

      var store = transaction.objectStore ("Semesters");
      if(name == ""){
        alert("Adj meg egy nevet!");
        $("#save").prop("disabled", false);
      }
      else{
        var save = store.add ({Name:  name,
                               c5:    savedGrade5,
                               c4:    savedGrade4,
                               c3:    savedGrade3,
                               c2:    savedGrade2,
                               c1:    savedGrade1});
        save.onsuccess = function (e) {
          console.log (e);
          $("#successfulSave").fadeIn();
          $("#successfulSave").css("display", "block");
          disappear($("#successfulSave"));
        };

        save.onerror = function (e) {
          console.log(e);
          alert("Ez a név már foglalt");
          $("#save").prop("disabled", false);
        };
      }

  };

  request.onerror = function (e) {
    console.log (e);
  };
}


function setGradesToInitial(){
  window.sessionStorage.setItem ("grade5", "");
  window.sessionStorage.setItem ("grade4", "");
  window.sessionStorage.setItem ("grade3", "");
  window.sessionStorage.setItem ("grade2", "");
  window.sessionStorage.setItem ("grade1", "");
}

function disappear(element){
  setTimeout(function(){element.fadeOut();},2000);
}

function appear(element){
  setTimeout(function(){element.fadeIn();},2000);
}