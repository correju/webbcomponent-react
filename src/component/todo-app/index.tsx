import { LitReact, property } from '../../lit-react';
import * as React from "react";
import { render } from 'react-dom';

class TodoApp extends LitReact{
  @property({type: Array})
  private todoList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  @property({type: String})
  private variable;

  constructor() {
    super();
    setTimeout(() => {
      this.todoList = [...this.todoList, 10];
    }, 200);
  }
  public render() {
    render(
      <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
        <li>four</li>
      </ul>,
      this.mountPoint
    )
  }
  public connectedCallback() {
    console.log('hi');
  }
}

customElements.define('todo-app', TodoApp);
