{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;

    render();
  };

  const completeAllTasks = () => {
    tasks = tasks.map((tasks) => ({
      ...tasks,
      done: true,
    }));

    render();
  };

  const hideAllDoneTasks = () => {
    if (tasks.some(({ done }) => done)) {
      hideDoneTasks = !hideDoneTasks;

      render();
    }
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const bindCompleteAllTasksEvents = () => {
    const completeAllTasksButton = document.querySelector(".js-completeAllTasks");

    if (completeAllTasksButton) {
      completeAllTasksButton.addEventListener("click", completeAllTasks);
    }
  };

  const bindHideDoneTasksEvents = () => {
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
    if (hideDoneTasksButton) {
      hideDoneTasksButton.addEventListener("click", hideAllDoneTasks);
    }
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="tasks__item ${task.done && hideDoneTasks === true ? " tasks__done--hidden" : ""}">
          <button class="tasks__button tasks__button--toggleDone js-done">
            ${task.done ? "✓" : ""}
          </button>
          <span class="tasks${task.done ? " tasks__done" : ""}">
            ${task.content}
          </span>
          <button class="tasks__button tasks__button--remove js-remove">
            🗑
          </button>
        </li>
      `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlButtons = "";

    if (tasks.length === 0) {
      document.querySelector(".js-buttons").innerHTML = "";
    } else {
      htmlButtons += `
        <button class="buttons js-hideDoneTasks"> 
          ${hideDoneTasks === false ? "Ukryj ukończone" : "Pokaż ukończone"}
        </button>
        <button class="buttons js-completeAllTasks"
          ${tasks.every(({ done }) => done) ? "disabled" : ""}>
          Ukończ wszystkie
        </button>
      `;
    };

    document.querySelector(".js-buttons").innerHTML = htmlButtons;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindCompleteAllTasksEvents();
    bindHideDoneTasksEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}