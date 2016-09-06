const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
		this.res = 3;
	}
	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);

	}

	pop() {
		if (this.isEmpty()) {
			return;
		}
		this.count -= 1;
		var detachedRoot = this.detachRoot();
		if (!detachedRoot) {
			return this.res++;

		}
		this.restoreRootFromLastInsertedNode(detachedRoot);
		this.shiftNodeDown(this.root);



		return detachedRoot.data;
	}

	detachRoot() {
		var detachedRoot = this.root;
		var indexOfRoot = this.parentNodes.indexOf(this.root);
		
		if (indexOfRoot > -1) {
			this.parentNodes.splice(indexOfRoot, 1);
		}
		this.root = null;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!detached.left) {
			this.clear();
			return;
		}

		var lastInserted =  this.parentNodes.pop();
		this.root = lastInserted;
		if (!this.root) {
			return;
		}
			this.root.left = detached.left;
			this.root.right = detached.right;
		
		
		if (this.root.left.parent) {
			this.root.left.parent = this.root;
		}
		if (this.root.right) {
			this.root.right.parent = this.root;
		}	

		lastInserted.parent.removeChild(lastInserted);

		if (!this.root.left || !this.root.right) {
			this.parentNodes.unshift(this.root);
		}
	
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return !this.size();
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
			this.count += 1;
		} else {
			var parentNode = this.parentNodes[0];
			parentNode.appendChild(node);
			this.parentNodes.push(node);
			this.count += 1;
			if (parentNode.left && parentNode.right) {
				this.parentNodes.shift();
			} 
		}
	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
			return;
		}

		if (node.parent.priority < node.priority) {
			var indexOfParent = this.parentNodes.indexOf(node.parent);
			var indexOfNode = this.parentNodes.indexOf(node);
			if (indexOfParent === -1) {
				this.parentNodes[indexOfNode] = node.parent;
			} else {
				var temp = this.parentNodes[indexOfParent];
				this.parentNodes[indexOfParent] = this.parentNodes[indexOfNode];
				this.parentNodes[indexOfNode] = temp;
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (!node) {
			return;
		}
		var nodeToSwapWith;
		var indexOfChild;
		var indexOfNode;
		
		if (!node.left && !node.right) {
			return;
		}


		if (node.left.priority > node.priority) {
			nodeToSwapWith = node.left;
		}
		if (node.right && node.right.priority > node.priority && (node.right.priority > node.left.priority || !node.left)) {
			nodeToSwapWith = node.right;
		}

		indexOfChild = this.parentNodes.indexOf(nodeToSwapWith);
		indexOfNode = this.parentNodes.indexOf(node);

		if (indexOfChild > -1) {
			if (indexOfNode === -1) {
				this.parentNodes[indexOfChild] = node;
			} else {
				var temp = this.parentNodes[indexOfChild];
				this.parentNodes[indexOfChild] = this.parentNodes[indexOfNode];
				this.parentNodes[indexOfNode] = temp;
			}

			
		} if (nodeToSwapWith) {
			nodeToSwapWith.swapWithParent();
			if (!nodeToSwapWith.parent) {
			this.root = nodeToSwapWith;
			}
			this.shiftNodeDown(node);
		}
		
	}
}

module.exports = MaxHeap;

