export default () => {
  const obj = { a: 1, b: 2 };
  const newobj = { ...obj, c: 3 };
  console.log("this is module!", newobj);
};
