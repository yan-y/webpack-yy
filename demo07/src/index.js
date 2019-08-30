// import "@babel/polyfill"; // 对低版本浏览器的补充(变量、方法等...) 配置完毕之后不需要引入 babel/polyfill

const arr = [
	new Promise(() => {}),
	new Promise(() => {})
];

arr.map(item => {
	console.log(item);
})