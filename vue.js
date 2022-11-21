class Vue {
  constructor(options) {
    // 1.通过配置存储数据
    this.$options = options || {}; // save options
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el; // get dom
    this.$data = options.data; // get data
    this.$methods = options.methods;
    // 2.将数据变成响应式数据(gettter\setter),注入到vue实例中
    this._proxyData(this.$data);
    // 3.调用 observer ,监听数据变化
    new Observer(this.$data)
    // 4.调用 compiler ,解析指令和差值表达式
    new Compiler(this)
  }
  _proxyData(data) {
    // 遍历所有 data
    Object.keys(data).forEach((key) => {
      // 将 data 属性注入到 vue 中
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (data[key] === newValue) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}
