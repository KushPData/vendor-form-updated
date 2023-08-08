export class test {
    arr = [];


    add(data) {
        this.arr.push(data);
        console.log(this.arr);
    }
    List() {
        return this.arr;
    }

}