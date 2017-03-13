var GraphNode = function(grid) {
    this.start = null;
    this.end   = null;
    var path  = [];
    var map   = null;
    this.setStart = function(point) {
        if(this.start) {
            this.removePointActive(this.start);
        }
        this.start = point;
        this.addPointActive(this.start);
    };
    this.setEnd = function (point) {
        this.end = point;
        this.addPointActive(this.end);
    };
    this.setStartOrEndPoint = function(point) {
        if(!this.start) {
            this.setStart(point);
        }
        else if(!this.end) {
            this.setEnd(point);
        } else {
            this.setStart(this.end);
            this.setEnd(point);
        }
    };
    this.init(grid);
}

GraphNode.prototype = {
    init: function(grid) {
        if(grid && grid instanceof Array) {
            this.map = {
                arr: grid,
                rows: grid.length,
                cols: grid[0].length
            };
        }
    },
    getMap: function() {
        return this.map;
    },
    isWall: function(point) {
        var x = Number(point.x);
        var y = Number(point.y);
        return this.map.arr[x][y];
    },
    addPointActive: function(point) {
        this.getNodeByPoint(point).removeClass('active').addClass('active');
    },
    removePointActive: function(point) {
        this.getNodeByPoint(point).removeClass('active');
    },
    getNodeByPoint: function(point) {
        var td_id = 'grid_item_'+point.x+'_'+point.y;
        return $('#'+td_id);
    },
    removePathActivePoint: function() {
        //消除之前的路径
        if(this.path) {
            for (var i = 0; i < this.path.length; i++) {
                var point = this.path[i];
                this.removePointActive(point);
            }
        }
    },
    setPathActivePoint: function(path) {
        this.removePathActivePoint();
        this.path = path;
        //对新的路径进行展示
        if(this.path) {
            for (var j = 0; j < path.length; j++) {
                point = path[j];
                this.addPointActive(point);
            }
        }
    }
    /*
    ,
    removeOpenListActive: function() {
        $('.grid_item').removeClass('weight5').html('');
    },
    setOpenListActive: function(list) {
        this.removeOpenListActive();
        for (var i = 0; i < list.length; i++) {
            var point = list[i];
            var dom = this.getNodeByPoint(point);
            //添加样式 & 展示F,G,H值
            dom.removeClass('weight5').addClass('weight5');
            this.setText(dom, point);
        }
    },
    setText: function(dom, point) {
        var html = '<span class="grid_text_class_G">'+point.G+'</span><span class="grid_text_class_H">'+point.H+'</span><span class="grid_text_class_F">'+point.F+'</span>';
        dom.html(html);
    }
    */
};