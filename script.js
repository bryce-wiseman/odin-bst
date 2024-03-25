class Node {
    constructor(val) {
        this.value = val
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor() {
        this.root = null
    }

    //takes array and turns it into balanced BST, returns level 0 node
    buildTree(array) {
        let middle = Math.floor(array.length / 2)
        this.root = new Node(array[middle])
        let currentNode = this.root
        if (array.length == 1) {
            return array
    }   else if (array.length == 2) {
            currentNode.left = new Node(array[0])
    }   else if (array.length == 3) {
            currentNode.left = new Node(array[0])
            currentNode.right = new Node(array[2])
    }   else if (array.length == 4) {
            currentNode.left = new Node(array[1])
            currentNode.right = new Node(array[3])
            currentNode = currentNode.left
            currentNode.left = new Node(array[0])
    }   else if (array.length >= 5) {
    //setting left nodes with their child nodes
        for (let i = middle; i > 0; i -= 2) {
        if (i == 1) {
            currentNode.left = new Node(array[i-1])
        } else {
            currentNode.left = new Node(array[i-2])
            currentNode = currentNode.left
            currentNode.right = new Node(array[i-1])
        }
    }
    currentNode = this.root
        for (let i = middle; i < (array.length - 1); i += 2) {
        if (i == (array.length - 2)) {
            currentNode.right = new Node(array[i+1])
        } else {
            currentNode.right = new Node(array[i+2])
            currentNode = currentNode.right
            currentNode.left = new Node(array[i+1])
        }
    }
    }
    return this.root
    } 

    //insert value into tree
    insert(value) {
        let newNode = new Node(value)
        let currentNode = this.root
        //function to check values and travel to new node
        function checkVal(newNode, currentNode) {
            if (newNode.value == currentNode.value) {
                return "That value already exists!"
            }
            else if (newNode.value < currentNode.value) {
                if (currentNode.left != null) {
                    currentNode = currentNode.left
                    checkVal(newNode, currentNode)
                } else {
                    currentNode.left = newNode
                }
            } else if (newNode.value > currentNode.value) {
                if (currentNode.right != null) {
                    currentNode = currentNode.right
                    checkVal(newNode, currentNode)
                } else {
                    currentNode.right = newNode
                }
            }
        }
        checkVal(newNode, currentNode)
        return this.root
    }

    //remove value from tree
    deleteItem(value) {
        let currentNode = this.root
        let toDelete = value
        //function to check values and travel to new node
        function checkVal(toDelete, currentNode) {
            if (toDelete == currentNode.value) {
                console.log("You can't delete the root!")
                return
            } else if (currentNode.left != null || currentNode.right != null) {
                if (currentNode.left != null) {
                    if (toDelete == currentNode.left.value) {
                        console.log('deleting item')
                        if (currentNode.left.left != null) {
                            currentNode.left = currentNode.left.left
                        } else if (currentNode.left.right != null) {
                            currentNode.left = currentNode.left.right
                        }
                        console.log("tree after deleting value:" + currentNode)
                        return
                }
            } else if (currentNode.right != null){
                if (toDelete == currentNode.right.value) {
                    console.log('deleting item')
                    if (currentNode.right.right != null) {
                        currentNode.right = currentNode.right.right
                    } else if (currentNode.right.left != null) {
                        currentNode.right = currentNode.right.left
                    }   
                    console.log("tree after deleting value:" + this.root)
                    return
            }   
        } else {
            if (toDelete < currentNode.value) {
                if (currentNode.left != null) {
                    currentNode = currentNode.left
                    checkVal(toDelete, currentNode)
                } else {
                    console.log('cannot locate value to delete')
                    return 
                }
            } else if (toDelete > currentNode.value) {
                if (currentNode.right != null) {
                    currentNode = currentNode.right
                    checkVal(toDelete, currentNode)
                } else {
                    console.log('cannot locate value to delete')
                    return 
                }
            }
        }

            } else if (currentNode.left == null && currentNode.right == null) {
                console.log('cannot locate value to delete')
                return
            }
        }
        checkVal(toDelete, currentNode)
    }

    //find value in tree, returns node
    find(value) {
        let currentNode = this.root
        let toCheck = value
        let result = ""

        function checkVal(toCheck, currentNode) {
                if (toCheck == currentNode.value) {
                    result = "found it!"
                    return result, currentNode
            } else if (toCheck < currentNode.value) {
                    if (currentNode.left != null) {
                        currentNode = currentNode.left
                        return checkVal(toCheck, currentNode)
                    } else {
                        result = "cannot locate value"
                        return result
                    }
                } else if (toCheck > currentNode.value) {
                    if (currentNode.right != null) {
                        currentNode = currentNode.right
                        return checkVal(toCheck, currentNode)
                    } else {
                        result = "cannot locate value"
                        return result
                    }
            }
        }
        let finalVal = checkVal(toCheck, currentNode)
        return finalVal
    }

    //travels tree in breadth-first level order and provides each node to call back function, if no callback returns array of values
    levelOrder(callback) {
        let currentNode = this.root
        let nodeArr = []
        let valArr = []
        nodeArr.push(currentNode)
        fillNodeArr()

        function fillNodeArr() {
            for (let i = 0; i < nodeArr.length; i++) {
                if (nodeArr[i].left != null) {
                    nodeArr.push(nodeArr[i].left)
                }
                if (nodeArr[i].right != null) {
                    nodeArr.push(nodeArr[i].right)
                }
            }
        }
        nodeArr.forEach((node) => valArr.push(node.value))
        return valArr
    }

    //depth first inOrder func
    inOrder(node = this.root) {
        let valArr = []

        function actualInOrder(node) {
            if (node == null) {
                return
            }
            actualInOrder(node.left)
            valArr.push(node.value)
            actualInOrder(node.right)
        }

        actualInOrder(node)
        return valArr
    }

    //depth first preOrder func
    preOrder(callback) {
        let currentNode = this.root
        let nodeArr = []
        let valArr = []
        nodeArr.push(currentNode)
        fillNodeArr()

        function fillNodeArr() {
            //left side
            for (let i = 0; i < nodeArr.length; i++) {
                if (nodeArr[i].left != null) {
                    nodeArr.push(nodeArr[i].left)
                }
            }
            //filling in right values for left side
            for (let i = (nodeArr.length - 1); i > 0; i--) {
                if (nodeArr[i].right != null) {
                    nodeArr.push(nodeArr[i].right)
                }
            }
            //right side
            for (let i = 0; i < nodeArr.length; i++) {
                if (nodeArr[i].right != null) {
                    if(!nodeArr.includes(nodeArr[i].right)) {
                        nodeArr.push(nodeArr[i].right)
                        if (nodeArr[(nodeArr.length - 1)].left != null) {
                            nodeArr.push(nodeArr[(nodeArr.length - 1)].left)
                        }
                    }
                }
            }
        }
        nodeArr.forEach((node) => valArr.push(node.value))
        return valArr
    }

    //depth first postOrder func
    postOrder(node = this.root) {
        let valArr = []

        function actualPostOrder(node) {
            if (node == null) {
                return
            }
            actualPostOrder(node.left)
            actualPostOrder(node.right)
            valArr.push(node.value)
        }

        actualPostOrder(node)
        return valArr
    }

    //returns how far to lowest node
    height(node = this.root) {
        let heightNum = 0
        let targetNode = this.find(node.value)

        function checkForLeaf(targetNode) {
            if (targetNode.left != null) {
                heightNum++
                targetNode = targetNode.left
                checkForLeaf(targetNode)
            } else if (targetNode.right != null) {
                heightNum++
                targetNode = targetNode.right
                checkForLeaf(targetNode)
            } else {
                return
            }
        }
        checkForLeaf(targetNode)
        return heightNum
    }

    //returns how far from root node
    depth(node = this.root.left) {
        let depthNum = 0
        let targetNode = this.find(node.value)
        let currentNode = this.root

        function checkForLeaf(targetNode, currentNode) {
            if (currentNode.value != targetNode.value) {
                if (targetNode.value < currentNode.value) {
                    depthNum++
                    currentNode = currentNode.left
                    checkForLeaf(targetNode, currentNode)
                } else if (targetNode.value > currentNode.value) {
                    depthNum++
                    currentNode = currentNode.right
                    checkForLeaf(targetNode, currentNode)
                }
            } else {
                return 
            }
        }
        checkForLeaf(targetNode, currentNode)
        return depthNum
    }

    //checks if right tree height and left tree height are no more than 1 off
    isBalanced() {
        let leftHeight = 0
        let rightHeight = 0
        let currentNode = this.root

        function checkLeft(currentNode) {
            if (currentNode.left != null) {
                leftHeight++
                currentNode = currentNode.left
                checkLeft(currentNode)
            } else if (currentNode.right != null) {
                leftHeight++
                currentNode = currentNode.right
                checkLeft(currentNode)
            } else {
                return
            }
        }
        checkLeft(currentNode)
        currentNode = this.root 
        checkRight(currentNode)
        
        function checkRight(currentNode) {
            if (currentNode.right != null) {
                rightHeight++
                currentNode = currentNode.right
                checkRight(currentNode)
            } else if (currentNode.left != null) {
                rightHeight++
                currentNode = currentNode.left
                checkRight(currentNode)
            } else {
                return
            }
        }
        
        if (leftHeight == rightHeight || leftHeight == rightHeight-1 || leftHeight == rightHeight+1) {
            let result = "balanced"
            return result
        } else {
            let result = "not balanced"
            return result
        }
    }

    //rebalances unbalanced tree
    rebalance() {
        let startArr = this.inOrder()
        console.log(startArr)
        let sorted = mergeSort(startArr)
        let checked = noDuplicates(sorted)
        return this.buildTree(checked)
    }
}

function createArray(num) {
    let arr = []
    for(let i = 0; i < num; i++) {
        let randNum = Math.floor(Math.random() * 100)
        arr.push(randNum)
    }
    return arr
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    } else {
        let middle = Math.floor(arr.length / 2)
        let leftArr = arr.slice(0, middle)
        let rightArr = arr.slice(middle)
        return merge(mergeSort(leftArr), mergeSort(rightArr))
    }
}

