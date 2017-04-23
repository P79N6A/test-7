// rest args
function sum(...nums) {
    console.log(nums);
}
sum(1,3,4);

// enhance object
const coco = {name: 'coco',  age: 12};
const stars = {
    type: 'singer',
    // ...coco // not support
};
Object.assign(stars, coco);
console.dir(stars);
