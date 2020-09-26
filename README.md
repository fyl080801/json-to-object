# JSON TO OBJECT

## 特性

json 格式可以转换成 js 对象，但是只能描述对象的属性，通过 json-to-object 可以实现定制化的转换，将特定属性按照自定义规则进行转换

## 使用

```bash
npm i json-to-object
```

## 示例

```javascript
import { createTransform } from 'json-to-object';

// 传入的数据
const context = { model: { text: 'aaa' } };

const transform = createTransform()
  .useContext(context)
  // 自定义转换，关联 model 里的 text
  .useProvider({
    getter: (prop, owner) => {
      return typeof owner[prop] === 'object' && owner[prop].$type === 'bind';
    },
    deal: (prop, owner, options) => {
      const value = owner[prop];
      const { context } = options;

      Object.defineProperty(owner, prop, {
        get() {
          return context[value.$source];
        },
      });
    },
  })
  // 自定义转换，转换成 function
  .useProvider({
    getter: (prop, owner) => {
      return typeof owner[prop] === 'object' && owner[prop].$type === 'on';
    },
    deal: (prop, owner, options) => {
      const value = owner[prop];

      Object.defineProperty(owner, prop, {
        get() {
          return new Function(value.$result);
        },
      });
    },
  });

const result = transform.transform({
  fields: [
    { component: 'p', text: { $type: 'bind', $source: 'model.text' } },
    {
      component: 'button',
      events: [
        {
          name: 'click',
          handler: { $type: 'on', $result: "alert('aaa')" },
        },
      ],
    },
  ],
});
```
