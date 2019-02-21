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

    document.addEventListener("keydown", function(event){
        // console.log(event.keyCode);
        // up 38
        event.preventDefault();
        const keyCode = event.keyCode;
        if(keyCode === 38)goUp(dataSource);
        // down 40
        if(keyCode === 40)goDown(dataSource);
        // left 37
        if(keyCode === 37)goLeft(dataSource);
        // right 39
        if(keyCode === 39)goRight(dataSource);
        if(leaveCellCount <= 0){
            if(!hasSame(dataSource)){
                alert("Game over");
                return false;
            }
           
            // 取消监听事件
        }else{
            setNum(dataSource);
            paint(dataSource, cells);
            // 检测下一步还有得玩儿吗
            if(leaveCellCount == 0 && !hasSame(dataSource)){
                alert("Game over");
                return false;
            }
        }
       
    })
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
    if(leaveCellCount <0 ){
        alert("over");
        return;
    }
    let pos = getRandomPosition();
    const num = getRandomNum();
    if(dataSource[pos.x][pos.y] != -1){   
        // console.log('conflict:', pos, dataSource);
        while(true){
            pos = getRandomPosition();
            if(dataSource[pos.x][pos.y] == -1)break;
        }
        // console.log('correct:', pos);

    }
    dataSource[pos.x][pos.y] = num;
    leaveCellCount --;
    console.log("leaveCellCount-1:" + leaveCellCount);
   
}

function paint(dataSource, cells){
    for(let i=0; i<SIZE; i++){
        for(let j=0; j<SIZE; j++){
            cells[i*SIZE + j].innerHTML = dataSource[i][j] == -1 ? "" : dataSource[i][j];
        }
    }
}

function goDown(dataSource){
    console.log("go down");
    print(dataSource);
    // dataSource =
    reverse(dataSource);
    for(let i=0; i<SIZE; i++){
        // row = dataSource[i];
        dataSource[i] = mergeRow(dataSource[i].reverse(), i).reverse();
    }
    reverse(dataSource);
    print(dataSource);
    // console.log(mergeRow(dataSource, 0));
}

function goUp(dataSource){
    console.log("go up");
    // const ds = 
    print(dataSource);
    reverse(dataSource);
    for(let i=0; i<SIZE; i++){
        // row = dataSource[i];
        dataSource[i] = mergeRow(dataSource[i], i);
    }
    reverse(dataSource);
    print(dataSource);

    // console.log(ds);
}

function goLeft(dataSource){
    console.log("go left");
    print(dataSource);

    for(let i=0; i<SIZE; i++){
        // row = dataSource[i];
        dataSource[i] = mergeRow(dataSource[i], i);
    }
    print(dataSource);
    // console.log(mergeRow(dataSource, 0));
}

function goRight(dataSource){
    console.log("go right");
    print(dataSource);

    for(let i=0; i<SIZE; i++){
        // row = dataSource[i];
        let temp = mergeRow(dataSource[i].reverse(), i);
        dataSource[i] = temp.reverse();
    }
    print(dataSource);

}

// 
function mergeRow(row1, rowIndex){
    let row = squeezeRow(row1);
    let i=0; 
    while(i<SIZE-1){
        if(row[i] == -1)break;
        if(row[i] === row[i+1]){
            row[i] *= 2;
            row[i+1] = -1;
            // 全部往前移动一位
            for(j=i+1; j<SIZE-1; j++){
                row[j] = row[j+1];
            }
            row[SIZE-1] =  -1;
            leaveCellCount ++;
            console.log("merge:",rowIndex, i);
            console.log("leaveCellCount+1:", leaveCellCount);
            break;
        }
        i++;
    }
    return row;
}

function squeezeRow(row1){
    let row = [].concat(row1);
    let i=0, k=1;
    while(i<SIZE && k<SIZE){
        if(row[i] == -1){
            for(let j=k; j<SIZE; j++){
                if(row[j] !== -1){
                    row[i] = row[j];
                    row[j] = -1;
                    k = j+1;
                    break;
                }
            }
        }else{
            k++;
        }
        i++;
    }
    return row;
}


// 矩阵逆置
function reverse(ds){
    // let ds = [...dataSource];
    // console.log("ds:", ds);
    for(let i=0; i<SIZE; i++){
        for(let j=i+1; j<SIZE; j++){
            let temp = ds[i][j];
            ds[i][j] = ds[j][i];
            ds[j][i] = temp;
            // console.log("交换", ds[i][j], ds[j][i]);
        }
    }
    // console.log("reverse finish,", ds);
    // return ds;
}
// console.log(squeezeRow([2, -1, 2, -1]));
function hasSame(ds){
    let flag=false;
    for(let i=0; i<ds.length; i++){
        for(let j=0; j < ds[i].length; j++){
            if(ds[i-1] && ds[i-1][j] === ds[i][j]){
                flag = true;
                break;
            }
            if(ds[i][j-1] && ds[i][j-1] === ds[i][j]){
                flag = true;
                break;
            }
            if(ds[i+1] && ds[i+1][j] === ds[i][j]){
                flag = true;
                break;
            }
            if(ds[i][j+1] && ds[i][j+1] === ds[i][j]){
                flag = true;
                break;
            }
        }
    }
    return flag;
}

function print(dataSource){
    console.log("*******************************************");
    for(let i=0;i<SIZE; i++){
        console.log(i+":", dataSource[i].join("   "));
    }
    console.log("*******************************************");
}