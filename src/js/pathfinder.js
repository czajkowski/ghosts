// based on: http://www.briangrinstead.com/blog/astar-search-algorithm-in-javascript
function Pathfinder() {
    'use strict';

    var astar = {};

    //#########################################################################
    // FUNCTIONS
    //#########################################################################

    function cloneMap (map) {
        var clone = [];

        map.forEach(function (col) {
            clone.push(col.slice(0));
        });

        return clone;
    }

    function findAreas (map, predicate) {
        var col, row, areas = [];

        for (col = 0; col < map[0].length; col++) {
            for (row = 0; row < map.length; row++) {
                if (predicate(map[row][col])) {
                    areas.push({
                        x : col,
                        y : row
                    });
                }
            }
        }

        return areas;
    }

    function findNextDestination (map) {
        var dots = findAreas(map, function (val) {
            return val === Map.DOT || val === Map.BIG_DOT;
        });

        // Select random dot
        if (dots.length) {
            return dots[Math.floor(Math.random() * dots.length)];
        }

        return null;
    }

    function findRandomDestination (map) {
        var areas = findAreas(map, function (val) {
            return val !== Map.WALL;
        });

        // Select random area
        if (areas.length) {
            return areas[Math.floor(Math.random() * areas.length)];
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

    astar._isCakemanUnreachable = function (node) {
        return node.value > Map.BIG_DOT;
    };

    astar._calculateCakemanPromotion = function (node) {
        if (node.value === Map.DOT || node.value === Map.BIG_DOT) {
            return 1;
        }

        return 10;
    };

    astar._isGhostUnreachable = function (node) {
        return node.value === Map.WALL;
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

        var openList   = [],
            closedList = [],
            lowInd,
            currentNode,
            i,
            curr,
            ret,
            neighbors,
            neighbor,
            gScore,
            gScoreIsBest;

        openList.push(start);

        while(openList.length > 0) {
            lowInd = 0;
            for(i = 0; i < openList.length; i++) {
                if (openList[i].f < openList[lowInd].f) {
                    lowInd = i;
                }
            }
            currentNode = openList[lowInd];

            // End case -- result has been found, return the traced path
            if(currentNode.x === end.x && currentNode.y === end.y) {
                curr = currentNode;
                ret = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return ret.reverse();
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors
            astar._removeNode(openList, currentNode);
            closedList.push(currentNode);
            neighbors = astar.neighbors(map, currentNode);

            for(i = 0; i < neighbors.length; i++) {
                neighbor = neighbors[i];
                if (astar._containsNode(closedList, neighbor) || unreachabmeFn(neighbor)) {
                    // not a valid node to process, skip to next neighbor
                    continue;
                }

                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                gScoreIsBest = false;


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

        // No result was found
        return [];
    };

    astar.heuristic = function(nodeA, nodeB) {
        // Manhattan distance
        return Math.abs (nodeB.x - nodeA.x) + Math.abs (nodeB.y - nodeA.y);
    };

    astar.neighbors = function(map, node) {
        var ret = [],
            row = node.y,
            col = node.x;

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
    };

    //#########################################################################
    // METHODS
    //#########################################################################

    this.calculateCakemanPath = function (map, cakeman, ghosts) {
        var nodeList = [],
            dot;

        map = cloneMap(map),

        // Mark ghosts on map
        ghosts.forEach(function (ghost) {
            if (!ghost.dead) {
                map[ghost.y][ghost.x] = Map.GHOST;
            }
        });

        dot = findNextDestination(map);

        if (dot) {
            astar.prepare(map);
            nodeList = astar.calculatePath(
                map,
                map[cakeman.targetY][cakeman.targetX],
                map[dot.y][dot.x],
                astar._isCakemanUnreachable,
                astar._calculateCakemanPromotion
            );
        }

        return nodeList;
    };

    this.calculateGhostPath = function (map, ghost) {
        var nodeList = [],
            dot;

        map = cloneMap(map);
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

        map = cloneMap(map);
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
