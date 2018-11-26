import { LitReact, property } from '../../lit-react';
import * as React from "react";
import { render } from 'react-dom';
import { StyleSheetManager }  from 'styled-components/';

import Foo from '../reactComponents/foo';

class TodoApp extends LitReact{
  @property({type: Array})
  private todoList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  @property({type: Array})
  private comments = [];


  private styleContainer: HTMLElement;

  constructor() {
    super();
    setTimeout(() => {
      this.todoList = [...this.todoList, 10];
    }, 200);
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        this.comments = json;
      });
  }
  public containerAppCreated() {
    this.styleContainer = document.createElement('div');
    this.shadowRoot.append(this.styleContainer);
  }
  // ts-ignore
  public render() {
    render(
      <>
        <StyleSheetManager target={this.styleContainer}>
          <Foo comments={this.comments}/>
        </StyleSheetManager>
      </>,
      this.mountPoint
    )
  }
}

customElements.define('todo-app', TodoApp);
