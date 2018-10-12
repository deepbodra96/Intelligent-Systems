var ROW = 9;
var COL = 10;

function isValidCell(row, col){
    return (row >= 0) && (row < ROW) && (col >= 0) && (col < COL);
}

var rowNum = [-1, 0, 0, 1];
var colNum = [0, -1, 1, 0];

function makeArray(d1, d2, val) {
    var arr = [];
    for(i = 0; i < d2; i++) {
        arr.push(new Array(d1).fill(val));
    }
    return arr;
}

function breadth_first_search(mat, src, dest){
    if (!mat[src.x][src.y] || !mat[dest.x][dest.y])
        return Number.MAX_SAFE_INTEGER;

    var visited = makeArray(ROW, COL, false); 

    // Mark the source cell as visited 
    visited[src.x][src.y] = true; 

    // Create a queue for BFS
    var q = new Array(); 
      
    // distance of source cell is 0 
    var s = {pt:src, dist:0}; 
    q.push(s);  // Enqueue source cell 
  
    // Do a BFS starting from source cell 
    while (q.length != 0) { 
        var curr = q[0]; 
        var pt = curr.pt; 
  
        // If we have reached the destination cell, 
        // we are done 
        if (pt.x == dest.x && pt.y == dest.y) 
            return curr.dist; 
  
        // Otherwise dequeue the front cell in the queue 
        // and enqueue its adjacent cells 
        q.shift(); 

        for (var i = 0; i < 4; i++) {

            var row = pt.x + rowNum[i]; 
            var col = pt.y + colNum[i]; 
              
            // if adjacent cell is valid, has path and 
            // not visited yet, enqueue it. 
            if (isValidCell(row, col) && mat[row][col] &&  !visited[row][col]) 
            { 
                // mark cell as visited and enqueue it 
                visited[row][col] = true; 
                var Adjcell = {pt:{x:row, y:col}, dist: curr.dist + 1 }; 
                q.push(Adjcell); 
            } 
        } 
    }
    //return -1 if destination cannot be reached 
    return Number.MAX_SAFE_INTEGER;
}

function main() { 
    var mat = 
    [ 
        [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ], 
        [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 1 ], 
        [ 1, 1, 1, 0, 1, 1, 0, 1, 0, 1 ], 
        [ 1, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 0 ], 
        [ 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 ], 
        [ 1, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ], 
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] 
    ]; 
  
    var source = {x:0, y:0}; 
    var dest = {x:ROW-1, y:COL-1}; 
  
    var dist = breadth_first_search(mat, source, dest); 
  
    if (dist != Number.MAX_SAFE_INTEGER) console.log("Shortest Path is ", dist); 
    else console.log("Shortest Path doesn't exist"); 
  
    return 0; 
}

main();