/* jshint ignore:start */
// based on: http://www.briangrinstead.com/blog/astar-search-algorithm-in-javascript
function Pathfinder() {

    var astar = {};

    //#########################################################################
    // FUNCTIONS
    //#########################################################################

    function cloneMap (map) {
        var clone = [], i;

        map.forEach(function (col) {
            clone.push(col.slice(0));
        });

        return clone;
    }

    //#########################################################################
    // A START PATH FINDING ALGORITHM
    //#########################################################################

    astar._removeNode = function (list, node) {
        var i;
        for(i = 0; i<list.length; i++) {
            if (list[i].x === node.x && list[i].y === node.y) {
                list.splice(i, 1);
                return;
            }
        }
    };

    astar._containsNode = function (list, node) {
        var i;
        for(i = 0; i<list.length; i++) {
            if (list[i].x === node.x && list[i].y === node.y) {
                return true;
            }
        }
        return false;
    };

    // 0 - empty road
    // 1 - portal
    // 3 - dot
    // 4 - big dot
    // 8 - door
    // 9 - wall
    // 10 - ghost
    // 100 - pacman
    astar._isUnreachable = function (node) {
        return node.value > 4;
    };

    // Directions
    // 0 - top
    // 1 - right
    // 2 - down
    // 3 - left
    astar._convertToPath = function (start, nodeList) {
        var lastCol = start.x,
            lastRow = start.y,
            i,
            path = [];

        for (i = 0; i < nodeList.length; i++) {
            if (lastCol < nodeList[i].x) {
                // right
                path.push(1);
            }

            if (lastCol > nodeList[i].x) {
                // left
                path.push(3);
            }

            if (lastRow < nodeList[i].y) {
                // down
                path.push(2);
            }

            if (lastRow > nodeList[i].y) {
                // up
                path.push(0);
            }


            lastCol = nodeList[i].x;
            lastRow = nodeList[i].y;
        }

        return path;
    };

    astar.prepare = function (map) {
        var col, row;
        for(row = 0; row < map.length; row++) {
            for(col = 0; col < map[0].length; col++) {
                map[row][col] = {
                    value : map[row][col],
                    x : col,
                    y : row,
                    f : 0,
                    g : 0,
                    h : 0,
                    debug : '',
                    parent : null
                };
            }
        }

        return map;
    };

    astar.search = function (map, start, end) {

        var openList   = [];
        var closedList = [];
        openList.push(start);

        while(openList.length > 0) {

            // Grab the lowest f(x) to process next
            var lowInd = 0;
            for(var i = 0; i < openList.length; i++) {
                if (openList[i].f < openList[lowInd].f) {
                    lowInd = i;
                }
            }
            var currentNode = openList[lowInd];

            // End case -- result has been found, return the traced path
            if(currentNode.x === end.x && currentNode.y === end.y) {
                var curr = currentNode;
                var ret = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return astar._convertToPath(start, ret.reverse());
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors
            astar._removeNode(openList, currentNode);
            // openList.removeGraphNode(currentNode);

            closedList.push(currentNode);
            var neighbors = astar.neighbors(map, currentNode);

            for(var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];
                if (astar._containsNode(closedList, neighbor) || astar._isUnreachable(neighbor)) {
                // if(closedList.findGraphNode(neighbor) || neighbor.isWall()) {
                    // not a valid node to process, skip to next neighbor
                    continue;
                }

                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                var gScoreIsBest = false;


                if (!astar._containsNode(openList, neighbor)) {
                // if(!openList.findGraphNode(neighbor)) {
                    // This the the first time we have arrived at this node, it must be the best
                    // Also, we need to take the h (heuristic) score since we haven't done so yet

                    gScoreIsBest = true;
                    neighbor.h = astar.heuristic(neighbor, end);
                    openList.push(neighbor);

                } else if (gScore < neighbor.g) {
                    // We have already seen the node, but last time it had a worse g (distance from start)
                    gScoreIsBest = true;
                }

                if(gScoreIsBest) {
                    // Found an optimal (so far) path to this node.  Store info on how we got here and
                    //  just how good it really is...
                    neighbor.parent = currentNode;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
                }
            }
        }

        // No result was found -- empty array signifies failure to find path
        return [];
    };

    astar.heuristic = function(nodeA, nodeB) {
        // This is the Manhattan distance
        var d1 = Math.abs (nodeB.x - nodeA.x);
        var d2 = Math.abs (nodeB.y - nodeA.y);
        return d1 + d2;
    },

    astar.neighbors = function(map, node) {
        var ret = [];
        var row = node.y;
        var col = node.x;

        if(map[row-1] && map[row-1][col]) {
            ret.push(map[row-1][col]);
        }
        if(map[row+1] && map[row+1][col]) {
            ret.push(map[row+1][col]);
        }
        if(map[row][col-1] && map[row][col-1]) {
            ret.push(map[row][col-1]);
        }
        if(map[row][col+1] && map[row][col+1]) {
            ret.push(map[row][col+1]);
        }
        return ret;
    }

    //#########################################################################
    // METHODS
    //#########################################################################

    // 0 - empty road
    // 1 - portal
    // 3 - dot
    // 4 - big dot
    // 8 - door
    // 9 - wall
    // 10 - ghost
    // 100 - pacman

    this.calculatePacmanPath = function (map, pacman, ghosts) {
        var _map = cloneMap(map);

        ghosts.forEach(function (ghost) {
            _map[ghost.y][ghost.x] = 10;
        });

        _map = astar.prepare(_map);

        return astar.search(_map, _map[pacman.y][pacman.x], _map[1][1]);
    };

}
