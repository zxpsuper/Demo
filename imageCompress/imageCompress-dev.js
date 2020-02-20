/* 参数：
    file: url 或 file
    width: 输出图片的宽度
    height: 输出图片的高度
    mineType: 输出图片的格式，默认为image/png
    quality: 输出图片的画质。值为0～1,默认为1 
*/
class ImageCompress {
    constructor(options) {
        this._img = null; // 原始图片
        this._compressedImg = null; // 压缩后的图片
        this._canvas = null;
        this._blob = null;
        this.options = {
            mimeType: 'image/png',
            quality: 1,
        };
        extend(this.options, options, true);

        // 文件为传入抛出错误
        if (!options.file) {
            throw new Error('图片未传入');
        }

        let that = this;
        if (typeof options.file === 'string') {
            let img = (this._img = new Image());
            // 解决跨域报错问题
            img.setAttribute('crossOrigin', 'anonymous');
            img.src = options.file;

            return new Promise((resolve, reject) => {
                img.onload = function() {
                    resolve(that);
                };
                img.onerror = function(...args) {
                    reject(new Error('图片加载失败'));
                };
            });
        } else if (typeof options.file === 'object' && options.file.name) {
            if (!isAssetTypeAnImage(options.file.name)) {
                throw new Error('该文件不是图片');
            }
            let image = (this._img = new Image());
            return new Promise((resolve, reject) => {
                if (window.URL) {
                    image.src = window.URL.createObjectURL(options.file);
                } else {
                    const reader = new FileReader();
                    reader.onload = e => {
                        image.src = e.target.result;
                    };

                    reader.onabort = () => {
                        reject(
                            new Error(
                                'Aborted to load the image with FileReader.'
                            )
                        );
                    };
                    reader.onerror = () => {
                        reject(
                            new Error(
                                'Failed to load the image with FileReader.'
                            )
                        );
                    };

                    reader.readAsDataURL(options.file);
                }
                image.onload = function() {
                    resolve(that);
                };
                image.onerror = function(...args) {
                    reject(new Error('图片加载失败'));
                };
            });
        }
    }
    getImageBase64() {
        let canvas = this.getCanvas()
        return canvas.toDataURL(this.options.mimeType, this.options.quality);
    }
    // 获取canvas,可用于二次加工绘制
    getCanvas() {
        if (!this._canvas) this._imagetoCanvas();
        return this._canvas;
    }
    // 替换文档canvas节点
    replaceCanvasNode(oldNode) {
        let newNode = this.getCanvas();
        newNode.style.cssText = oldNode.style.cssText;
        newNode.id = oldNode.id;
        newNode.className = oldNode.className;
        oldNode.parentNode.replaceChild(this.getCanvas(), oldNode);
    }
    // 获取压缩后的图片节点
    getCompressImageNode() {
        if (this._compressedImg && this._compressedImg.src)
            return Promise.resolve(this._compressedImg);
        let image = (this._compressedImg = new Image());
        return this.getCompressFile().then(blob => {
            if (window.URL) {
                image.src = window.URL.createObjectURL(blob);
            } else {
                const reader = new FileReader();

                reader.onload = e => {
                    image.src = e.target.result;
                };
                // 终止事件
                reader.onabort = () => {
                    return Promise.reject(
                        new Error('Aborted to load the image with FileReader.')
                    );
                };
                reader.onerror = () => {
                    return Promise.reject(
                        new Error('Failed to load the image with FileReader.')
                    );
                };

                reader.readAsDataURL(blob);
            }
            return Promise.resolve(image);
        });
        // image.src = this._canvas.toDataURL();
    }
    // 替换页面图片
    replaceImageNode(oldNode) {
        this.getCompressImageNode().then(image => {
            image.style.cssText = oldNode.style.cssText;
            image.id = oldNode.id;
            image.className = oldNode.className;
            oldNode.parentNode.replaceChild(image, oldNode);
        });
    }
    // 获取压缩后的文件，return promise
    getCompressFile() {
        if (!this._canvas) this._imagetoCanvas();
        let that = this;
        return new Promise((resolve, reject) => {
            that._canvas.toBlob(
                blob => {
                    that._blob = blob;
                    resolve(blob);
                },
                that.options.mimeType,
                that.options.quality
            );
        });
    }
    // 下载压缩后的文件
    downloadCompressFile(name = 'compress-file') {
        if (this.blob && this._compressedImg) {
            const dataURL = this._compressedImg.src;
            const link = document.createElement('a');
            link.download = name;
            link.href = dataURL;
            link.dispatchEvent(new MouseEvent('click'));
        } else {
            this.getCompressImageNode().then(image => {
                const dataURL = image.src;

                const link = document.createElement('a');
                link.download = name;
                link.href = dataURL;
                link.dispatchEvent(new MouseEvent('click'));
            });
        }
    }
    // 私有方法，图片转canvas
    _imagetoCanvas() {
        let image = this._img;
        var cvs = (this._canvas = document.createElement('canvas'));
        var ctx = cvs.getContext('2d');
        cvs.width = this.options.width || image.width;
        // 高度默认等比例压缩
        cvs.height = this.options.width
            ? (this.options.width * image.height) / image.width
            : image.height;
        ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
    }
}


function extend(o, n, override) {
    for (var p in n) {
        if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
    }
}
function isAssetTypeAnImage(filename) {
    let index = filename.lastIndexOf('.');
    //获取后缀
    let ext = filename.substr(index + 1);
    return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
}