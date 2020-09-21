declare interface TransformOptions {
  clone?: boolean;
}

declare interface TransformProvider {
  getter: () => {};
  setter: () => {};
}

declare interface ProcessOptions {
  providers: any[];
  context: Object;
}

declare type ForeachCallback = () => void;
