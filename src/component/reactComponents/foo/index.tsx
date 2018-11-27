import * as React from "react";
import { IComments } from '../../../interfaces/comments';

import styled from 'styled-components';
/**
 * Todo move interfaces to its own folder
 */
interface IProps{
  comments: Array<IComments>;
}

interface IState{
  color?: string;
}

const Ul = styled.ul`
  list-style-type: none
  padding: 0;
  background-color: black;
  width: 100%;
`;

const Div = styled.div`
  background-color: black;
  padding: 1rem;
`;
let color: string = 'red';

const Li = styled.li`
  padding: 1rem;
  border: 0.1rem solid ${(props) => props.color};
  margin: 15px 0;
  border-radius: .3rem;
  color: white;
`;

const clickHandler = () => color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

export default class Foo extends React.Component<IProps, IState>{
  public state: IState = {color: 'red'};
  constructor(props) {
    super(props);
  }
  private clickHandler() {
    this.setState({...this.state, color: `#${Math.floor(Math.random()*16777215).toString(16)}`});
  }
  public render() {
    return (
      <Div>
        <button onClick={() => this.clickHandler()}>click me</button>
        <Ul className="comments-list">
        {
          (this.props.comments || []).map(e => (
            <Li color={this.state.color} key={e.id.toString()}>
              <h5>{e.name}</h5>
              <p>{e.body}</p>
            </Li>
          ))
        }
        </Ul>
      </Div>
    );
  }
}