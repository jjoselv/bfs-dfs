const { performance } = require('perf_hooks');
const { convertMiliseconds, format } = require('./utils');
/**
When to chose BFS vs DFS (rules of thumb)?

That heavily depends on the structure of the search tree and the number and location of solutions (aka searched-for items).

- If you know a solution is not far from the root of the tree, a breadth first search (BFS) might be better.
- If the tree is very deep and solutions are rare, depth first search (DFS) might take an extremely long time, but BFS could be faster.
- If the tree is very wide, a BFS might need too much memory, so it might be completely impractical.
- If solutions are frequent but located deep in the tree, BFS could be impractical.
- If the search tree is very deep you will need to restrict the search depth for depth first search (DFS), anyway (for example with iterative deepening).
*/

class Node {
    constructor(id, children) {
        this._id = id;
        this._children = children || [];
    }

    get id() {
        return this._id;
    }

    get children() {
        return this._children;
    }

    addChild (child) {
        this._children.push(child);
    }

    getChildAt (index) {
        return this._children[index];
    }
}

class idGenerator {
    constructor(startingId) {
        this._id = startingId || 0;
    }
    nextId() {
        return this._id++;
    }
};

function generateTree({breath, depth}, generator) {
    const _generator = generator || new idGenerator();
    let currentDepth = depth;
    const node = new Node(_generator.nextId());
    if (depth > 0) {
        for (let i = 1; i <= breath; i++) {
            node.addChild(generateTree({breath, depth: depth - 1}, _generator));
        }
    }
    return node;
}

// BFS Algorithm
// Start at root (Queue)
// Queue all children
// shift 1
// has children? yes? queue them, no? shift 1; repeat this lines
//

function BFS(sourceNode, destinationId, verbose) {
    verbose && console.log("searching for: ", destinationId);
    if (sourceNode.id === destinationId)
        return true;
    const queue = [sourceNode];
    verbose && console.log("queued: ", sourceNode.id)
    while (queue.length) {
        let cur = queue.shift();
        verbose && console.log("unqueued: ", cur.id);
        cur.children.forEach(element => {
            queue.push(element);
            verbose && console.log("queued: ", element.id);
        });
        if (cur.id === destinationId) {
            verbose && console.log(destinationId, "found!");
            return true;
        }
    }
    return false;
}


// DFS
// Start at root
// I am? no, push, yes? return true
// for each children:
// I am? no, push, yes? return true

// I am? no, push in stack, yes, return true;

function calculateTotalNodes(breath, depth) {
    return ((Math.pow(breath, depth+1)-1) / (breath-1));
}

// Build tree
const breath = 3;
const depth = 10;
const rootNode = generateTree({breath, depth})
const totalNodes = calculateTotalNodes(breath, depth);
console.log('total nodes: ', totalNodes)
const nodeToSearch = Math.floor(Math.random() * totalNodes);
console.log('nodeToSearch: ', nodeToSearch)
// Run BFS
let before = performance.now();
let found = BFS(rootNode, nodeToSearch);
let after = performance.now();
let duration = after - before;
console.log("BFS Took: ", duration, "miliseconds , found: ",found);

process.exit(0)

// Run DFS
before = performance.now();
found = DFS(rootNode, nodeToSearch);
after = performance.now();
duration = after - before;
console.log("DFS Took: ", format(convertMiliseconds(duration)), ", found: ",found);