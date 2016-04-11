var allData = new Object();

createList();


function createList(){
    var request = window.indexedDB.open ("KKICounter", 1);

    request.onsuccess = function (e) {
        var db = e.target.result;

        var transaction = db.transaction (["Semesters"], "readonly");
        transaction.oncomplete = function () {
            db.close ();
        };

        var store = transaction.objectStore ("Semesters");

        store.openCursor().onsuccess = function (evt) {
            var cursor = evt.target.result;
            var list = document.getElementById("semesterList");
            if (cursor) {
                var value = cursor.value;
                name = value.Name != "" ? value.Name : "random";
                var c5 = value.c5 != "" && value.c5 != "undefined" ? parseInt(value.c5) : 0;
                var c4 = value.c4 != "" && value.c4 != "undefined" ? parseInt(value.c4) : 0;
                var c3 = value.c3 != "" && value.c3 != "undefined" ? parseInt(value.c3) : 0;
                var c2 = value.c2 != "" && value.c2 != "undefined" ? parseInt(value.c2) : 0;
                var c1 = value.c1 != "" && value.c1 != "undefined" ? parseInt(value.c1) : 0;
                allData[name] = '{"c5":' + c5 + ',"c4":' + c4 + ',"c3":' + c3 + ',"c2":' + c2 + ',"c1":' + c1 + '}';
                var li = document.createElement ("li");
                li.className = 'loadableSemester';
                li.innerHTML = name;
                list.appendChild (li);
                cursor.continue ();
            }
        };
    };

    request.onerror = function(e) {
        console.log (e);
    };
}

window.addEventListener ("click", function (evt) {
    if (evt.target.className != "") {
        var name = evt.target.innerHTML;
        deleteElement(name);
    }
    else {
    }
});

function deleteElement(name){
    var DBOpenRequest = window.indexedDB.open("KKICounter", 1);

    DBOpenRequest.onsuccess = function(event) {

      db = DBOpenRequest.result;

      deleteData(name);
    };
}

function deleteData(name) {
  var transaction = db.transaction(["Semesters"], "readwrite");

  transaction.oncomplete = function(event) {
    db.close();
    console.log(event);
  };


  transaction.onerror = function(event) {
    db.close();
    console.log(event);
  };

  var objectStore = transaction.objectStore("Semesters");

  var objectStoreRequest = objectStore.delete(name);

  objectStoreRequest.onsuccess = function(event) {
    db.close();
    console.log(event);
    $(".loadableSemester").remove();
    navigator.vibrate(1000);
    location.reload();
  };
};