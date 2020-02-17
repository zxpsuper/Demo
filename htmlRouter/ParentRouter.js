export default class RouterParent {
    constructor(routerConfig) {
        this._routes = routerConfig.routes;
        // this.routes = {};  // 消费者模式，将对应路径的执行函数存入一个map里
        this.routeHistory = []; // 路由历史
        this.currentUrl = ''; // 当前的路由地址
        this.currentIndex = -1; // 当前的路由序列号
        this.frontOrBack = false; // 是否的点击前进后退造成的路由变化，此时不需要监听到路由变化函数
        this.replaceRouter = false; // 是否是替换当前路由
    }
}
