import { createTransform } from '../lib';

const context = { model: {}, params: {} };

const transform = createTransform();

transform.useContext(context);
transform.useProvider({
  getter: (prop, owner) => false,
  deal: (prop, owner, context) => {},
});
