import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      currentInput: "",
      tasks: [
            { name: '1', stage: 0 },
            { name: '2', stage: 0 },
        ]
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  // function to handle create new task button click and create new task at stage 0
  handleCreateTaskButtonClick(){
    if (this.state.currentInput.length === 0) return;
    const newTask = {name: this.state.currentInput, stage: 0};
    const newList = [...this.state.tasks, newTask];
    return this.setState({currentInput: "", tasks: newList});
  }

  handleForwardClick(name){
    const newList = this.state.tasks.map((task) => {
      if (task.name === name){
        if (task.stage !== 3) task.stage++;
      }
      return task;
    })
    return this.setState({tasks: newList});
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input value={this.state.currentInput} onChange={(e) => this.setState({currentInput: e.target.value})} id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input"/>
          <button onClick={() => this.handleCreateTaskButtonClick()} type="submit" className="ml-30" data-testid="create-task-button">Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button  disabled={task.stage === 0} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                            <i className="material-icons">arrow_back</i>
                                          </button>
                                          <button onClick={() => this.handleForwardClick(task.name)} disabled={task.stage === 3} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}