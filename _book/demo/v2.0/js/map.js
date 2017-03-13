function Map(grid) {
    var arr = [];
    var rows = 0;
    var cols = 0;
    if(grid && grid instanceof Array) {
        arr = grid;
        rows = grid.length;
        cols = grid[0].length;
    }
    this.arr = arr;
    this.rows = rows;
    this.cols = cols;
    var path = [];
    var startPoint = null;
    var endPoint = null;
    
};

Map.prototype= {
    init: function() {

    }
};

//判断是否是障碍物
Map.prototype.isWall = function(point) {
    var x = Number(point.x);
    var y = Number(point.y);
    return this.arr[x][y];
};