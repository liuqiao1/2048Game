const ds = [[1,2,3], [4,5,5],[7,8,9]];
// console.log(ds);

function reverse(dataSource){
    let ds = [...dataSource];
    console.log("ds:", ds);
    for(let i=0; i<3; i++){
        for(let j=i+1; j<3; j++){
            let temp = ds[i][j];
            // console.log(temp)
            ds[i][j] = ds[j][i];
            // ds[j][i] = "a";
            ds[j][i] = temp;
            console.log("交换", ds[i][j], ds[j][i]);
        }
    }
    // console.log("reverse finish,", ds);
    return ds;
}

console.log(hasSame(ds));

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