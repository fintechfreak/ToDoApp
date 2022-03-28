import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewToDoForm.css";

class NewToDoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textInput = React.createRef();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      ...this.state,
      id: uuidv4(),
      isDone: false,
      isEdited: false,
    };
    this.props.addTask(newTask);
    this.setState({
      task: "",
    });
  }

  render() {
    return (
      <form className="input-group mb-3" onSubmit={this.handleSubmit}>
        <input
          className="form-control"
          id="task"
          name="task"
          aria-label="New ToDo"
          aria-describedby="addButton"
          value={this.state.task}
          onChange={this.handleChange}
          disabled={this.props.taskEditing}
          required
          placeholder="New ToDo here..."
          autoFocus
        />
        <button
          className="btn btn-outline-secondary"
          id="addButton"
          disabled={this.props.taskEditing}
        >
          Add
        </button>
      </form>
    );
  }
}

export default NewToDoForm;
