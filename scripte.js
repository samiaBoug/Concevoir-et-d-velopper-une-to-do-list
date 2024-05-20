//reset function
function Reset() {
   let form = document.getElementById("form")
   form.reset()
}
//add function
function add() {

   //recuperat the values of input
   let task = document.getElementById("Task").value;
   let description = document.getElementById("Description").value;
   let startDate = document.getElementById("dateFrom").value;
   let endDate = document.getElementById("dateTo").value;
   let startDateInput = new Date(startDate)
   let endDateInput = new Date(endDate)
   let fullDate = new Date()
   let newDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate())
   let priorityCheck = document.querySelector(`input[id="priority"]`);
   let ul = document.querySelector("#ul");

   // return the task's to thier original style   
   document.getElementById("Task").style.border = "none";
   document.getElementById("Description").style.border = "none";
   document.getElementById("dateFrom").style.border = "none";
   document.getElementById("dateTo").style.border = "none";

   if (task != "" && description != "" && startDate != "" && endDate != "" && startDateInput >= newDate && endDateInput >= startDateInput) {
      //creat <li> 
      let list = document.createElement("li");

      //creat checkbox in li 
      
      let label = document.createElement("label");
      label.for = "done";
      label.innerText = "Done :"
      label.id = "Done"; // creat label 
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "done";
      checkbox.onclick = updateStyle

      //creat task's title 
      let tasktitle = document.createElement("h1")
      tasktitle.id = "tasktitle"

      //creat task's description:
      let taskdescription = document.createElement("p")
      taskdescription.id = "tasksDescription"

      // creat task'date 
      let taskDate = document.createElement("p")
      taskDate.id = "taskDate";

      // creat task'icons 
      let editicon = document.createElement("i");
      editicon.classList = "fas fa-edit";
      editicon.onclick = edit;
      let removeicon = document.createElement("i");
      removeicon.classList = "fas fa-trash-alt";
      removeicon.onclick = remove;
      //creat hr :
      let line = document.createElement("hr")

      //appendchild 
      list.appendChild(label);
      list.appendChild(checkbox);
      list.appendChild(tasktitle);
      list.appendChild(taskdescription);
      list.appendChild(taskDate);
      list.appendChild(editicon);
      list.appendChild(removeicon);
      list.appendChild(line);
      ul.appendChild(list);


      //Assign values to the elements of the list
      tasktitle.textContent = task;
      taskdescription.textContent = description;
      taskDate.textContent = "from " + startDate + " to " + endDate

      //priority checkbox :
      if (priorityCheck.checked) {
         // creat img urgent 
         let priorityURG = document.createElement("img");
         priorityURG.src = "img/urg.png";
         priorityURG.id = "urg"
         priorityURG.style.animation = "pulse 2s infinite";
         list.appendChild(priorityURG);
      }

      //remove task function 
      function remove() {
         ul.removeChild(list)
      }
      //edit task function
      function edit() {
         //initialize the style of borders 
         document.getElementById("Task").style.border = "none";
         document.getElementById("Description").style.border = "none";
         document.getElementById("dateFrom").style.border = "none";
         document.getElementById("dateTo").style.border = "none";

         // Update the task's details with the edited values
         document.getElementById("Task").value = tasktitle.textContent;
         document.getElementById("Description").value = taskdescription.textContent;
         document.getElementById("dateFrom").value = startDate;
         document.getElementById("dateTo").value = endDate;
         // function add to edit 
         document.getElementById("add").textContent = "Edit";
         document.getElementById("add").onclick = function () {
            
            // Get the values of the input fields
            const taskInput = document.getElementById("Task").value;
            const descriptionInput = document.getElementById("Description").value;
            const startDateInput = new Date(document.getElementById("dateFrom").value);
            const endDateInput = new Date(document.getElementById("dateTo").value);

            // Check each input field individually
            if (taskInput === "") {
               document.getElementById("Task").style.border = "2px solid red";
               
               return;
            }

            if (descriptionInput === "") {
               document.getElementById("Description").style.border = "2px solid red";
             
               return;
            }
            if (isNaN(startDateInput) || startDateInput < newDate) {
               document.getElementById("dateFrom").style.border = "2px solid red";
               
               return;
            }

            if (isNaN(endDateInput) || endDateInput < startDateInput) {
               document.getElementById("dateTo").style.border = "2px solid red";
               
               return;
            }
               //update the values of task
               tasktitle.textContent = document.getElementById("Task").value;
               taskdescription.textContent = document.getElementById("Description").value;
               taskDate.textContent = "from " + document.getElementById("dateFrom").value + " to " + document.getElementById("dateTo").value;
              
               //priority :
               let existingPriorityImg = list.querySelector("#urg");

               if (priorityCheck.checked) {
                  if (!existingPriorityImg) {
                     // Create the priority image if it doesn't exist
                     let priorityURG = document.createElement("img");
                     priorityURG.src = "img/urg.png";
                     priorityURG.id = "urg";
                     priorityURG.style.animation = "pulse 2s infinite";
                     list.appendChild(priorityURG);
                  }
               } else {
                  // Remove the priority image if it exists
                  if (existingPriorityImg) {
                     list.removeChild(existingPriorityImg);
                  }
               }

               // Reset the input fields
               document.getElementById("Task").value = "";
               document.getElementById("Description").value = "";
               document.getElementById("dateFrom").value = "";
               document.getElementById("dateTo").value = "";

               // Change the button text back to "Add" to indicate adding mode
               document.getElementById("add").textContent = "Add";
            document.getElementById("add").onclick = add;
            
            //update border style 
            document.getElementById("Task").style.border = "none";
            document.getElementById("Description").style.border = "none";
            document.getElementById("dateFrom").style.border = "none";
            document.getElementById("dateTo").style.border = "none";
          
         }
      }

      //mark a task complete
      function updateStyle() {
         if (checkbox.checked) {
            list.style.opacity = 0.3;
            tasktitle.style.textDecoration = "line-through";
            taskdescription.style.textDecoration = "line-through";
            taskDate.style.textDecoration = "line-through";
         } else {
            // Set the styles when the task is not complete
            list.style.opacity = ""; // Remove opacity
            tasktitle.style.textDecoration = "none";
            taskdescription.style.textDecoration = "none";
            taskDate.style.textDecoration = "none";
         }

      }
      // Reset the form after add the list
      document.getElementById("Task").value = "";
      document.getElementById("Description").value = "";
      document.getElementById("dateFrom").value = "";
      document.getElementById("dateTo").value = "";
      
   }
   if (task == "") {
      document.getElementById("Task").style.border = "2px solid red"
   }
   if (description == "") {
      document.getElementById("Description").style.border = "2px solid red"
   }
   if (startDateInput < newDate || startDate == "") {
      document.getElementById("dateFrom").style.border = "2px solid red"
   }
   if (endDateInput < startDateInput || endDate == "") {
      document.getElementById("dateTo").style.border = "2px solid red"
   }

}
