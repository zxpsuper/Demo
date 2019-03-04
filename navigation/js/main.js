//1.初始化数据
let hashA = init();
let keys = hashA["keys"];
let hash = hashA["hash"];
let title = hashA["title"];
//2.生成键盘
generateKeyBoard(keys, hash, title);

//3.监听用户动作
//要监听谁的键盘事件 main还是document，需要知道用户按的是什么键
listenToUser(hash);
switchSearchEngin();

// 下面是工具函数
function init() {
  let keys = {
    0: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    1: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    2: ["z", "x", "c", "v", "b", "n", "m"],
    length: 3
  };
  let hash = {
    q: "qq.com",
    w: "wangdoc.com",
    e: undefined,
    r: "39.105.7.248:3000/",
    t:
      "trello.com/b/wftUTuHv/%E9%A0%86%E9%B9%BF-%E7%A0%94%E5%8F%91%E7%9C%8B%E6%9D%BF",
    y: "youtube.com",
    i: "iciba.com",
    o: "docs.qq.com/sheet/DQmZweHZUeVRmUlVk?opendocxfrom=admin&tab=BB08J2",
    p: "docs.qq.com/sheet/DQktQU3dQVEhERUxk?tab=BB08J2",
    a: undefined,
    s: "www.showdoc.cc/255678178917392?page_id=1499941481423123",
    d:
      "www.showdoc.cc/item/password/205382411199407?page_id=0&redirect=%2F205382411199407",
    f: undefined,
    g: "github.com",
    h: undefined,
    j: "juejin.im",
    k: "kstore.justgoai.com/#/home",
    l:
      "lanhuapp.com/web/#/item/board?type=share_mark&pid=b1fa4edb-cb54-44e6-b244-a92c724f0fd3&param=d9b9499a-e42b-4ab0-8897-c58884f23b33",
    z: "zhihu.com",
    x: undefined,
    c: "csdn.net",
    v: "cn.vuejs.org/",
    b: "39.105.7.248:8000/boss_site/",
    n: "47.107.162.112:8888/apps/files/?dir=/&fileid=6666",
    m: "mail.163.com"
  };
  let title = {
    q: "QQ",
    w: "wangdoc.com",
    e: undefined,
    r: "Redmine bug系统",
    t: "Trello",
    y: "youtube.com",
    i: "iciba.com",
    o: "前端B端进度表",
    p: "前端C端进度表",
    a: undefined,
    s: "showDoc管理后台",
    d: "showDoc用户端",
    f: undefined,
    g: "github.com",
    h: undefined,
    j: "juejin.im",
    k: "Kstore测试环境",
    l: "蓝湖",
    z: "zhihu.com",
    x: undefined,
    c: "csdn.net",
    v: "VUE",
    b: "商城boss端",
    n: "nextCloud",
    m: "mail.163.com"
  };
  let hasInLocalStorage = getFormLocalStorage("data");
  if (hasInLocalStorage) {
    hash = hasInLocalStorage;
    title = getFormLocalStorage("titleData");
  }
  return { keys: keys, hash: hash, title: title };
}

function getFormLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || "null");
}

function generateKeyBoard(keys, hash, title) {
  for (let index = 0; index < keys["length"]; index = index + 1) {
    //0 1 2
    let div = tag("div");
    main.appendChild(div);

    let row = keys[index];
    for (let index2 = 0; index2 < row["length"]; index2 = index2 + 1) {
      //将固定的10换成可控制的
      let kbd_wrapper = tag("div");
      kbd_wrapper.className = "kbd_wrapper";
      let kbd = tag("kbd");
      kbd.className = "key";
      let span = createSpan(row[index2]);
      let img = createImage(hash[row[index2]]);
      let button = createButton(row[index2]);

      // 判断按键是否已经有对应的网址
      if (hash[row[index2]] === undefined) {
        kbd.setAttribute("title", "未设置网站导航");
        kbd.setAttribute("link", "未设置网站导航");
      } else {
        kbd.setAttribute("title", title[row[index2]]);
        kbd.setAttribute("link", hash[row[index2]]);
      }

      kbd.onclick = function(e) {
        let website = e.currentTarget.getAttribute("link");
        if (website === "未设置网站导航") {
          alert("请编辑此按键的网站再跳转");
        } else {
          window.open("http://" + website, "_blank");
        }
      };

      kbd.appendChild(span);
      kbd.appendChild(img);
      kbd.appendChild(button);
      kbd_wrapper.appendChild(kbd);
      div.appendChild(kbd_wrapper);
    }
  }
}

function tag(tagName) {
  let element = document.createElement(tagName);
  return element;
}

function createSpan(textContent) {
  let span = tag("span");
  span.textContent = textContent; //第一个数组 第二个数组 第三个数组
  span.className = "text";
  return span;
}

