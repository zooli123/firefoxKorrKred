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
                var c5 = value.c5 != "" ? parseInt(value.c5) : 0;
                var c4 = value.c4 != "" ? parseInt(value.c4) : 0;
                var c3 = value.c3 != "" ? parseInt(value.c3) : 0;
                var c2 = value.c2 != "" ? parseInt(value.c2) : 0;
                var c1 = value.c1 != "" ? parseInt(value.c1) : 0;
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
        var data = JSON.parse(allData[name]);
        window.sessionStorage.setItem ("Name", name);
        window.sessionStorage.setItem("grade5", data["c5"]);
        window.sessionStorage.setItem("grade4", data["c4"]);
        window.sessionStorage.setItem("grade3", data["c3"]);
        window.sessionStorage.setItem("grade2", data["c2"]);
        window.sessionStorage.setItem("grade1", data["c1"]);
        window.location.href = "index.html";
    }

    else {
    }
});
