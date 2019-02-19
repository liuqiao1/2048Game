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
        // left 37
        if(keyCode === 37)goLeft(dataSource);
        // right 39
        if(keyCode === 39)goRight(dataSource);
        if(leaveCellCount <= 0){
            alert("Game over");
            return false;
        }
        setNum(dataSource);
        paint(dataSource, cells);
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
    // if(leaveCellCount <0 ){
    //     alert("over");
    //     return;
    // }
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
    console.log("leaveCellCount decrease:" + leaveCellCount);
   
}

function paint(dataSource, cells){
    for(let i=0; i<SIZE; i++){
        for(let j=0; j<SIZE; j++){
            cells[i*SIZE + j].innerHTML = dataSource[i][j] == -1 ? "" : dataSource[i][j];
        }
    }
}

function goUp(dataSource){
    console.log("go up", dataSource);
    for(let i=0; i<SIZE; i++){
        // row = dataSource[i];
        dataSource[i] = mergeRow(dataSource[i]);
    }
    console.log(dataSource);
    // console.log(mergeRow(dataSource, 0));
}

function goLeft(dataSource){
    console.log("go up", dataSource);
    for(let i=0; i<SIZE; i++){
        // row = dataSource[i];
        dataSource[i] = mergeRow(dataSource[i]);
    }
    console.log(dataSource);
    // console.log(mergeRow(dataSource, 0));
}

function goRight(dataSource){
    for(let i=0; i<SIZE; i++){
        // row = dataSource[i];
        let temp = mergeRow(dataSource[i].reverse());
        dataSource[i] = temp.reverse();
    }
}

// 
function mergeRow(row1){
    // let row = [].concat(row1);
    // let i=0, j=1;
    // while(j < SIZE){// 实际就是4
    //     if(row[i] == -1){
    //         for(let k=j; k<4; k++){
    //             if(row[k] !== -1){
    //                 // 合并相加的逻辑， 每合并一次1；剩余格子数-1
    //                 if(i>0 && row[k] === row[i-1]){
    //                     row[i-1] *= 2; // 合并相加
    //                     leaveCellCount++;
    //                 } else {
    //                     row[i] = row[k];
    //                     i++;
    //                 }
    //                 row[k] = -1;
    //                 j = k+1;
    //             }else{
    //                 j++;
    //             }
    //         }
    //     }else{
    //         // i++;
    //         // j++;
    //         for(let k=j; k<4; k++){
    //             if(row[k] !== -1){
    //                 // 合并相加的逻辑， 每合并一次1；剩余格子数-1
    //                 if(row[k] === row[i]){
    //                     row[i] *= 2; // 合并相加
    //                     leaveCellCount++;
    //                     row[k] = -1;
    //                     j = k+1;
    //                     i++;
    //                 } else if(k-i > 0){
    //                     row[i+1] = row[k];
    //                     i++;
    //                     row[k] = -1;
    //                     j = k+1;
    //                 } else {
    //                     i++;
    //                     j++;
    //                 }       
                  
    //             }else{
    //                 j++;
    //             }
    //         }
    //     }
    // }
    let row = squeezeRow(row1);
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

// console.log(squeezeRow([2, -1, 2, -1]));