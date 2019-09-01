// import _ from 'lodash';

// var element = document.createElement('div');
// element.innerHTML = _.join(['yan', 'yu'], '-');
// document.body.appendChild(element);

// 使用异步可实现懒加载
async function getComponent() {
    const { default: _ } = await import(/* webpackChunkName: "lodash" */  'lodash')
    const element = document.createElement('div');
    element.innerHTML = _.join(['yan', 'yu'], '-');
    return element;
    
}

document.addEventListener('click', () => {
    getComponent().then(element => {
        document.body.appendChild(element);
    });
})