import { cloneDeep } from "./utils";
import { processTransform } from "./process";

export const createTransform = (
  json: Object,
  options: TransformOptions = {}
) => {
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
    done: () => {
      const data = clone ? cloneDeep(json) : json;

      processTransform(data, { providers, context });

      return data;
    },
  };

  return factory;
};
