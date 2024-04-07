class myNode{
    constructor(){
        this.data=null;
        this.left=null;
        this.right=null;
    }
}

class myQueue{
    constructor(){
        this.front=null;
        this.rear=null;
    }

    push(value){
        const newNode = new myNode();
        newNode.data=value;
        if(this.front===null){
            this.front=this.rear=newNode;
        }
        else{
            newNode.left=this.rear;
            this.rear.right=newNode;
            this.rear=newNode;
        }
    }

    pop()
    {
        let value = null;
        if(this.front!==null)
        {   value=this.front.data;
            if(this.front==this.rear){
                this.front=this.rear=null;
            }
            else{
                this.front=this.front.right;
                this.front.left=null;
            }
        }
        return value;
    }

    display()
    {
        let temp= this.front , str='';
        while(temp!==null){
            str+= temp.data +'-> ';
            temp=temp.right;
        }
        return str+'null';
    }
}

class myTree{
    constructor(){
        this.root=null;
    }

    buildTree(arr=[], start=0, end=arr.length-1){

        if(start>end){
            return null;
        }
        const mid = Math.floor((start+end)/2);

        const node=new myNode();

        node.data=arr[mid];
        
        node.left=this.buildTree(arr,start,mid-1);
        node.right=this.buildTree(arr,mid+1,end);

        return node;
    }
    
    #insertRec(root,value){
        if(root==null){
            let node= new myNode();
            node.data=value;
            root = node;
            return root;
        }

        if(value < root.data){
            root.left = this.#insertRec(root.left, value);
        }
        else{
            root.right= this.#insertRec(root.right, value);
        }
        return root;
    }

    insert(value){
        this.root=this.#insertRec(this.root,value);
    }

    deleteNode(data,root=this.root){
        if(root == null){
            return null;
        }

        if(data > root.data){
            root.right = this.deleteNode(data,root.right);
            return root;
        }
        else if(data<root.data){
        
            root.left= this.deleteNode(data,root.left);
            return root;
        }

        if(root.left === null){
            let temp = root.right;
            return temp;
        }
        else if (root.right === null){
            return root.left;
        }

        else{
            let parent = root;
            let successor = root.right;
            while(successor.left !== null){
                parent = successor;
                successor= successor.left;
            }

            if(parent !== root){
                parent.left = successor.right;
            }
            else{
                parent.right = successor.right;
            }

            root.data = successor.data;

            return root;
        }

    }

    #findVal(value, root){
        if(root===null)
        {
        return false;
        }

        if(value===root.data){
            return true;
        }
        else if (value>root.data){
          return  this.#findVal(value, root.right);
        }
        else{
          return  this.#findVal(value, root.left);
        }
    }


    find(value){
        return this.#findVal(value,this.root);
    }

    levelOrder(callback){
        const queue = new myQueue();
        queue.push(this.root);

        while(queue.front!==null){
            let temp = queue.pop();
            callback(temp);
            if(temp.left!==null){
                queue.push(temp.left);
            }
            if(temp.right!==null){
                queue.push(temp.right);
            }
        }
    }

    inorder(callback,root=this.root){
        if(root===null)
        return;
        
        this.inorder(callback,root.left);
        callback(root);
        this.inorder(callback,root.right);
    }

    preorder(callback,root=this.root){
        if(root===null)
        return;
        callback(root);
        this.preorder(callback,root.left);
        this.preorder(callback,root.right);
    }
    
    postorder(callback,root=this.root){
        if(root===null)
        return;
        
        this.postorder(callback,root.left);
        this.postorder(callback,root.right);
        callback(root);
    }

    
    height(node = this.root)
    {
        if(node===null)
        {
            return 0;
        }
        let lHeight= this.height(node.left);
        let rHeight= this.height(node.right);

        if(lHeight>rHeight)
        {
            return lHeight+1;
        }
        else{
            return rHeight+1;
        }
    }

    depth(node,root=this.root){
        if(root===null || node === null)
        return -1;
        
        if(root.data === node.data)
        return 0;

        let dLeft= this.depth(node,root.left);
        let dRight = this.depth(node,root.right);

        if(dLeft>=0)
        return dLeft+1;

        if(dRight>=0)
        return dRight+1;

        return -1;
    }

    #checkBalanced(root){
        if(root===null){
            return true;
        }
        let leftHeight= this.height(root.left);
        let rightHeight= this.height(root.right);

        let res=(leftHeight-rightHeight)>=-1 && (leftHeight-rightHeight)<=1;

        if(res && this.#checkBalanced(root.left) && this.#checkBalanced(root.right))
        return true;
        
        return false;
    }
    isBalanced(){
       return this.#checkBalanced(this.root);
    }

    rebalance(){
        let arr=[];
        this.inorder((node)=>{
            arr.push(node.data);
        });
       this.root=this.buildTree(arr);
    }
}

export {myTree};