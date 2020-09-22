import { cloneDeep } from 'lodash-es';
import { processTransform } from './process';

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
