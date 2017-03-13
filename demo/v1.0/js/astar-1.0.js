/**
 * 网格搜索算法
 * @param  {[object]} start [起点]
 * @param  {[object]} end   [终点]
 * @param  {[object]} MAP   [地图对象]
 * @return {[type]}       [description]
 */
function searchRoad(start, end, MAP) {
    var start_x   = Number(start.x);
    var start_y   = Number(start.y);
    var end_x     = Number(end.x);
    var end_y     = Number(end.y);
    var openList  = [],            //开启列表
        closeList = [],            //关闭列表
        result    = [],            //结果数组
        result_index;              //结果数组在开启列表中的序号
    var D         = 10;            //直线移动代价
    var ArcD      = 14;            //斜对角移动代价

    //把当前点加入到开启列表中，并且G是0
    openList.push({x:start_x,y:start_y,G:0});

    //遍历openList列表直至找到终点或直至openList空也没有找到终点，返回
    do {
        var currentPoint  = openList.pop();
        closeList.push(currentPoint);
        var surroundPoint = SurroundPoint(currentPoint);
        for(var i in surroundPoint) {
            var item = surroundPoint[i];                   //获得周围的八个点
            if (
                item.x >= 0 &&                               //判断是否在地图上
                item.y >= 0 &&
                item.x < MAP.rows &&
                item.y < MAP.cols &&
                MAP.arr[item.x][item.y] != 1 &&            //判断是否是障碍物
                !existList(item, closeList)                //判断是否在关闭列表中
                // && MAP.arr[item.x][currentPoint.y]!=1 &&   //判断之间是否有障碍物，如果有障碍物是过不去的
                // MAP.arr[currentPoint.x][item.y]!=1
            ) {
                //g 到父节点的位置
                //如果是上下左右位置的则g等于10，斜对角的就是14
                var g = currentPoint.G + ((currentPoint.x - item.x) * (currentPoint.y - item.y) == 0 ? D : ArcD);
                //如果不在开启列表中
                if (!existList(item, openList)) {
                    //计算H，通过水平和垂直距离进行确定
                    item['H'] = Heuristics(item, end_x, end_y, D, ArcD);
                    item['G'] = g;
                    item['F'] = item.H + item.G;
                    item['parent'] = currentPoint;
                    openList.push(item);
                }
                //存在在开启列表中，比较目前的g值和之前的g的大小
                else {
                    var index = existList(item, openList);
                    //如果当前点的g更小，表明从邻近节点的父节点走当前点更近
                    if (g < openList[index].G) {
                        openList[index].parent = currentPoint;
                        openList[index].G      = g;
                        openList[index].F      = g + openList[index].H;
                    }
                }
            }
        }
        //如果开启列表空了，没有通路，结果为空
        if(openList.length == 0) {
            break;
        }
        openList.sort(sortF);//这一步是为了循环回去的时候，找出 F 值最小的, 将它从 "开启列表" 中移掉
    }while(!(result_index = existList({x:end_x,y:end_y},openList)));

    //判断结果列表是否为空
    if(!result_index) {
        result = [];
    }
    else {
        var currentObj = openList[result_index];
        do {
            //把路径节点添加到result当中
            result.unshift({
                x:currentObj.x,
                y:currentObj.y
            });
            currentObj = currentObj.parent;
        }while (currentObj.x != start_x || currentObj.y != start_y);

    }
    return {
        path: result,
        openList: openList
    };
}

//用F值对数组排序
function sortF(a,b) {
    return b.F - a.F;
}

//获取周围八个点的值
function SurroundPoint(curPoint) {
    var x = Number(curPoint.x), y = Number(curPoint.y);  // "1" + 1 => "11" so keng
    return [
        {x:x-1,y:y-1},
        {x:x,y:y-1},
        {x:x+1,y:y-1},
        {x:x+1,y:y},
        {x:x+1,y:y+1},
        {x:x,y:y+1},
        {x:x-1,y:y+1},
        {x:x-1,y:y}
    ];
}

//判断点是否存在在列表中，是的话返回的是序列号
function existList(point,list) {
    for(var i in list) {
        if(point.x==list[i].x && point.y==list[i].y) {
            return i;
        }
    }
    return false;
}

//启发式函数
function Heuristics(item, end_x, end_y, D, D2) {
    var dx = Math.abs(item.x - end_x);
    var dy = Math.abs(item.y - end_y);
    // return D * (dx + dy);                                     //曼哈顿距离
    // return D * Math.max(dx, dy);                              //对角线距离，直线和斜对角移动代价都是D
    return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);      //对角线距离，直线移动是D斜对角是
}