import * as React from "react";
import { IComments } from '../../../interfaces/comments';

import styled from 'styled-components';
/**
 * Todo move interfaces to its own folder
 */
interface IProps{
  comments: Array<IComments>
}

interface IState{
  color?: string;
}

const Ul = styled.ul`
  list-style-type: none
  padding: 0;
`;
let color: string = 'red';

setTimeout(() => {
  color = 'purple';
  console.log('black');
}, 5000);

const Li = styled.li`
  padding: 1rem;
  border: 1px solid ${(props) => props.color};
  margin: 15px 0;
  border-radius: 1rem;
`;

export default class Foo extends React.Component<IProps, IState>{
  public state: IState = {color: 'red'};
  constructor(props) {
    super(props);
  }
  private clickHandler() {
    this.setState({...this.state, color: `#${Math.floor(Math.random()*16777215).toString(16)}`});
  }
  public render() {
    console.log(this.state);
    return (
      <>
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
      </>
    );
  }
}