function merge(leftArr, rightArr) {
    let sortedArr = []
    while (leftArr.length && rightArr.length) {
        if (leftArr[0] <= rightArr[0]) {
            sortedArr.push(leftArr.shift())
        } else {
            sortedArr.push(rightArr.shift())
        }
    }
    let finalArr = [...sortedArr, ...leftArr, ...rightArr]
        return finalArr
}

function noDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr.includes(arr[i], i + 1) == true) {
            console.log('duplicate found')
            arr.splice(i, 1)
            noDuplicates(arr)
        }
    }
    return arr
}

//testing functions
let testTree = new Tree
//step 1
let testArr = createArray(10)
console.log('initial array:', testArr)
let sortedArr = mergeSort(testArr)
console.log('sorted array:', sortedArr)
let checkedArr = noDuplicates(sortedArr)
console.log('array after checking for duplicates:', checkedArr)
//step 2
console.log('initial built tree:', testTree.buildTree(checkedArr))
console.log('the tree is: ', testTree.isBalanced())
//step 3
console.log('level order array: ', testTree.levelOrder())
console.log('preorder array: ', testTree.preOrder())
console.log('in-order array: ', testTree.inOrder())
console.log('postorder array: ', testTree.postOrder())
//step 4
console.log('tree after inserting value:', testTree.insert(11))
console.log('tree after inserting value:', testTree.insert(101))
console.log('tree after inserting value:', testTree.insert(202))
console.log('tree after inserting value:', testTree.insert(777))
console.log('tree after inserting value:', testTree.insert(303))
//step 5
console.log('the tree is: ', testTree.isBalanced())
//step 6
console.log('rebalanced: ', testTree.rebalance())
//step 7
console.log('the tree is: ', testTree.isBalanced())
//step 8
console.log('level order array: ', testTree.levelOrder())
console.log('preorder array: ', testTree.preOrder())
console.log('in-order array: ', testTree.inOrder())
console.log('postorder array: ', testTree.postOrder())