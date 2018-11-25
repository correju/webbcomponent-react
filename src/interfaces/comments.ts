import { string } from "prop-types";

export interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

