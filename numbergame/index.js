class Game {
  constructor() {
    this.init()
    this.addEventListener()
  }
  init() {
    let numberArr = [1,2,3,4,5,6,7,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    ramdomArr(numberArr)
    console.log(numberArr)
    let docfrag = document.createDocumentFragment();
    numberArr.forEach((item, index) => {
      let li = document.createElement("div");
      if (item !== 0) li.textContent = item;
      li.className = `game-item-${index + 1}`
      docfrag.appendChild(li);
    });
    document.querySelector(`.content`).appendChild(docfrag);
    this.nullPoition = 25
  }
  addEventListener() {
    let that = this
    $('.content').on('click', function (e) {
      console.log(e)
      let targetPosition = Number(e.target.className.slice(10))
      console.log(targetPosition)
      if (targetPosition !== 0) {
        if (targetPosition === (that.nullPoition - 1) || targetPosition === (that.nullPoition + 1) || targetPosition === (that.nullPoition - 5) || targetPosition === (that.nullPoition + 5)) {
          $(e.target).removeClass().addClass(`game-item-${that.nullPoition}`)
          that.nullPoition = targetPosition
        }
      }
    })
  }
}

let game =new Game()


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