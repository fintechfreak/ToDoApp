import React, { Component } from "react";

class EditToDoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.edit(this.state.task, this.props.id);
    this.props.toggleEdit();
  }
  render() {
    return (
      <div>
        <form className="input-group mb-3" onSubmit={this.handleUpdate}>
          <input
            className="form-control"
            id="editTask"
            name="task"
            aria-label="Edit task"
            aria-describedby="editButton"
            value={this.state.task}
            onChange={this.handleChange}
            required
            autoFocus
          />
          <button className="btn btn-outline-secondary" id="editButton">
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default EditToDoForm;
