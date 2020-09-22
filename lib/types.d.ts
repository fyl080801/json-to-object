declare interface TransformOptions {
  clone?: boolean;
}

declare interface TransformProvider {
  getter: (prop: any, owner: Object | Array<any>) => boolean;
  deal: (prop: any, owner: Object | Array<any>, context: any) => void | boolean;
}

declare interface ProcessOptions {
  providers: TransformProvider[];
  context: Object;
}

declare type ProcessFactory = (options: ProcessOptions) => ForeachCallback;

declare type ForeachCallback = (data: any, prop: any, owner: any) => void;
