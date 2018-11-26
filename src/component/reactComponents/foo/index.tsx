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
  background-color: black;
  width: calc(100% - 2rem);
`;

const Div = styled.div`
  background-color: black;
  width: 100%;
  padding: 1rem;
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
  color: white;
`;

const clickHandler = () => color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

export default (props) => (
  <Div>
    <button onClick={() => clickHandler()}>click me</button>
    <Ul className="comments-list">
    {
      (props.comments || []).map(e => (
        <Li color={color} key={e.id.toString()}>
          <h5>{e.name}</h5>
          <p>{e.body}</p>
        </Li>
      ))
    }
    </Ul>
  </Div>
);
