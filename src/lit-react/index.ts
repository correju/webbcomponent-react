
export { property } from './decorators';

export interface IAttributeSerializer<T = any> {

  /**
   * Deserializing function called to convert an attribute value to a property
   * value.
   */
  fromAttribute?(value: string): T;

  /**
   * Serializing function called to convert a property value to an attribute
   * value.
   */
  toAttribute?(value: T): string|null;
}

type AttributeType<T = any> = IAttributeSerializer<T>|((value: string) => T);

export interface IPropertyDeclaration<T = any> {

  /**
   * Indicates how and whether the property becomes an observed attribute.
   * If the value is `false`, the property is not added to `observedAttributes`.
   * If true or absent, the lowercased property name is observed (e.g. `fooBar`
   * becomes `foobar`). If a string, the string value is observed (e.g
   * `attribute: 'foo-bar'`).
   */
  attribute?: boolean|string;

  /**
   * Indicates how to serialize and deserialize the attribute to/from a
   * property. If this value is a function, it is used to deserialize the
   * attribute value a the property value. If it's an object, it can have keys
   * for `fromAttribute` and `toAttribute` where `fromAttribute` is the
   * deserialize function and `toAttribute` is a serialize function used to set
   * the property to an attribute. If no `toAttribute` function is provided and
   * `reflect` is set to `true`, the property value is set directly to the
   * attribute.
   */
  type?: AttributeType<T>;

  /**
   * Indicates if the property should reflect to an attribute.
   * If `true`, when the property is set, the attribute is set using the
   * attribute name determined according to the rules for the `attribute`
   * property option and the value of the property serialized using the rules
   * from the `type` property option.
   */
  reflect?: boolean;

  /**
   * A function that indicates if a property should be considered changed when
   * it is set. The function should take the `newValue` and `oldValue` and
   * return `true` if an update should be requested.
   */
  hasChanged?(value: T, oldValue: T): boolean;
}

type IHasChanged = (value: unknown, old: unknown) => boolean;

const microtaskPromise = new Promise((resolve) => resolve(true));

/**
 * Map of properties to PropertyDeclaration options. For each property an
 * accessor is made, and the property is processed according to the
 * PropertyDeclaration options.
 */
export interface IPropertyDeclarations {
  [key: string]: IPropertyDeclaration;
}
export const notEqual: IHasChanged = (value: unknown, old: unknown): boolean => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};

type IPropertyDeclarationMap = Map<PropertyKey, IPropertyDeclaration>;
const defaultPropertyDeclaration: IPropertyDeclaration = {
  attribute : true,
  hasChanged : notEqual,
  reflect : false,
  type : String,
};

export abstract class LitReact extends HTMLElement {
  protected renderRoot?: Element|DocumentFragment;

  public mountPoint: Element;

  protected createRenderRoot(): Element|ShadowRoot {
    return this.attachShadow({mode : 'open'});
  }
  private createAppContainer() {
    this.mountPoint = this.renderRoot.appendChild(document.createElement('div'));
  }
  public static observableProperties: Array<string|symbol> = [];

  private static classProperties: IPropertyDeclarationMap = new Map();
  /**
   * @param name
   * @param options
   * This method was copied from @polymer/lit-element
   */
  public static createProperty(name: PropertyKey, options: IPropertyDeclaration = defaultPropertyDeclaration) {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty('classProperties')) {
      this.classProperties = new Map();
      // NOTE: Workaround IE11 not supporting Map constructor argument.
      const superProperties = Object.getPrototypeOf(this).classProperties;
      if (superProperties !== undefined) {
        superProperties.forEach((v: any, k: PropertyKey) => this.classProperties.set(k, v));
      }
    }
    this.classProperties.set(name, options);
    if (this.prototype.hasOwnProperty(name)) {
      return;
    }
    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;

    this.observableProperties.push(key);

    Object.defineProperty(this.prototype, name, {
      get() { return this[key]; },
      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestPropertyUpdate(name, oldValue, options);
      },
      configurable : true,
      enumerable : true,
    });
  }
  public notEqual = notEqual;

  public render() {}

  private requestPropertyUpdate(name: PropertyKey, oldValue: any, options: IPropertyDeclaration) {
    if (!this.notEqual(this[name], oldValue)) {
     return;
    }
    this.render();
  }

  constructor() {
    super();
    this.renderRoot = this.createRenderRoot();
    this.createAppContainer();
  }
}
