const switcher = document.querySelectorAll("#theme-switcher img");
//Theme Switcher
switcher[0].onclick = ()=>{
    document.documentElement.setAttribute("data-theme","light");
    switcher[1].classList.add("active");
    switcher[0].classList.remove("active");
}
switcher[1].onclick = ()=>{
    document.documentElement.setAttribute("data-theme","dark");
    switcher[0].classList.add("active");
    switcher[1].classList.remove("active");

}

//Get HTML DOM Elements
const inputTask = document.querySelector("#to-do-input input"),
      tasksContainer = document.querySelector("#to-do-tasks"),
      itemsLeftDom = document.querySelector("#items-left-num"),
      allBtn = document.querySelector("#all-tasks"),
      completedBtn = document.querySelector("#tasks-completed"),
      activeBtn = document.querySelector("#tasks-active"),
      clearBtn = document.querySelector("#clear-completed"),
      errorExist = document.getElementById('error'); 

//global variables
let itemsLeft=0,
    tasksContainerCount ;
check = ()=>tasksContainerCount = document.querySelectorAll("#to-do-tasks >span");

//Add Tasks
inputTask.onkeyup = (e)=>{
    //create HTML DOM elements
    let task = document.createElement("span"),
        taskDelete = document.createElement("span"),
        taskChecker = document.createElement("span"),
        taskText = document.createTextNode(inputTask.value);
        taskChecker.className ="check-box";
        taskDelete.className = "delete";
    //check if the Enter Key is pressed 
    if (e.keyCode == 13) {
        if(inputTask.value ===''){
            inputTask.classList.add("empty");
            errorExist.style.display="block";
            errorExist.textContent = "Enter a task first!"
            return;
        }
        else{
            //check if the task is already exist 
            for(let i=0;i<tasksContainerCount.length;i++){
                if(inputTask.value == tasksContainerCount[i].childNodes[1].textContent){
                    inputTask.value = '';
                    errorExist.style.display = "block";
                    errorExist.textContent = "This Task already exist";
                    return;
                }
            }
            //create the task node 
            errorExist.style.display = "none";
            inputTask.classList.remove("empty");
            tasksContainer.appendChild(task);
            task.appendChild(taskChecker);
            task.appendChild(taskText);
            task.appendChild(taskDelete);
            inputTask.value = '';
            //Update the number of items left
            itemsLeft++;
            itemsLeftDom.textContent = itemsLeft;
        }
    } else {
       return;
    }
 }

//Remove Task and check if it's completed
document.addEventListener("click",(e)=>{
    //remove
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
        if(e.target.parentElement.childNodes[0].classList.contains("ischecked")){
            errorExist.style.display = "none";
            return;
        }
        else{
            itemsLeft--;
            itemsLeftDom.textContent = itemsLeft;
            errorExist.style.display = "none";
        }
    }
    //check
    if(e.target.classList.contains("check-box")){
        if(e.target.classList.contains("ischecked")){
            e.target.classList.remove("ischecked");
            e.target.parentElement.classList.remove("task-finished")
            itemsLeft++;
            itemsLeftDom.textContent = itemsLeft;
            errorExist.style.display = "none";
        }
        else{
            e.target.classList.add("ischecked");
            e.target.parentElement.classList.add("task-finished");
            itemsLeft--;
            itemsLeftDom.textContent = itemsLeft;
            errorExist.style.display = "none";
        } 
    }
},false);

//filtre Buttons
allBtn.onclick = ()=>{
    removeSelected();
    allBtn.classList.add("selected");
    for(let i=0;i<tasksContainerCount.length;i++){
        tasksContainerCount[i].style.display = "block";
    }
}
activeBtn.onclick = ()=>{
    removeSelected();
    activeBtn.classList.add("selected");
    for(let i=0;i<tasksContainerCount.length;i++){
        if(tasksContainerCount[i].childNodes[0].classList.contains("ischecked")){
            tasksContainerCount[i].style.display = "none";
        }
        else  tasksContainerCount[i].style.display = "block";
    }
}
completedBtn.onclick = ()=>{
    removeSelected();
    completedBtn.classList.add("selected");
    for(let i=0;i<tasksContainerCount.length;i++){
        if(tasksContainerCount[i].childNodes[0].classList.contains("ischecked")){
            tasksContainerCount[i].style.display = "block";
        }
        else errorExist.style.display = "none";
    }
}
clearBtn.onclick = ()=>{
    for(let i=0;i<tasksContainerCount.length;i++){
        if(tasksContainerCount[i].childNodes[0].classList.contains("ischecked")){
            tasksContainerCount[i].remove();
        }
    }
}
removeSelected = ()=>{
    clearBtn.classList.remove("selected");
    completedBtn.classList.remove("selected");
    activeBtn.classList.remove("selected");
    allBtn.classList.remove("selected");
    inputTask.classList.remove("empty");
    errorExist.style.display = "none";
}
setInterval(check,1000);