import React, { Component } from "react";
import NewToDoForm from "./NewToDoForm";
import ToDoItem from "./ToDoItem";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    let storedToDos = localStorage.getItem("storedToDosKey");
    let parsedToDos = JSON.parse(storedToDos);
    if (parsedToDos) {
      this.state = {
        toDos: parsedToDos,
        taskEditing: false,
      };
    } else {
      this.state = {
        toDos: [],
        taskEditing: false,
      };
    }
    this.addTask = this.addTask.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.editTask = this.editTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  addTask(newTask) {
    this.setState((prevState) => ({
      toDos: [...prevState.toDos, newTask],
    }));
  }

  toggleEditing() {
    this.setState({ taskEditing: !this.state.taskEditing });
  }

  editTask(editedTask, id) {
    this.setState((prevState) => ({
      toDos: prevState.toDos.map((toDo) => {
        if (toDo.id === id) return { ...toDo, task: editedTask };
        else return toDo;
      }),
    }));
  }

  removeTask(id) {
    this.setState((prevState) => ({
      toDos: prevState.toDos.filter((toDo) => toDo.id !== id),
    }));
  }

  completeTask(id) {
    this.setState((prevState) => ({
      toDos: prevState.toDos.map((toDo) => {
        if (toDo.id === id) return { ...toDo, isDone: !toDo.isDone };
        else return toDo;
      }),
    }));
  }

  createTasks() {
    localStorage.setItem("storedToDosKey", JSON.stringify(this.state.toDos));
    return this.state.toDos.map((toDo) => {
      return (
        <ToDoItem
          key={toDo.id}
          id={toDo.id}
          task={toDo.task}
          isDone={toDo.isDone}
          taskEditing={this.state.taskEditing}
          remove={this.removeTask}
          edit={this.editTask}
          complete={this.completeTask}
          toggleEditing={this.toggleEditing}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <div
            className="card w-50 text-dark bg-light mb-3"
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <h1 className="card-title ">ToDo list</h1>
              <h6 className="card-subtitle mb-3 text-muted">
                Created in React with Bootsrap
              </h6>
              <NewToDoForm
                addTask={this.addTask}
                taskEditing={this.state.taskEditing}
              />
              {this.state.toDos.length > 0 && (
                <h6 className="card-subtitle mb-2 mt-4 text-muted">
                  Click to toggle completion:
                </h6>
              )}
              <div className="list-group">{this.createTasks()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoList;
