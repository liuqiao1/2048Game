1. html 4*4 宫格
2. CSS 内容 边框
3. js 
- 初始化：一个4*4二维数组，a[i][j] = -1；剩余格子数=16
- 开始游戏: 随机生成2个数字（2或者4）；随机生成两个矩阵位置；赋值；剩余格子数=14；
- repaint
- 监听键盘上下左右键，执行action
- 以左为例子：
// 移动 合并相加
for(let s=0; s<a.length; s++>){
    i=0, j=0
    while(j<a[s].length>){// 实际就是4
        if(a[s][i] == -1){
            for(let k=j, k<4; k++){
                if(a[s][k] !== -1){
                    // 合并相加的逻辑， 每合并一次1；剩余格子数-1
                    a[s][i] = a[s][k];
                    i++;
                    j = k+1;
                }
            }
        }else{
            i++;
        }
    }
}
if(剩余格子数<=0)game over;
else go on~

// 随机生成2/4，坐标x,y, 
while(a[x][y] == -1){
    随机生成坐标 x, y (x,y均在0-3整数)
}
剩余格子数+1

//repaint

