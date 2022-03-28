import React, { Component } from "react";
import EditToDoForm from "./EditToDoForm";
import "./ToDoItem.css";

class ToDoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleEdit() {
    this.setState({
      isEdited: !this.state.isEdited,
    });
    this.props.toggleEditing();
  }

  handleClick(e) {
    const targetId = e.currentTarget.id;
    if (targetId === "xButton") this.props.remove(this.props.id);
    else if (targetId === "editButton") this.toggleEdit();
    else if (targetId === "taskText") this.props.complete(this.props.id);
  }

  render() {
    return this.state.isEdited ? (
      <EditToDoForm
        key={this.props.id}
        id={this.props.id}
        task={this.props.task}
        edit={this.props.edit}
        toggleEdit={this.toggleEdit}
      />
    ) : (
      <div
        className={`input-group mb-3 ${this.props.isDone && "ToDo-task-completed"
          } ${this.props.taskEditing && "TaskEditing"}`}
      >
        <button
          className={`form-control list-group-item list-group-item-action ToDo-task ${this.props.isDone && "completed"
            }`}
          id="taskText"
          onClick={this.handleClick}
          disabled={this.props.taskEditing}
        >
          {this.props.task}
        </button>
        <button
          className="input-group-text"
          id="editButton"
          onClick={this.handleClick}
          disabled={this.props.isDone || this.props.taskEditing}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button
          className="input-group-text"
          id="xButton"
          onClick={this.handleClick}
          disabled={this.props.isDone || this.props.taskEditing}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    );
  }
}

export default ToDoItem;
