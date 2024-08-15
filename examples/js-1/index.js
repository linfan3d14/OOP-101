
function px2Int(px){
    return parseInt(px.split('px')[0], 10);
}


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
        console.log(`绘制正方形x:${this.x},y:${this.y}`);
        if(this._sub){
            console.log(`绘制子正方形`);
            this._sub.show();
        }


    }

    move(){
        console.log(`移动正方形`) 
        if(this._sub){
            console.log(`移动子正方形`);
            this._sub.move();
        }
    }


}

// 假设页面中有一个 ID 为 'parentDiv' 的父元素
parentDiv = document.getElementById('container');
const container = document.querySelector('#container')

const step = 5;

class Game{

    _getRandom(){
        let min = 1;
        let max = 10;
        min = Math.ceil(min); // 确保最小值是整数
        max = Math.floor(max); // 确保最大值是整数
        return Math.floor(Math.random() * (max - min + 1) + min)*50+2; 
    }

    
    constructor(count,dom){
        this.squares = [];
        for (let index = 0; index < count; index++) {
            let x = this._getRandom();
            let y = this._getRandom();

            let item = new Square(index,50,x,y)
            this.squares.push(item)
        }
        this.dom = dom;
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
        newDiv.innerHTML = `div_${item.id}`
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

container.ondragstart = (e) => {
    console.log('start',e.target.id)
     // 保存初始位置
     initialX = e.clientX - this.offsetLeft;
     initialY = e.clientY - this.offsetTop;
}

container.ondragover = (e) => {
    // console.log('over',e.target)
    e.preventDefault();
}


container.ondragend = (e) => {
    console.log('end',e.target.id)
    e.stopPropagation();
   


    //将 drop div的位置给到 end
    let moveDiv = e.target;
    if(currentDropDiv){

        let ctop = currentDropDiv.style.top;
        let cleft = currentDropDiv.style.left;

        console.log(`move pre top:${moveDiv.style.top}`)
        console.log(`move post left:${moveDiv.style.left}`)
        moveDiv.style.top = ctop;
        moveDiv.style.left = cleft;

        console.log(`move post top:${moveDiv.style.top}`)
        console.log(`move post left:${moveDiv.style.left}`)

        

        currentDropDiv.style.top = `${px2Int(ctop)+step*2}px`
        currentDropDiv.style.left = `${px2Int(cleft)-step*2}px`


         
         
         currentDropDiv.style.width=
         `${(px2Int(currentDropDiv.style.width) + step)}px`;
         currentDropDiv.style.height = 
         `${(px2Int(currentDropDiv.style.height) + step)}px`;

         console.log(`原方块扩大w:${currentDropDiv.style.width},h:${currentDropDiv.style.height}`)
         

        currentDropDiv = null;
    }else{
 // 获取鼠标当前位置
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    console.log(`mx:${mouseX},my:${mouseY}`)

    console.log(`initialX:${initialX},initialY:${initialY}`)

        // 计算被拖动元素的新位置
        var newX = mouseX - initialX;
        var newY = mouseY - initialY;
    
        console.log(e.target)
        // 设置被拖动元素的位置
        e.target.style.left = `${mouseX-25}px`;
        e.target.style.top = `${mouseY+25}px`;
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




