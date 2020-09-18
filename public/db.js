const { response } = require("express");

let db;

let openRequest = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) { 
    // Save the IDBDatabase interface 
    var db = event.target.result;
  
    // Create an objectStore for this database
    var objectStore = db.createObjectStore("transaction", { keyPath: "id", autoIncrement:true });
  };

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;

  db.onversionchange = function() {
    db.close();
    alert("Database is outdated, please reload the page.")
  };
  
};

function saveTransaction(data) {
    var transaction = db.transaction(["transaction"], "readwrite");
    var objectStore = transaction.objectStore("transaction");
    objectStore.add(data);
    return transaction.complete;
};

dbPromise.then(function(db) {
  var tx = db.transaction(['transaction'], 'readonly');
  var objectStore = tx.objectStore('transaction');
  var bulk = objectStore.getAll();

  bulk.onsuccess = function() {
    if (bulk.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(bulk.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        var transaction = db.transaction(["transaction"], "readwrite");
        var objectStore = transaction.objectStore("transaction");
        objectStore.clear();
      })
    }
  }
})

window.addEventListener("online", )
