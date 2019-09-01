document.addEventListener('click', () => {
    /**
     * webpackPrefetch
     * 首先加载页面的核心代码, 等到网络空闲时再去加载 click.js 提高页面加载速度
     */
    import(/* webpackPrefetch: true */ './click.js').then(({ default: _ }) => {
        _();
    })
});