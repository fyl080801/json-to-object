import { cloneDeep, forEach } from 'lodash-es';

const process: ProcessFactory = (options) => {
  const { context, providers } = options;

  return (data, prop, owner) => {
    // data - 原始属性值
    const noForeach =
      !data || (typeof data !== 'object' && !Array.isArray(data));

    const transform = providers.find((provider) =>
      provider.getter(prop, owner)
    );

    let result;

    if (transform) {
      // 转换相当于处理 owner 里的属性值
      result = transform.deal(prop, owner, context);
    }

    if (noForeach) {
      return;
    }

    if (result !== false) {
      forEach(
        transform && transform.chainNext ? owner[prop] : data,
        process(options)
      );
    }
  };
};

const processTransform = (data: Object, options: ProcessOptions) => {
  forEach(data, process(options));
};

export const createTransform: TransformFactory = (
  options: TransformOptions = {}
) => {
  const { clone = true } = options;

  let context = {};
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
    transform: (json) => {
      const data = clone ? cloneDeep(json) : json;

      processTransform(data, { providers, context });

      return data;
    },
  };

  return instance;
};
