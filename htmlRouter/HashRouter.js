import RouterParent from './ParentRouter';

export default class HashRouter extends RouterParent {
    constructor(routerConfig) {
        super(routerConfig);
    }

    init() {
        // 监听hash的变化
        // refresh 实现对应组件和当前路由绑定显示
        // bind(this) 传入此实例对象，否则this指向有问题
        window.addEventListener('hashchange', this.refresh.bind(this), false);
        window.addEventListener('load', this.refresh.bind(this), false);
    }

    refresh() {
        if (this.frontOrBack) {
            // 前进后退造成的路由变化，此时不需要改变routeHistory的数据
            this.frontOrBack = false;
        } else {
            this.currentUrl = location.hash.slice(1) || '/';
            if (this.replaceRouter) {
                this.routeHistory[this.currentIndex] = this.currentUrl;
                this.replaceRouter = false;
            } else {
                this.routeHistory.push(this.currentUrl);
                this.currentIndex++;
            }
            this.routeHistory = this.routeHistory.slice(
                0,
                this.currentIndex + 1
            );
        }
        let path = getPath(),
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

    back() {
        if (this.currentIndex > 0) {
            this.frontOrBack = true; // 在refresh中会重置为false
            this.currentIndex--; // 修改索引
            this.currentUrl = this.routeHistory[this.currentIndex]; // 修改当前url
            window.location.hash = this.currentUrl; // 修改实际hash
        }
    }

    front() {
        const historyLength = this.routeHistory.length;
        if (this.currentIndex < historyLength - 1) {
            this.frontOrBack = true;
            this.currentIndex++;
            this.currentUrl = this.routeHistory[this.currentIndex];
            window.location.hash = this.currentUrl;
        }
    }

    push(option) {
        if (option.path) {
            changeHash(option.path, option.query);
        } else if (option.name) {
            let path = '';
            // 根据路由名称找路由path
            for (let i = 0; i < this._routes.length; i++) {
                if (this._routes[i].name === option.name) {
                    path = this._routes[i].path;
                    break;
                }
            }
            if (!path) {
                error('组件名称不存在');
            } else {
                changeHash(path, option.query);
            }
        }
    }

    replace(option) {
        this.replaceRouter = true;
        this.push(option);
    }
}

function getPath() {
    let href = window.location.href;
    const index = href.indexOf('#');
    // empty path
    if (index < 0) return '';

    href = href.slice(index + 1);
    const searchIndex = href.indexOf('?');
    if (searchIndex < 0) return href;
    else {
        return href.slice(0, searchIndex);
    }
}

function error(message) {
    typeof console !== 'undefined' && console.error(`[html-router] ${message}`);
}

// 修改hash
function changeHash(path, query) {
    if (query) {
        let str = '';
        for (let i in query) {
            str += '&' + i + '=' + query[i];
        }
        (str && (window.location.hash = path + '?' + str.slice(1))) ||
            (window.location.hash = path);
    } else {
        window.location.hash = path;
    }
}
