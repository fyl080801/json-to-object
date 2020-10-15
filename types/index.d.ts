declare type Transform = (
  prop: any,
  owner: Object | Array<any>,
  options: ProcessOptions & Object
) => void | boolean;

export declare type TransformOptions = {
  clone?: boolean;
};

export declare type TransformProvider = (
  prop: any,
  owner: Object | Array<any>
) => Transform | void;

export declare type ProcessOptions = {
  providers: TransformProvider[];
  context: Object;
};

export declare type TransformInstance = {
  mergeContext: (context: Object) => TransformInstance;
  useContext: (context: Object) => TransformInstance;
  useProvider: (provider: TransformProvider) => TransformInstance;
  useOptions: (options: any) => TransformInstance;
  transform: (json: Object | Array<any>) => Object | Array<any>;
};

export declare type TransformFactory = (
  options?: TransformOptions
) => TransformInstance;

export declare type ProcessFactory = (
  options: ProcessOptions
) => ForeachCallback;

export declare type ForeachCallback = (
  data: any,
  prop: any,
  owner: any
) => void;

export const createTransform: TransformFactory;
