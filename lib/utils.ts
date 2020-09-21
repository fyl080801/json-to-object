export const cloneDeep = (data: Object) => {
  return JSON.parse(JSON.stringify(data));
};

export const forEach = (
  data: Object | Array<any>,
  callback: ForeachCallback
) => {};
