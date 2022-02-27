// It will Excecute when clicks on model->save changes button
const state = {
    taskList: [],
  };

const htmlTaskContent=({id,
    imageurl,
    taskTitle,
    taskDescription,
    TaskContent,

    })=>
    ` <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
<div class="card shadow-sm task__card">
  <div
    class="card-header d-flex justify-content-end task__card__header"
  >
    <button type="button" class="btn btn-outline-info mr-2" id=${id} onclick="editTask.apply(this, arguments)">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn btn-outline-danger" id=${id} onclick="deleteTask.apply(this, arguments)">
      <i class="fas fa-trash-alt" id=${id}></i>
    </button>
  </div>
  <div class="card-body">
  ${
    imageurl &&
    `          <img width="100%" src=${imageurl} alt="Card image cap" class="card-img-top mb-3 rounded-lg">
  `
  }
    <h4 class="task__card__title">${taskTitle}</h4>
    <p class="description trim-3-lines text-muted" data-gramm_editor="false">
     ${taskDescription}
    </p>
    <div class="tags text-white d-flex flex-wrap">
      <span class="badge bg-primary m-1">${TaskContent}</span>
    </div>
  </div>
  <div class="card-footer">
    <button
      type="button"
      class="btn btn-outline-primary float-right"
      data-bs-toggle="modal"
      data-bs-target="#showTask"
      onclick="openTask.apply(this, arguments)"
      id=${id}
    >
      Open Task
    </button>
  </div>
</div>
</div>`;

const updateLocalStorage = () => {
  localStorage.setItem("tasky", JSON.stringify({ tasks: state.taskList }));
};


const Task_content = document.querySelector(".task_contents");
const Mymodal = document.querySelector('#exampleModal');
var modal = bootstrap.Modal.getInstance(Mymodal)
const saveChanges=(e)=>{
    const id = `${Date.now()}`;
    const Savedata = {
        imageurl: document.getElementById("imgurl").value,
        taskTitle: document.getElementById("taskTitle").value,
        taskDescription: document.getElementById("taskDescription").value,
        TaskContent: document.getElementById("TaskContent").value,
    };
    Task_content.insertAdjacentHTML("beforeend", htmlTaskContent({...Savedata,id}) );
    state.taskList.push({...Savedata,id});
    updateLocalStorage();
    modal.hide();
   

  }

  //when Refreshing card shoud not vannish
  const OnloadData = ()=>{
    const LocalStorageCopy = JSON.parse(localStorage.tasky);
    state.taskList = LocalStorageCopy.tasks;
    state.taskList.map((cardData)=>{
      Task_content.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
  }

  //deleting card from body
  const deleteTask = (e) => {
    if (!e) e = window.event;
    const targetID = e.target.id;
    const type = e.target.tagName;
    const removeTask = state.taskList.filter(({ id }) => id !== targetID);
    state.taskList = removeTask;
  
    updateLocalStorage();
    if (type === "BUTTON")
      return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
      );
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
    );
  };

