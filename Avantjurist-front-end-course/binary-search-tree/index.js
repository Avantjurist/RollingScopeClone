function Node(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
}

function BinarySearchTree() {
    this._root = null;
}

BinarySearchTree.prototype.root = function() {
    if (this._root == null) {
        return null;
    } else {
        return this._root.value;
    }
}

BinarySearchTree.prototype.insert = function(key, value) {
    var insertNode = new Node(key, value);

    if (!this._root) {
        this._root = insertNode;
        return this;
    }

    var currentNode = this._root;

    while (currentNode) {
        if (key < currentNode.key) {
            if (!currentNode.left) {
                currentNode.left = insertNode;
                insertNode.parent = currentNode;
                return this;
            } else {
                currentNode = currentNode.left;
            }
        } else {
            if (!currentNode.right) {
                currentNode.right = insertNode;
                insertNode.parent = currentNode;
                return this;
            } else {
                currentNode = currentNode.right;
            }
        }
    }
}

BinarySearchTree.prototype.search = function(key) {
    var currentNode = this._root;

    if (!this._root) {
        return undefined;
    }

    while (currentNode) {
        if (key < currentNode.key) {
            if (!currentNode.left) {
                return undefined;
            } else {
                currentNode = currentNode.left;
            }
        } else if (currentNode.key == key) {
            return currentNode.value;
        } else {
            if (!currentNode.right) {
                return undefined;
            } else {
                currentNode = currentNode.right;
            }
        }
    }
}


BinarySearchTree.prototype.traverse = function(order) {
    var arr = [];

    function infixTraverse(currentNode) {
        if (currentNode.left) {
            infixTraverse(currentNode.left);
        }
        arr.push(currentNode.value);
        if (currentNode.right) {
            infixTraverse(currentNode.right);
        }
    }

    function backInfixTraverse(currentNode) {
        if (currentNode.right) {
            backInfixTraverse(currentNode.right);
        }
        arr.push(currentNode.value)
        if (currentNode.left) {
            backInfixTraverse(currentNode.left);
        }
    }
    currentNode = this._root;
    if (!this._root) {
        return undefined;
    }
    if (order) {
        infixTraverse(currentNode);
        return arr;
    } else {
        backInfixTraverse(currentNode);
        return arr;
    }
}


BinarySearchTree.prototype.contains = function(value) {
    function infixContains(currentNode) {
        if (currentNode == null) {
            return false;
        }
        return (currentNode.value == value ||
            infixContains(currentNode.left) ||
            infixContains(currentNode.right))
    }

    return !!infixContains(this._root);
}

BinarySearchTree.prototype.verify = function() {
    currentNode = this._root;
    var stack = [];
    var prev = null;
    while (currentNode || stack.length) {
        if (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        } else {
            if (prev && stack[stack.length - 1].key <= prev.key) {
                return false;
            }
            prev = stack[stack.length - 1];
            currentNode = prev.right;
            stack.pop();
        }
    }
    return true;
}

BinarySearchTree.prototype.delete = function(key) {
    currentNode = this._root;
    var deletedNode;

    function minimum(x) {
        if (x.left == null) {
            return x;
        }
        return minimum(x.left);
    }

    function next(x) {
        if (x.right != null) {
            return minimum(x.right);
        }
        var y = x.parent;
        while (y != null && x == y.right) {
            x = y;
            y = y.parent;
        }
        return y;
    }
    while (!deletedNode) {
        if (currentNode.key == key) {
            deletedNode = currentNode;
        } else if (currentNode.key < key) {
            currentNode = currentNode.right;
        } else {
            currentNode = currentNode.left;
        }
    }
    if (deletedNode.left == null && deletedNode.right == null) {
        if (deletedNode.parent.left == deletedNode) {
            deletedNode.parent.left = null;
            return this;
        }
        if (deletedNode.parent.right == deletedNode) {
            deletedNode.parent.right = null;
            return this;
        }
    } else if (deletedNode.left == null || deletedNode.right == null) {
        if (deletedNode.left == null) {
            if (deletedNode.parent.left == deletedNode) {
                deletedNode.parent.left = deletedNode.right;
            } else {
                deletedNode.parent.right = deletedNode.right;
            }
            deletedNode.right.parent = deletedNode.parent;
            return this;
        } else {
            if (deletedNode.parent.left == deletedNode) {
                deletedNode.parent.left = deletedNode.left;
            } else {
                deletedNode.parent.right == deletedNode.left;
            }
            deletedNode.left.parent = deletedNode.parent;
            return this;
        }
    } else {
        var insertedNode = next(deletedNode);

        if (insertedNode.parent.left == insertedNode) {
            insertedNode.parent.left = insertedNode.right;
            deletedNode.key = insertedNode.key;
            deletedNode.value = insertedNode.value;
            if (insertedNode.right != null) {
                insertedNode.right.parent = insertedNode.parent;
            }
            return this;
        } else {
            insertedNode.parent.right = insertedNode.right;
            if (insertedNode.right != null) {
                insertedNode.right.parent = insertedNode.parent;
            }
            return this;
        }
    }
}
