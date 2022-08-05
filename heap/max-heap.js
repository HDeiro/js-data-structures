class MinHeap {
    rootIndex = 1; // Root of heap in array
    heap = [null]; // Not using index 0 just to make math easier

    // ##################################
    // Private Heap Methods
    // ##################################

    #findParent(index) {
       return Math.floor(index / 2);
    }

    #findLeftChild(index) { 
        return index * 2;
    }

    #findRightChild(index) {
        return this.#findLeftChild(index) + 1;
    }

    #rebalanceHeap() {
        if (this.heap.length <= 2) return;

        let idx = this.heap.length - 1;

        while (this.heap[idx] > this.heap[this.#findParent(idx)]) {
            // Ignore index 0
            if (idx < this.rootIndex) continue; 

            const parentIndex = this.#findParent(idx);

            // Swap parent & children positions
            [this.heap[parentIndex], this.heap[idx]] = [this.heap[idx], this.heap[parentIndex]]
            
            // If it's on position one, it's on top. So, stop.
            if (parentIndex === this.rootIndex) break;

            // While it's not on top, check the next item
            idx = parentIndex;
        }
    }

    // ##################################
    // Public Heap Methods
    // ##################################

    insert(value) {
        this.heap.push(value);
        this.#rebalanceHeap();
    }

    removeBiggest() {
        let biggest = this.heap[this.rootIndex];
        let heapSize = this.heap.length;

        if (heapSize > 2) { // Heap of more than two elements
            // Send final element to the root
            this.heap[this.rootIndex] = this.heap[heapSize - 1];

            // Remove final element & refresh heapSize
            this.heap.splice(heapSize - 1);
            heapSize = this.heap.length;

            // In case there are only 3 elements on the heap
            if (heapSize === 3) {
                const secondItem = this.rootIndex + 1; // The item right after the root

                // Swap root & left child
                if (this.heap[this.rootIndex] < this.heap[secondItem]) {
                    [this.heap[this.rootIndex], this.heap[secondItem]] = [this.heap[secondItem], this.heap[this.rootIndex]]
                }

                return biggest;
            }

            let reference = this.rootIndex;
            let leftChild = this.#findLeftChild(reference);
            let rightChild = this.#findRightChild(reference);

            while (
                this.heap[reference] <= this.heap[leftChild] ||
                this.heap[reference] <= this.heap[rightChild]
            ) {
                // If left children is bigger than right child
                if (this.heap[leftChild] > this.heap[rightChild]) {
                    [this.heap[reference], this.heap[leftChild]] = [this.heap[leftChild], this.heap[reference]];
                    reference = this.#findLeftChild(reference);
                } else {
                    [this.heap[reference], this.heap[rightChild]] = [this.heap[rightChild], this.heap[reference]];
                    reference = this.#findRightChild(reference);
                }

                // Refresh references of left & right
                leftChild = this.#findLeftChild(reference);
                rightChild = this.#findRightChild(reference);

                // If there's no left or right children break the rebalance loop
                if (this.heap[leftChild] === undefined || this.heap[rightChild] === undefined) 
                    break;
            }
        } else if (heapSize === 2) { // Heap of exactly two elements
            this.heap.splice(1, 1);
        } else { // Heap of a single element
            biggest = null;
        }

        return biggest;
    }

    sort() {
        const result = [];

        while (this.heap.length > 1)
            result.push(this.removeBiggest());
        
        return result;
    }

    show() {
        console.log(this.heap);
    }
}

// ##################################
// Usage
// ##################################

const heap = new MinHeap();
heap.insert(10);
heap.insert(9);
heap.insert(33);
heap.insert(3);
heap.show();
console.log(heap.sort())

