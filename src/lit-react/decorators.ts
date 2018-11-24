import { LitReact } from "./index";


interface IProperty {
  type: any;
}

export const property = (options?: IProperty) => (proto: object, name: string) => {
  (proto.constructor as typeof LitReact).createProperty(name, options);
};
