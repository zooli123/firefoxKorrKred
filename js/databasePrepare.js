var request = window.indexedDB.open ("KKICounter", 1);

request.onupgradeneeded = function (evt) {
    var db = evt.currentTarget.result;
    var Semesters = db.createObjectStore ("Semesters", {keyPath: "Id", autoIncrement: true});
    var index = Semesters.createIndex ("Semester", "Semester", {unique: false});
};

request.onsuccess = function () {
    window.location.href = "index.html";
};