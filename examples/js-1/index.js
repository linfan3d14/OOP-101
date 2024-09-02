
function px2Int(px){
    return parseInt(px.split('px')[0], 10);
}

const dx=0,dy=0;

var mX,mY;

/**
 * 正方形块
 */
class Square {
    /**
     * @param {number} id 唯一标识
     * @param {number} side 边长
     * @param {number} x    横坐标
     * @param {number} y    纵坐标
     */
    constructor(id,side,x,y){
        this.id = id;
        this.side = side;
        this.x = x;
        this.y = y;
        this._sub = null;
    }

    addSub(other){
        if(other instanceof Square){
            this._sub = other;
        }
    }

    show(dom){

        //TODO 以 div 的方式加入到 dom 中
        //TODO 通过 square 的属性设置其 div样式

        

        // console.log(`绘制正方形x:${this.x},y:${this.y}`);
        //调用其子 square
        if(this._sub){
            console.log(`绘制子正方形`);
            this._sub.show();
        }


    }

    move(x,y){
        console.log(`移动正方形至 x:${x},y:${y}`); 
        this.x = x;
        this.y = y;
        if(this._sub){
            console.log(`移动子正方形`);
            this._sub.move();
        }
    }


}

// 假设页面中有一个 ID 为 'parentDiv' 的父元素
parentDiv = document.getElementById('container');
const container = document.querySelector('#container')

const step = 30;

class Game{

    _getRandom(){
        let min = 1;
        let max = 10;
        min = Math.ceil(min); // 确保最小值是整数
        max = Math.floor(max); // 确保最大值是整数
        return Math.floor(Math.random() * (max - min + 1) + min)*50+2; 
    }

    
    constructor(count,dom){

        //初始化生成 count 个 square
        this.squares = [];
        for (let index = 0; index < count; index++) {
            let x = this._getRandom();
            let y = this._getRandom();

            let item = new Square(index,50,x,y)
            this.squares.push(item)
        }
        this.dom = dom;

        //TODO  将 square 显示在页面上
    }

    

    
        


    show(){

        for (let index = 0; index < this.squares.length; index++) {
            const item = this.squares[index];


        let newDiv = document.createElement('div');

        newDiv.draggable = true;
        newDiv.id = item.id;
        // 步骤2: 设置类名
        newDiv.className = 'square';
        // 步骤3: 设置样式
        newDiv.style.width = `${item.side}px`;
        newDiv.style.height = `${item.side}px`;
        newDiv.style.top = `${200+item.x}px`
        newDiv.style.left = `${100+item.x}px`
        newDiv.innerHTML = `d${item.id}`

        // console.log(`init:${newDiv.innerHTML} x:${newDiv.style.top},y:${newDiv.style.left}`)
        // 步骤5: 将新创建的 div 添加到页面中的某个父元素中
        parentDiv.appendChild(newDiv); // 或者使用 parentDiv.insertBefore(newDiv, someElement);
            item.show();
        }
        
    }

    // 移动的方块 是否和 其它的方块碰撞
    // 判断移动的方法(x,y)和其方的(x,y)是否有交集
    collision(){
        console.log(`检查碰撞...`)
    }

   

}

var  game = new Game(3)

game.show()

var currentDropDiv;

// 存储初始位置
var initialX, initialY;

var  currentX,currentY;

container.ondragstart = (e) => {
    console.log('start',e.target.id)
    //  // 保存初始位置
    //  initialX = e.clientX - this.offsetLeft;
    //  initialY = e.clientY - this.offsetTop;
}

container.ondragleave = (e) =>{
    console.log('leave',e.target.id)
    let cw = e.target.style.width;
    if(px2Int(cw)>50){
        e.target.style.width = `${px2Int(cw)-step}px`;
        e.target.style.height = `${px2Int(cw)-step}px`;
        e.target.style.top = `${px2Int(e.target.style.top)+step/2}px`;
        e.target.style.left = `${px2Int(e.target.style.left)+step/2}px`;
    }
}

container.ondragover = (e) => {
    // console.log('over',e.target)
    e.preventDefault();
    // e.stopPropagation();

    // let div = e.target;
    // console.log(e.target)
    // console.log('over',`d${div.id}-x:${div.style.top},y:${div.style.left}`)
    
}


container.ondragend = (e) => {
    console.log('end',e.target.id)
    e.stopPropagation();
   


    //将 drop div的位置给到 end
    let moveDiv = e.target;
    let ctop,cleft;
    if(currentDropDiv){

        ctop = currentDropDiv.style.top;
        cleft = currentDropDiv.style.left;

        // console.log(`move pre top:${moveDiv.style.top}`)
        // console.log(`move post left:${moveDiv.style.left}`)
        moveDiv.style.top = ctop;
        moveDiv.style.left = cleft;

        // console.log(`move post top:${moveDiv.style.top}`)
        // console.log(`move post left:${moveDiv.style.left}`)

        

        currentDropDiv.style.top = `${px2Int(ctop)-step/2}px`
        currentDropDiv.style.left = `${px2Int(cleft)-step/2}px`
        currentDropDiv.style.width =`${px2Int(currentDropDiv.style.width)+step}px`
        currentDropDiv.style.height =`${px2Int(currentDropDiv.style.height)+step}px`
        currentDropDiv.style.borderColor = 'black';


         
         
        //  currentDropDiv.style.width=
        //  `${(px2Int(currentDropDiv.style.width) + step)}px`;
        //  currentDropDiv.style.height = 
        //  `${(px2Int(currentDropDiv.style.height) + step)}px`;

        // //  console.log(`原方块扩大w:${currentDropDiv.style.width},h:${currentDropDiv.style.height}`)
         
        console.log(`end c:${currentDropDiv.id}<-m:${moveDiv.id}`)

        // currentDropDiv.appendChild(moveDiv);

        currentDropDiv = null;
    }else{
        // 设置被拖动元素的位置
        e.target.style.left = `${e.clientX}px`;
        e.target.style.top = `${e.clientY}px`;
       
    }
    
}

container.ondrop = (e)=>{
    console.log('drop',e.target.id)
    e.stopPropagation();
    if(e.target.classList.contains('square')){
        currentDropDiv = e.target;
        // console.log(`width:${parseInt(currentDropDiv.style.width.split('px')[0], 10)},step:${step}`)
        // currentDropDiv.style.width=
        // (parseInt(currentDropDiv.style.width.split('px')[0], 10) + step) + 'px'
        // currentDropDiv.style.height = (parseInt(currentDropDiv.style.height.split('px')[0], 10) + step) + 'px'
        // console.log(`我是 drop,我要变大了w:${currentDropDiv.style.width}`)
    }
    
    
}

document.onkeydown = (e) =>{
    console.log('keydown',`x:${mX},y:${mY}}`)
}
document.onmouseover = (e) => {
    mX = e.clientX;
    mY = e.clientY;
}

// document.addEventListener('keydown',function(e){
//     console.log('keydown',e)
//     if(e.key === 'a'){
//         console.log(`key:${e.key} down.`)
//     }
// })
