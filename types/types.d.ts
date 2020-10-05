declare interface TransformOptions {
  clone?: boolean;
}

declare interface TransformProvider {
  /**
   *
   */
  getter: (prop: any, owner: Object | Array<any>) => boolean;

  /**
   *
   */
  deal: (
    prop: any,
    owner: Object | Array<any>,
    options: ProcessOptions & Object
  ) => void | boolean;
}

declare interface ProcessOptions {
  providers: TransformProvider[];
  context: Object;
}

declare interface TransformInstance {
  mergeContext: (context: Object) => TransformInstance;
  useContext: (context: Object) => TransformInstance;
  useProvider: (provider: TransformProvider) => TransformInstance;
  useOptions: (options: any) => TransformInstance;
  transform: (json: Object | Array<any>) => Object | Array<any>;
}

declare type TransformFactory = (
  options?: TransformOptions
) => TransformInstance;

declare type ProcessFactory = (options: ProcessOptions) => ForeachCallback;

declare type ForeachCallback = (data: any, prop: any, owner: any) => void;
