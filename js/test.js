const ds = [[1,2,3], [4,5,6],[7,8,9]];
console.log(ds);

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

console.log(reverse(ds));