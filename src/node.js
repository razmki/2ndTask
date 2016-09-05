class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left && this.right) {
			return;
		}

		if (!this.left) {
			this.left = node;
		} else {
			this.right = node;
		}

		node.parent = this;
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
		} else if (this.right === node) {
			this.right = null
		} else {
			throw new Error("");
		}
		node.parent = null;

	}

	remove() {
		if(!this.parent) {
			return;
		} else {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}

		if (this.right) {
			this.right.parent = this.parent;
		}

		if (this.left) {
			this.left.parent = this.parent;
		}

		if (this.parent.parent) {
			if (this.parent.parent.left === this.parent) {
				this.parent.parent.left = this;
			} else {
				this.parent.parent.right = this;
			}
		}
		
		if (this.parent.left === this) {
			if (this.parent.right) {
				this.parent.right.parent = this;
			}
			const temp = this.parent.right;
			this.parent.left = this.left;
			this.parent.right = this.right;
			this.left = this.parent;
			this.right = temp;
		} else {
			if (this.parent.left) {
				this.parent.left.parent = this;
			}
			const temp = this.parent.left;
			this.parent.left = this.left;
			this.parent.right = this.right;
			this.right = this.parent;
			this.left = temp;
		}

		const temp = this.parent.parent;
		this.parent.parent = this;
		this.parent = temp;
	}
}


module.exports = Node;
