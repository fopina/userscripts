// ==UserScript==
// @name         To-Do, Done
// @description  Filter tasks by last_modified date
// @version      1.0
// @match        https://to-do.office.com/tasks/all
// @updateURL https://raw.githubusercontent.com/fopina/userscripts/main/todo-done.js
// @grant        none
// ==/UserScript==

function main() {
  console.log("Adding button...");
  let node = document.querySelector('.tasksToolbar-titleContainer');
  node.insertAdjacentHTML(
    "beforeend",
    `
		<div class="tasksToolbar-titleItem">
    	<div class="listOptions">
      	<div>
      		<div role="none" class="">
      			<button id="filter-completed-btn" class="button loadingButton button toolbarButton more" title="" aria-live="assertive" tabindex="0" aria-haspopup="true" aria-label="Filter by completed date" aria-describedby="">
              <div class="toolbarButton-inner">
                <div>+</div>
              </div>
      			</button>
      		</div>
      	</div>
      </div>
    </div>
		`
  );

  let button = document.querySelector('#filter-completed-btn');
  button.addEventListener("click", function () {
    filterCompleted();
  });
};

function filterCompleted() {
  const request = indexedDB.open(`todo_${localStorage['user_id']}`, 220);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore("tasks", { keyPath: "id" });
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log("Database opened successfully");

    // Open a read-only transaction
    const transaction = db.transaction(["tasks"], "readonly");
    const objectStore = transaction.objectStore("tasks");

    // Open a cursor to iterate over the collection
    const cursorRequest = objectStore.openCursor();

    const currentDate = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(currentDate.getDate() - 14)

    cursorRequest.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        const cursorDate = new Date(cursor.value.last_modified_at.date_time + 'Z'); // FIXME: assuming always UTC - make use of timezone in the object
        if (cursorDate >= twoWeeksAgo && cursorDate <= currentDate) {
          console.log(`Task: ${cursor.value.title}\n${cursor.value.completed_at}\n${cursorDate}`);
        }
        cursor.continue();
      } else {
        console.log("No more tasks.");
      }
    };

    cursorRequest.onerror = function (event) {
      alert("Error iterating over tasks:", event.target.errorCode);
    };
  };

  request.onerror = function (event) {
    alert("Error opening database:", event.target.errorCode);
  };

}

let readyCheck = setInterval(function () {
  console.log("Wait for it...");

  if (document.querySelector('.tasksToolbar-titleContainer') !== null) {
    clearInterval(readyCheck);
    main();
  };
}, 200);
