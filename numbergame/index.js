class Game {
    constructor() {
        this.option = {
            end: () => {},
        };

        this.hasInit = false;
        // this.init();
        this.addEventListener();
    }
    init() {
        document.querySelector(`.content`).innerHTML = '';
        this.second = 0;
        this.finished = false;
        let historyTime = window.localStorage.getItem('historyTime');
        if (historyTime) {
            document.getElementById('history').innerHTML = historyTime;
        }
        this.hasInit = true;
        let numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        ramdomArr(numberArr);
        let colorArr = [
            '#ec2d7a',
            '#0eb0c9',
            '#525288',
            '#876818',
            '#5cb3cc',
            '#21373d',
            '#20a162',
            '#bacf65',
            '#fcd217',
        ];
        let docfrag = document.createDocumentFragment();
        numberArr.forEach((item, index) => {
            let li = document.createElement('div');
            if (item !== 0) {
                li.textContent = item;
                li.style.color = colorArr[item - 1];
            }
            li.className = `game-item-${index + 1}`;
            docfrag.appendChild(li);
        });
        document.querySelector(`.content`).appendChild(docfrag);
        this.nullPoition = 25;
        window.timer = setInterval(() => {
            if (this.finished) {
                clearInterval(window.timer);
                this.option.end(this.second);
            } else {
                this.second++;
                document.getElementById('timer').innerHTML = this.second;
            }
        }, 1000);
    }
    addEventListener() {
        let that = this;
        $('.content').on('click', function(e) {
            console.log(e);
            let targetPosition = Number(e.target.className.slice(10));
            console.log(targetPosition);
            if (targetPosition !== 0) {
                if (
                    targetPosition === that.nullPoition - 1 ||
                    targetPosition === that.nullPoition + 1 ||
                    targetPosition === that.nullPoition - 5 ||
                    targetPosition === that.nullPoition + 5
                ) {
                    $(e.target)
                        .removeClass()
                        .addClass(`game-item-${that.nullPoition}`);
                    that.nullPoition = targetPosition;
                    that.checkResult();
                }
            }
        });
    }
    checkResult() {
        let positionValueArr = [
            {
                key: '.game-item-7',
                value: '1',
            },
            {
                key: '.game-item-8',
                value: '2',
            },
            {
                key: '.game-item-9',
                value: '3',
            },
            {
                key: '.game-item-12',
                value: '4',
            },
            {
                key: '.game-item-13',
                value: '5',
            },
            {
                key: '.game-item-14',
                value: '6',
            },
            {
                key: '.game-item-17',
                value: '7',
            },
            {
                key: '.game-item-18',
                value: '8',
            },
            {
                key: '.game-item-19',
                value: '9',
            },
        ];
        let error = false;
        for (let i = 0; i < positionValueArr.length; i++) {
            if ($(positionValueArr[i].key)[0] === undefined) {
                error = true;
                break;
            }
            // console.log(positionValueArr[i].key, $(positionValueArr[i].key), $(positionValueArr[i].key)[0].innerText);
            if (
                $(positionValueArr[i].key)[0] &&
                $(positionValueArr[i].key)[0].innerText !== positionValueArr[i].value
            ) {
                error = true;
                break;
            }
        }
        if (!error) {
            this.finished = true;
            setTimeout(() => {
                alert('您的用时为' + this.second + '秒');
            }, 1000);
            let historyTime = window.localStorage.getItem('historyTime');
            if (!historyTime) {
                window.localStorage.setItem('historyTime', this.second);
            } else {
                if (Number(historyTime) > Number(this.second)) {
                    window.localStorage.setItem('historyTime', this.second);
                }
            }
        }
    }
}

let game = new Game();

function ramdomArr(arr) {
    var k = 0;
    var temp = 0;
    for (var i = 0; i < arr.length; i++) {
        k = Math.floor(Math.random() * (arr.length - i));
        temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;
    }
}

window.onload = function() {
    $('.start-btn').on('click', function() {
        !game.hasInit && game.init();
        if (game.hasInit && game.finished) game.init();
    });
};
