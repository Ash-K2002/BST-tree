const prettyPrint = (node, prefix = "", isLeft = true) => {
  try {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  } catch (error) {
    console.log('something wrong occured', error);
  }
    
  };


  // A function that takes two separate sorted arrays and merges them into a single sorted array
function merge(arr1=[],arr2=[])
{
let mergedArr=[];

// n1 and n2 keep track of current value pointed in arr1 and arr2 respectively
let n1=0,n2=0;

// pushes values after comparing till one array's values are all pushed
while(n1<arr1.length && n2<arr2.length)
{
    if(arr1[n1]<arr2[n2])
    {
        mergedArr.push(arr1[n1]);
        n1+=1;
    }
    else{
        mergedArr.push(arr2[n2]);
        n2+=1;
    }
}

// returning while including the values that weren't pushed
return [...mergedArr,...arr1.slice(n1),...arr2.slice(n2)];
}


// mergesort function 
function mergeSort(arr=[])
{

if(arr.length>1)
{
let n= arr.length;

//sort right side
let arr1=mergeSort(arr.slice(0,n/2));
//sort left side
let arr2=mergeSort(arr.slice(n/2));
//merge them together and return
return merge(arr1,arr2);
}
else{
    // base case if single element or empty array
   return arr; 
}
}

export {mergeSort, prettyPrint};