function createButton(id) {
  let button = tag("button");
  button.textContent = "e";
  button.id = id;
  button.onclick = function(e) {
    //阻止事件冒泡
    e.stopPropagation();
    let button2 = e["target"];
    let img2 = button2.previousSibling;
    //获取当前的id
    let key = button2["id"];
    //用户输入一个网址
    let web = prompt("请输入一个网址(不含http)：");
    let itemTitle = prompt("请输入此网址的标题：");
    //将原来的hash给替换掉
    hash[key] = web;
    title[key] = itemTitle;
    img2.src = "http://" + web + "/favicon.ico";
    button2.parentElement.setAttribute("title", itemTitle);
    img2.onerror = function(e) {
      e.target.src = "./image/dot.png";
    };
    localStorage.setItem("data", JSON.stringify(hash));
    localStorage.setItem("titleData", JSON.stringify(title));
  };
  return button;
}

function createImage(domain) {
  let img = tag("img");
  let arr = ["lanhuapp.com", "47.107.162.112:8888", "cn.vuejs.org"];
  if (domain) {
    if (checkArr(arr, domain)) {
      dealFavicon(domain, img);
    } else {
      domain = domain.split("/")[0];
      img.src = "http://" + domain + "/favicon.ico";
    }
  } else {
    img.src = "./image/dot.png";
  }
  img.onerror = function(e) {
    e.target.src = "./image/dot.png";
  };
  return img;
}

function checkArr(arr, domain) {
  for (var i in arr) {
    if (domain.indexOf(arr[i]) > -1) return true;
  }
  return false;
}
// 对特殊的favicon.ico进行处理
function dealFavicon(domain, img) {
  if (domain.indexOf("lanhuapp.com") > -1) {
    img.src = "http://betacdn.lanhuapp.com/web/static/favicon.ico";
  } else if (domain.indexOf("47.107.162.112:8888") > -1) {
    img.src = "http://47.107.162.112:8888/core/img/favicon.ico";
  } else if (domain.indexOf("cn.vuejs.org") > -1) {
    img.src = "https://cn.vuejs.org/images/icons/favicon-32x32.png";
  }
}
function listenToUser(hash) {
  // ifInputting作为一个开关
  let ifInputting = false;
  let inputBar = document.getElementById("inputBar");
  let searchBtn = document.querySelector(".searchBtn");
  inputBar.addEventListener("focus", function(e) {
    ifInputting = true;
    e.target.placeholder = "";
  });
  inputBar.addEventListener("focusout", function(e) {
    ifInputting = false;
    e.target.placeholder = "点击左边图标切换搜索引擎";
  });
  searchBtn.onclick = function(e) {
    e.preventDefault();
    let searchContent = inputBar.value;
    // 判断是什么搜索引擎
    let searchEnginLogo = document.getElementById("searchEnginLogo");
    let engin = searchEnginLogo.getAttribute("data-engin");
    switch (engin) {
      case "baidu":
        window.open("https://www.baidu.com/s?wd=" + searchContent, "_blank");
        break;
      case "google":
        window.open(
          "https://www.google.com.hk/search?q=" + searchContent,
          "_blank"
        );
        break;
    }
  };

  document.onkeypress = function(e) {
    let key = e["key"];
    let website = hash[key];
    if (!ifInputting) {
      if (website === undefined) {
        alert("请编辑此按键的网站再跳转");
      } else {
        console.log(1);
        window.open("http://" + website, "_blank");
      }
    }
  };
}

// 切换搜索引擎
function switchSearchEngin() {
  // 搜索引擎默认是google
  let ifSwitch = false;
  let searchEnginLogo = document.getElementById("searchEnginLogo");
  let googleLogo = document.querySelector("#searchEnginLogo li:nth-child(1)");
  let baiduLogo = document.querySelector("#searchEnginLogo li:nth-child(2)");
  let googlePic = document.querySelector("#searchEnginPic li:nth-child(1)");
  let baiduPic = document.querySelector("#searchEnginPic li:nth-child(2)");
  searchEnginLogo.setAttribute("data-engin", "google");
  searchEnginLogo.onclick = function() {
    if (!ifSwitch) {
      // google --> baidu
      googleLogo.classList.remove("active");
      baiduLogo.classList.add("active");
      googlePic.classList.remove("active");
      baiduPic.classList.add("active");
      searchEnginLogo.setAttribute("data-engin", "baidu");
    } else {
      // baidu --> google
      baiduLogo.classList.remove("active");
      googleLogo.classList.add("active");
      baiduPic.classList.remove("active");
      googlePic.classList.add("active");
      searchEnginLogo.setAttribute("data-engin", "google");
    }
    ifSwitch = !ifSwitch;
  };
}
