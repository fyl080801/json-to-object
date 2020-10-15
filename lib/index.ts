import { cloneDeep, forEach } from 'lodash-es';
import {
  ProcessFactory,
  ProcessOptions,
  TransformFactory,
  TransformInstance,
  TransformProvider,
} from 'types';

const findTransform = (
  providers: TransformProvider[],
  prop: any,
  owner: any
) => {
  let transform = null;

  for (let i = 0; i < providers.length; i++) {
    transform = providers[i](prop, owner);
    if (transform) {
      break;
    }
  }

  return transform;
};

const process: ProcessFactory = (options) => {
  const { providers } = options;

  return (data, prop, owner) => {
    const transform = findTransform(providers, prop, owner);

    // 转换相当于处理 owner 里的属性值
    const result = transform ? transform(prop, owner, options) : null;

    if (!data || (typeof data !== 'object' && !Array.isArray(data))) {
      return;
    }

    if (result !== false) {
      forEach(data, process(options));
    }
  };
};

const processTransform = (data: Object, options: ProcessOptions) => {
  forEach(data, process(options));
};

export const createTransform: TransformFactory = (options) => {
  const { clone = true } = options || {};

  let context = {};
  let extend = {};
  const providers: TransformProvider[] = [];

  const instance: TransformInstance = {
    mergeContext: (data) => {
      Object.assign(context, data);
      return instance;
    },
    useContext: (data) => {
      context = data;
      return instance;
    },
    useProvider: (provider) => {
      providers.push(provider);
      return instance;
    },
    useOptions: (options) => {
      extend = options;
      return instance;
    },
    transform: (json) => {
      const data = clone ? cloneDeep(json) : json;

      processTransform(data, { ...extend, providers, context });

      return data;
    },
  };

  return instance;
};
