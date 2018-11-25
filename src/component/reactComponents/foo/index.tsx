import * as React from "react";
import { IComments } from '../../../interfaces/comments'
/**
 * Todo move interfaces to its own folder
 */
interface IProps{
  comments: Array<IComments>
}


export default class Foo extends React.Component<IProps, {comments}>{
  public render() {
    console.log(typeof this.props.comments);
    return (
      <ul>
       {
        (this.props.comments || []).map(e => (
          <li>
            <h5>{e.name}</h5>
            <p>{e.body}</p>
          </li>
        ))
       }
      </ul>
    );
  }
}