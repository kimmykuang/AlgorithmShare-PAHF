var GraphSearch = (function() {

    /**
     * astar搜索实现对象
     * @type {Object}
     */
    var astar = {
        grid: null,
        init: function() {

        },
        /**
         * 搜索
         * @param  {[GridNode]} start [description]
         * @param  {[GridNode]} end   [description]
         * @return {[Array]}       [description]
         */
        search: function(start, end) {

        },
        inClosedList: function(node) {

        },
        inOpenList: function(node) {

        },
        heuristics: {
            manhattan: function(posA, posB, d = 1) {

            }
        },
    };

    /**
     * graph图形对象构造函数
     * @param  {[type]} grid [description]
     * @return {[type]}      [description]
     */
    function Graph(grid) {
        this.nodes = [];
        this.grid = [];
        this.init(grid);
    };

    Graph.prototype = {
        init: function(grid) {

        },
        neighbors: function(node) {

        }
    };

    /**
     * 图形上每个点都是一个GridNode对象
     */
    function GridNode(x, y, type) {
        this.x = x;
        this.y = y;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.type = type;
    }

    GridNode.prototype = {
        /**
         * 判断节点是否是障碍物
         * @param  {[type]}  node [description]
         * @return {Boolean}      [description]
         */
        isWall: function(node) {
            var GridNodeType = {
                open: 0,
                wall: 1
            };
            return node.type === GridNodeType.wall;
        }
    };

    return {
        search: astar.search,
        Graph: Graph
    };

})();