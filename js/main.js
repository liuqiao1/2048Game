const SIZE = 4;
let leaveCellCount = SIZE * SIZE;


// console.log(dataSource);

// let initial = getRandomNum();
// console.log(initial);
window.onload=function(){ 
    // document.getElementById("mytest").style.backgroundColor="#639"; 
    const cells = document.getElementsByClassName("cell");
    let dataSource = initData();
    paint(dataSource, cells);
} 

function initData(){
    let dataSource = new Array();
    for(let i=0; i<SIZE; i++){
        dataSource[i] = new Array();
        for(let j=0; j<SIZE; j++){
            dataSource[i][j] = -1;
        }
    }
    setNum(dataSource);
    setNum(dataSource);
    return dataSource;
}

function getRandomPosition(){
    return {
        x: Math.floor(Math.random() * (SIZE)),
        y: Math.floor(Math.random() * (SIZE))
    }
}

function getRandomNum(){
    // 2 or 4
    return Math.floor(Math.random() * 2) ? 2 : 4;
} 

function setNum(dataSource){
    let pos = getRandomPosition();
    const num = getRandomNum();
    console.log(pos);
    if(dataSource[pos.x][pos.y] != -1){   
        while(dataSource[pos.x][pos.y] == -1){
            pos = getRandomPosition();
        }
    }
    dataSource[pos.x][pos.y] = num;
    leaveCellCount --;
    console.log("leaveCellCount decrease:" + leaveCellCount);
   
}

function paint(dataSource, cells){
    for(let i=0; i<SIZE; i++){
        for(let j=0; j<SIZE; j++){
            cells[i*SIZE + j].innerHTML = dataSource[i][j];
        }
    }
}