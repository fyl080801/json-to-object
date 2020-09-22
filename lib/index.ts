import { cloneDeep, forEach } from 'lodash-es';

const process: ProcessFactory = (options) => {
  const { context, providers } = options;

  return (data, prop, owner) => {
    const noForeach =
      !data ||
      (typeof data !== 'object' &&
        Object.toString.call(data) === '[Object Array]');

    const transform = providers.find((provider) =>
      provider.getter(prop, owner)
    );

    let result;

    if (transform) {
      result = transform.deal(prop, owner, context);
    }

    if (noForeach) {
      return;
    }

    if (result !== false) {
      // forEach(trans && trans.convert ? owner[prop] : data, process(options));
      forEach(data, process(options));
    }
  };
};

const processTransform = (data: Object, options: ProcessOptions) => {
  forEach(data, process(options));
};

export const createTransform = (options: TransformOptions = {}) => {
  const { clone = true } = options;

  const context = {};
  const providers: TransformProvider[] = [];

  const factory = {
    useContext: (data: Object) => {
      Object.assign(context, data);
      return factory;
    },
    useProvider: (provider: TransformProvider) => {
      providers.push(provider);
      return factory;
    },
    transform: (json: Object) => {
      const data = clone ? cloneDeep(json) : json;

      processTransform(data, { providers, context });

      return data;
    },
  };

  return factory;
};
