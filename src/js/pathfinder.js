/* jshint ignore:start */
// based on: http://www.briangrinstead.com/blog/astar-search-algorithm-in-javascript
function Pathfinder() {

    var astar = {},
        dotty = {};

    //#########################################################################
    // FUNCTIONS
    //#########################################################################

    function cloneMap (map) {
        var clone = [], i;

        map.forEach(function (col) {
            clone.push(col.slice(0));
        });

        return clone;
    };

    function findNextDestination (map) {
        var dots = [], col, row;

        for (col = 0; col < map[0].length; col++) {
            for (row = 0; row < map.length; row++) {
                if (map[row][col] === 3 || map[row][col] === 4) {
                    dots.push({
                        x : col,
                        y : row
                    })
                }
            }
        }
        if (dots.length) {
            return dots[Math.floor(Math.random() * dots.length)];
        }

        return null;
    }

    function findRandomDestination (map) {
        var dots = [], col, row;

        for (col = 0; col < map[0].length; col++) {
            for (row = 0; row < map.length; row++) {
                if (map[row][col] !== 9) {
                    dots.push({
                        x : col,
                        y : row
                    })
                }
            }
        }
        if (dots.length) {
            return dots[Math.floor(Math.random() * dots.length)];
        }

        return null;
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
    // 100 - cakeman
    astar._iscakemanUnreachable = function (node) {
        return node.value > 4;
    };

    astar._calculatecakemanPromotion = function (node) {
        if (node.value === 3 || node.value === 4) {
            return 1;
        }

        return 1;
    };

    astar._isGhostUnreachable = function (node) {
        return node.value === 9;
    };

    astar._calculateGhostPromotion = function (node) {
        return 1;
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
                    parent : null
                };
            }
        }

        return map;
    };

    astar.calculatePath = function (map, start, end, unreachabmeFn, promotionFn) {

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

                return ret.reverse();

            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors
            astar._removeNode(openList, currentNode);

            closedList.push(currentNode);
            var neighbors = astar.neighbors(map, currentNode);

            for(var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];
                if (astar._containsNode(closedList, neighbor) || unreachabmeFn(neighbor)) {
                    // not a valid node to process, skip to next neighbor
                    continue;
                }

                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                var gScoreIsBest = false;


                if (!astar._containsNode(openList, neighbor)) {
                    // This is the first time we have arrived at this node, it must be the best
                    // Also, we need to take the h (heuristic) score since we haven't done so yet

                    gScoreIsBest = true;
                    // promote pathas that contain dots
                    neighbor.h = astar.heuristic(neighbor, end) * promotionFn(neighbor);
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
        if(map[row] && map[row][col-1]) {
            ret.push(map[row][col-1]);
        }
        if(map[row] && map[row][col+1]) {
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
    // 100 - cakeman

    this.calculateCakemanPath = function (map, cakeman, ghosts) {
        var nodeList = [],
            dot;

        map = cloneMap(map),

        ghosts.forEach(function (ghost) {
            if (!ghost.dead) {
                map[ghost.y][ghost.x] = 10;
            }
        });

        dot = findNextDestination(map);
        if (dot) {
            astar.prepare(map);
            nodeList = astar.calculatePath(
                map,
                map[cakeman.targetY][cakeman.targetX],
                map[dot.y][dot.x],
                astar._iscakemanUnreachable,
                astar._calculatecakemanPromotion
            );
        }

        return nodeList;
    };

    this.calculateGhostPath = function (map, ghost) {
        var nodeList = [],
            dot;

        map = cloneMap(map),

        dot = findRandomDestination(map);
        if (dot) {
            astar.prepare(map);
            nodeList = astar.calculatePath(
                map,
                map[ghost.targetY][ghost.targetX],
                map[dot.y][dot.x],
                astar._isGhostUnreachable,
                astar._calculateGhostPromotion
            );
        }

        return nodeList;
    };

    this.calculatePath = function (map, target, destination) {
        var nodeList = [];

        map = cloneMap(map),
        astar.prepare(map);
        nodeList = astar.calculatePath(
            map,
            map[target.y][target.x],
            map[destination.y][destination.x],
            astar._isGhostUnreachable, // only walls
            function () { return 1; } // no promotion
        );

        return nodeList;
    };

}
