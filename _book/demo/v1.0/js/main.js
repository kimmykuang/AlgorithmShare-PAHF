$(function() {
  //构造MAP对象
  var Points = new GraphNode(grid);
  // console.log(Points);
  var MAP = Points.getMap();
  // console.log(MAP);
  // MAP.arr  = grid;
  // MAP.rows = grid.length;
  // MAP.cols = grid[0].length;

  //构建table
  var grid_table = $('#grid_table');
  for (var i = 0; i < MAP.rows; i++) {
    //构造tr
    var tr = '<tr class="grid_table_tr">';
    for (var j = 0; j < MAP.cols; j++) {
      //构造td
      var td_id = 'grid_item_'+i+'_'+j;
      var td_class = MAP.arr[i][j] ? 'grid_item wall' : 'grid_item';
      var td = '<td id="'+td_id+'" class="'+td_class+'" data-x="'+i+'" data-y="'+j+'"></td>';
      tr += td;
    }
    tr += '</tr>';
    //append tr
    grid_table.append(tr);
  }

  //点击触发搜索
  $('.grid_item').on('click', function(e) {
    var x = Number($(this).attr('data-x'));
    var y = Number($(this).attr('data-y'));
    var point = {x: x, y: y};
    //不是障碍物的话
    if(!Points.isWall(point)) {
      //设置起始两点
      Points.setStartOrEndPoint(point);
      //进行路径搜索
      if(Points.start && Points.end) {
        var result   = searchRoad(Points.start, Points.end, MAP);
        var path     = result.path;
        var openList = result.openList;
        // //弹出Openlist最后一个节点
        // openList.pop();
        // //渲染open list
        // Points.setOpenListActive(openList);
        //弹出path的末尾一个节点：该节点就是end point
        path.pop();
        //渲染路径
        Points.setPathActivePoint(path);

      }
    }
  });
});