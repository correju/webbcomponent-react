import { LitReact, property } from '../../lit-react';
import * as React from "react";
import { render } from 'react-dom';

import Foo from '../reactComponents/foo';

class TodoApp extends LitReact{
  @property({type: Array})
  private todoList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  @property({type: Array})
  private comments = [];

  constructor() {
    super();
    setTimeout(() => {
      this.todoList = [...this.todoList, 10];
    }, 200);
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        this.comments = json;
        setTimeout(() => {
          this.comments=[{
            postId: 1500,
            id: 1800,
            name: 'Julian',
            email: 'correa.julian@gmail.com',
            body: 'BLAH BLAH BLAH',
          }, ...this.comments]
        }, 5000)
      });
  }
  public render() {
    render(
      <Foo comments={this.comments}/>,
      this.mountPoint
    )
  }
}

customElements.define('todo-app', TodoApp);
