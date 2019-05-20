function extend(o, n, override) {
  for (var p in n) {
    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
  }
}

class ScrapAward {
  constructor(userOption) {
    this.option = {
      canvasId: "canvas",
      backgroundImageUrl:
        "https://user-gold-cdn.xitu.io/2019/5/20/16ad4ac58d13651d?w=903&h=1605&f=jpeg&s=107934",
      width: 320,
      height: 160,
      backgroundSize: "100% 100%",
      // coverImage:
      //     'https://user-gold-cdn.xitu.io/2019/5/9/16a9b8578302943c?w=1080&h=1440&f=jpeg&s=92936',
      coverImage: {
        url: "",
        width: 320,
        height: 160
      }
    };
    this.ctx = null;
    this.init(userOption);
  }
  init(userOption) {
    if (this.canvas) {
      this.canvas.removeEventListener(tapstart, eventDown.bind(this));
      this.canvas.removeEventListener(tapend, eventUp.bind(this));
      this.canvas.removeEventListener(tapmove, eventMove.bind(this));
    }
    // 合并用户配置
    if (Object.assign) {
      Object.assign(this.option, userOption);
    } else {
      extend(this.option, userOption, true);
    }
    console.log(this.option);
    let that = this,
      img = (this.img = new Image()),
      imgLoaded = false,
      canvas = (this.canvas = document.querySelector(
        `#${this.option.canvasId}`
      )),
      hastouch = "ontouchstart" in window ? true : false,
      tapstart = hastouch ? "touchstart" : "mousedown",
      tapmove = hastouch ? "touchmove" : "mousemove",
      tapend = hastouch ? "touchend" : "mouseup",
      mousedown = false,
      coverImg = (this.coverImg = new Image()),
      coverImgLoad = false;

    coverImg.src = this.option.coverImage.url;
    coverImg.crossOrigin = "Anonymous";

    img.src = this.option.backgroundImageUrl;

    var w = (img.width = this.option.width),
      h = (img.height = this.option.height);
    this.canvasOffsetX = canvas.offsetLeft;
    this.canvasOffsetY = canvas.offsetTop;
    canvas.width = w;
    canvas.height = h;

    this.ctx = canvas.getContext("2d");
    let ctx = this.ctx;
    this.img.addEventListener("load", backgroundImageLoaded);
    this.option.coverImage.url &&
      this.coverImg.addEventListener("load", coverImageLoaded);

    // 背景图片加载完成后
    function backgroundImageLoaded(e) {
      imgLoaded = true;
      fillCanvas();
      canvas.style.background = "url(" + img.src + ") no-repeat";
      canvas.style.backgroundSize = that.option.backgroundSize || "contain";
    }
    // 覆蓋图片加载完成后
    function coverImageLoaded(e) {
      coverImgLoad = true;
      fillCanvas();
      canvas.style.background = "url(" + img.src + ") no-repeat";
      canvas.style.backgroundSize = that.option.backgroundSize || "contain";
    }
    function fillCanvas() {
      if (that.option.coverImage.url && (!imgLoaded || !coverImgLoad)) return;
      if (!that.option.coverImage.url) {
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.drawImage(
          coverImg,
          0,
          0,
          that.option.coverImage.width,
          that.option.coverImage.height
        );
      }
      ctx.globalCompositeOperation = "destination-out";
      canvas.addEventListener(tapstart, eventDown);
      canvas.addEventListener(tapend, eventUp);
      canvas.addEventListener(tapmove, eventMove);
    }
    // 点击开始事件
    function eventDown(e) {
      e.preventDefault();
      that.mousedown = true;
    }
    // 点击结束事件
    function eventUp(e) {
      e.preventDefault();
      that.mousedown = false;
    }
    // 刮奖事件
    function eventMove(e) {
      let ctx = that.ctx;
      e.preventDefault();
      if (that.mousedown) {
        if (e.changedTouches) {
          e = e.changedTouches[0];
        }
        var x =
            (e.clientX + document.body.scrollLeft || e.pageX) -
              that.canvasOffsetX || 0,
          y =
            (e.clientY + document.body.scrollTop || e.pageY) -
              that.canvasOffsetY || 0;

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
      }
      handleFilledPercentage(getFilledPercentage());
    }
    // 计算已经刮过的区域占整个区域的百分比
    function getFilledPercentage() {
      let imgData = that.ctx.getImageData(0, 0, w, h);
      // imgData.data是个数组，存储着指定区域每个像素点的信息，数组中4个元素表示一个像素点的rgba值
      let pixels = imgData.data;
      let transPixels = [];
      for (let i = 0; i < pixels.length; i += 4) {
        // 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0，
        // 为了提高计算效率，这儿设置当a值小于128，也就是半透明状态时就可以了
        if (pixels[i + 3] < 128) {
          transPixels.push(pixels[i + 3]);
        }
      }
      return (
        ((transPixels.length / (pixels.length / 4)) * 100).toFixed(2) + "%"
      );
    }
    // 设置阈值，去除灰色涂层
    function handleFilledPercentage(percentage) {
      percentage = percentage || 0;
      if (parseInt(percentage) > 50) {
        // 当像素点的个数超过  50% 时，清空画布，显示底图
        ctx.clearRect(0, 0, w, h);
      }
    }
  }
}
