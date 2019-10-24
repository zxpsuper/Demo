class Sudoku extends Global {
    constructor(options) {
        super();
        this.priceIndex = options.priceIndex || 0;
        this.scalingRatio = options.scalingRatio || 1;
        this.awards = options.awards; // 奖品
        this.sudokuSize = options.sudokuSize; // 宽度
        this.sudokuItemRadius = options.sudokuItemRadius * this.scalingRatio || 8; // item圆角

        this.sudokuItemUnactiveColor = options.sudokuItemUnactiveColor || 'rgb(255, 255, 255)';
        this.sudokuItemUnactiveTxtColor = options.sudokuItemUnactiveTxtColor || 'rgb(48, 44, 43)';
        this.sudokuItemUnactiveShadowColor = options.sudokuItemUnactiveShadowColor || 'rgb(255, 193, 200)';

        this.sudokuItemActiveColor = options.sudokuItemActiveColor || '#ee2746';
        this.sudokuItemActiveTxtColor = options.sudokuItemActiveTxtColor || 'rgb(255, 255, 255)';
        this.sudokuItemActiveShadowColor = options.sudokuItemActiveShadowColor || 'rgb(255, 193, 200)';

        this.buttonColor = options.buttonColor || '#31c5fe';
        this.buttonTxtColor = options.buttonTxtColor || 'rgb(255, 255, 255)';
        this.buttonShadowColor = options.buttonShadowColor || 'rgb(253, 177, 1)';

        this.duration = options.duration || 4000; // 时长
        this.velocity = options.velocity || 300; // 速度

        this.hasButton = options.hasButton || 'true';

        this.finish = options.finish;

        this.AWARDS_ROW_LENGTH = Math.floor(this.awards.length / 4) + 1; // 一行个数
        this.AWARDS_STEP = this.AWARDS_ROW_LENGTH - 1;
        this.AWARDS_LEN = this.AWARDS_STEP * 4;

        this.LETF_TOP_POINT = 0;
        this.RIGHT_TOP_POINT = this.AWARDS_STEP;
        this.RIGHT_BOTTOM_POINT = this.AWARDS_STEP * 2;
        this.LEFT_BOTTOM_POINT = this.AWARDS_STEP * 2 + this.AWARDS_STEP;

        this.SUDOKU_ITEM_MARGIN = 8 * 3 || this.sudokuSize / this.AWARDS_ROW_LENGTH / 6;
        this.SUDOKU_ITEM_SIZE = this.sudokuSize / this.AWARDS_ROW_LENGTH - this.SUDOKU_ITEM_MARGIN;
        this.SUDOKU_ITEM_TXT_SIZE = `bold ${this.SUDOKU_ITEM_SIZE * 0.12}px Helvetica`;

        this.BUTTON_SIZE = this.sudokuSize - (this.SUDOKU_ITEM_SIZE * 2 + this.SUDOKU_ITEM_MARGIN * 3);
        this.BUTTON_TXT_SIZE = `bold ${this.BUTTON_SIZE * 0.2}px Helvetica`;

        this._positions = [];
        this._buttonPosition = [];

        this._isAnimate = false; // 是否处于动画过程中
        this._jumpIndex = Math.floor(Math.random() * this.AWARDS_LEN);
        this._jumpingTime = 0;
        this._jumpTotalTime;
        this._jumpChange;

        this._canvasStyle; // canvas的样式style
    }

    drawSudoku(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        // 顶点坐标
        let maxPosition = this.AWARDS_STEP * this.SUDOKU_ITEM_SIZE + this.AWARDS_STEP * this.SUDOKU_ITEM_MARGIN;

        for (let i = 0; i < this.AWARDS_LEN; i++) {
            // ----- 左上顶点
            if (i >= this.LETF_TOP_POINT && i < this.RIGHT_TOP_POINT) {
                let row = i,
                    x = row * this.SUDOKU_ITEM_SIZE + row * this.SUDOKU_ITEM_MARGIN,
                    y = 0;

                this._positions.push({ x, y });
                // 画每一个item
                this.drawSudokuItem(
                    context,
                    x,
                    y,
                    this.SUDOKU_ITEM_SIZE,
                    this.sudokuItemRadius,
                    this.awards[i].type,
                    this.awards[i].content,
                    this.SUDOKU_ITEM_TXT_SIZE,
                    this.sudokuItemUnactiveTxtColor,
                    this.sudokuItemUnactiveColor,
                    this.sudokuItemUnactiveShadowColor
                );
            }
            // -----

            // ----- 右上顶点
            if (i >= this.RIGHT_TOP_POINT && i < this.RIGHT_BOTTOM_POINT) {
                let row = Math.abs(this.AWARDS_STEP - i),
                    x = maxPosition,
                    y = row * this.SUDOKU_ITEM_SIZE + row * this.SUDOKU_ITEM_MARGIN;

                this._positions.push({ x, y });

                this.drawSudokuItem(
                    context,
                    x,
                    y,
                    this.SUDOKU_ITEM_SIZE,
                    this.sudokuItemRadius,
                    this.awards[i].type,
                    this.awards[i].content,
                    this.SUDOKU_ITEM_TXT_SIZE,
                    this.sudokuItemUnactiveTxtColor,
                    this.sudokuItemUnactiveColor,
                    this.sudokuItemUnactiveShadowColor
                );
            }
            // -----

            // ----- 左下顶点
            if (i >= this.RIGHT_BOTTOM_POINT && i < this.LEFT_BOTTOM_POINT) {
                let row = Math.abs(this.AWARDS_STEP * 2 - i),
                    reverseRow = Math.abs(row - this.AWARDS_STEP),
                    x = reverseRow * this.SUDOKU_ITEM_SIZE + reverseRow * this.SUDOKU_ITEM_MARGIN,
                    y = maxPosition;

                this._positions.push({ x, y });

                this.drawSudokuItem(
                    context,
                    x,
                    y,
                    this.SUDOKU_ITEM_SIZE,
                    this.sudokuItemRadius,
                    this.awards[i].type,
                    this.awards[i].content,
                    this.SUDOKU_ITEM_TXT_SIZE,
                    this.sudokuItemUnactiveTxtColor,
                    this.sudokuItemUnactiveColor,
                    this.sudokuItemUnactiveShadowColor
                );
            }
            // -----

            // ----- 左上顶点
            if (i >= this.LEFT_BOTTOM_POINT) {
                let row = Math.abs(this.AWARDS_STEP * 3 - i),
                    reverseRow = Math.abs(row - this.AWARDS_STEP),
                    x = 0,
                    y = reverseRow * this.SUDOKU_ITEM_SIZE + reverseRow * this.SUDOKU_ITEM_MARGIN;

                this._positions.push({ x, y });

                this.drawSudokuItem(
                    context,
                    x,
                    y,
                    this.SUDOKU_ITEM_SIZE,
                    this.sudokuItemRadius,
                    this.awards[i].type,
                    this.awards[i].content,
                    this.SUDOKU_ITEM_TXT_SIZE,
                    this.sudokuItemUnactiveTxtColor,
                    this.sudokuItemUnactiveColor,
                    this.sudokuItemUnactiveShadowColor
                );
            }
        }
    }

    drawSudokuItem(context, x, y, size, radius, type, content, txtSize, txtColor, bgColor, shadowColor) {
        // ----- 绘制方块
        context.save();
        context.fillStyle = bgColor;
        context.shadowOffsetX = 0;
        // context.shadowOffsetY = 4;
        context.shadowBlur = 0;
        context.shadowColor = shadowColor;
        context.beginPath();
        super.roundedRect(context, x, y, size, size, radius);
        context.fill();
        context.restore();
        // -----

        // ----- 绘制图片与文字
        if (content) {
            if (type === 'image') {
                let image = new Image();
                image.src = content;

                function drawImage() {
                    context.drawImage(image, x + (size * 0.2) / 2, y + (size * 0.2) / 2, size * 0.8, size * 0.8);
                }

                if (!image.complete) {
                    image.onload = function(e) {
                        drawImage();
                    };
                } else {
                    drawImage();
                }
            } else if (type === 'text' || type === 'losing') {
                context.save();
                context.fillStyle = txtColor;
                context.font = txtSize;
                context.translate(
                    x + this.SUDOKU_ITEM_SIZE / 2 - context.measureText(content).width / 2,
                    y + this.SUDOKU_ITEM_SIZE / 2 + 6
                );
                context.fillText(content, 0, 0);
                context.restore();
            }
        }
        // -----
    }

    drawButton(context) {
        let x = this.SUDOKU_ITEM_SIZE + this.SUDOKU_ITEM_MARGIN,
            y = this.SUDOKU_ITEM_SIZE + this.SUDOKU_ITEM_MARGIN;

        // ----- 绘制背景
        context.save();
        context.fillStyle = this.buttonColor;
        // context.shadowOffsetX = 0;
        // context.shadowOffsetY = 4;
        // context.shadowBlur = 0;
        context.shadowColor = this.buttonShadowColor;
        context.beginPath();
        super.roundedRect(
            context,
            x,
            y,
            this.BUTTON_SIZE,
            this.BUTTON_SIZE,
            this.sudokuItemRadius,
            this.buttonColor,
            this.buttonShadowColor
        );
        context.fill();
        context.restore();
        // -----

        // ----- 绘制文字
        context.save();
        context.fillStyle = this.buttonTxtColor;
        context.font = this.BUTTON_TXT_SIZE;
        context.translate(
            x + this.BUTTON_SIZE / 2 - context.measureText('立即抽奖').width / 2,
            y + this.BUTTON_SIZE / 2 + 10
        );
        context.fillText('立即抽奖', 0, 0);
        context.restore();
        // -----

        this._buttonPosition = { x, y };
    }

    createButtonPath(context) {
        context.beginPath();
        super.roundedRect(
            context,
            this._buttonPosition.x,
            this._buttonPosition.y,
            this.BUTTON_SIZE,
            this.BUTTON_SIZE,
            this.sudokuItemRadius
        );
    }

    sudokuItemMove(context) {
        this._isAnimate = true;

        if (this._jumpIndex < this.AWARDS_LEN - 1) this._jumpIndex++;
        else if (this._jumpIndex >= this.AWARDS_LEN - 1) this._jumpIndex = 0;

        this._jumpingTime += 100;

        if (this._jumpingTime >= this._jumpTotalTime) {
            this._isAnimate = false;
            if (this.finish) {
                if (this._jumpIndex != 0) this.finish(this._jumpIndex - 1);
                else if (this._jumpIndex === 0) this.finish(this.AWARDS_LEN - 1);
            }
            return;
            let tempPriceJumpIndex = this._jumpIndex === 0 ? this.AWARDS_LEN - 1 : this._jumpIndex - 1;
            if (this.priceIndex === tempPriceJumpIndex) {
                this._isAnimate = false;
                if (this.finish) {
                    if (this._jumpIndex != 0) this.finish(this._jumpIndex - 1);
                    else if (this._jumpIndex === 0) this.finish(this.AWARDS_LEN - 1);
                }
                return;
            }
        }

        this.drawSudoku(context);
        if (this.hasButton === 'true') this.drawButton(context);

        this.drawSudokuItem(
            context,
            this._positions[this._jumpIndex].x,
            this._positions[this._jumpIndex].y,
            this.SUDOKU_ITEM_SIZE,
            this.sudokuItemRadius,
            this.awards[this._jumpIndex].type,
            this.awards[this._jumpIndex].content,
            this.SUDOKU_ITEM_TXT_SIZE,
            this.sudokuItemActiveTxtColor,
            this.sudokuItemActiveColor,
            this.sudokuItemActiveShadowColor
        );

        setTimeout(
            this.sudokuItemMove.bind(this, context),
            50 + super.easeOut(this._jumpingTime, 0, this._jumpChange, this._jumpTotalTime)
        );
    }

    luckyDraw(context) {
        this._jumpingTime = 0;
        this._jumpTotalTime = Math.random() * 1000 + this.duration;
        this._jumpChange = Math.random() * 3 + this.velocity;
        this.sudokuItemMove(context);
    }

    render(canvas, context) {
        this._canvasStyle = canvas.getAttribute('style');
        this.drawSudoku(context);
        this.drawSudokuItem(
            context,
            this._positions[this._jumpIndex].x,
            this._positions[this._jumpIndex].y,
            this.SUDOKU_ITEM_SIZE,
            this.sudokuItemRadius,
            this.awards[this._jumpIndex].type,
            this.awards[this._jumpIndex].content,
            this.SUDOKU_ITEM_TXT_SIZE,
            this.sudokuItemActiveTxtColor,
            this.sudokuItemActiveColor,
            this.sudokuItemActiveShadowColor
        );
        if (this.hasButton === 'true') {
            this.drawButton(context);

            ['mousedown', 'touchstart'].forEach(event => {
                canvas.addEventListener(event, e => {
                    let loc = super.windowToCanvas(canvas, e);
                    console.log(loc, context.isPointInPath(loc.x * this.scalingRatio, loc.y * this.scalingRatio));
                    this.createButtonPath(context);

                    if (
                        context.isPointInPath(loc.x * this.scalingRatio, loc.y * this.scalingRatio) &&
                        !this._isAnimate
                    ) {
                        this.luckyDraw(context);
                    }
                });
            });

            canvas.addEventListener('mousemove', e => {
                let loc2 = super.windowToCanvas(canvas, e);
                this.createButtonPath(context);

                if (context.isPointInPath(loc2.x, loc2.y)) {
                    canvas.setAttribute('style', `cursor: pointer;${this._canvasStyle}`);
                } else {
                    canvas.setAttribute('style', this._canvasStyle);
                }
            });
        }
    }
}
