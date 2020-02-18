import RouterParent from './ParentRouter';

export default class HistoryRouter extends RouterParent {
    constructor(routerConfig) {
        super(routerConfig);
    }

    init() {
        // 监听hash的变化
        // refresh 实现对应组件和当前路由绑定显示
        // bind(this) 传入此实例对象，否则this指向有问题
        window.addEventListener('popstate', this.refresh.bind(this), false);
        window.addEventListener('load', this.refresh.bind(this), false);
    }
    refresh() {
        let path = window.location.pathname,
            currentComponentName = '',
            nodeList = document.querySelectorAll('[data-component-name]');
        // 找出当前路由的名称
        for (let i = 0; i < this._routes.length; i++) {
            if (this._routes[i].path === path) {
                currentComponentName = this._routes[i].name;
                break;
            }
        }
        // 根据当前路由的名称显示对应的组件
        nodeList.forEach(item => {
            if (item.dataset.componentName === currentComponentName) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    push(option) {
        if (option.path) {
            pushHistory.call(
                this,
                option.path,
                option.query,
                this.replaceRouter
            );
        } else if (option.name) {
            let routePath = '';
            // 根据路由名称找路由path
            for (let i = 0; i < this._routes.length; i++) {
                if (this._routes[i].name === option.name) {
                    routePath = this._routes[i].path;
                    break;
                }
            }
            if (!routePath) {
                error('组件名称不存在');
            } else {
                pushHistory.call(
                    this,
                    routePath,
                    option.query,
                    this.replaceRouter
                );
            }
        }
    }
    replace(option) {
        this.replaceRouter = true;
        this.push(option);
    }
    back() {
        window.history.back();
    }
    front() {
        window.history.forward();
    }
}
// 路由跳转
function pushHistory(routePath, query, replace) {
    let path = getTargetPath(routePath, query);
    if (path !== window.location.pathname) {
        if (replace) {
            window.history.replaceState(path, '', path);
            this.replaceRouter = false;
        } else window.history.pushState(path, '', path);
        this.refresh();
    }
}

function error(message) {
    typeof console !== 'undefined' && console.error(`[html-router] ${message}`);
}

// 获取即将跳转的路径
function getTargetPath(path, query) {
    if (!query) return path;
    let str = '';
    for (let i in query) {
        str += '&' + i + '=' + query[i];
    }
    return path + '?' + str.slice(1);
}
