export class test {
    generalArray = [];
    stakeholderArray = [];
    logisticsArray = [];
    productArray = [];


    add(data, type) {
        if(type === "general") {
            this.generalArray.push(data);
        } else if(type === "stakeholder") {
            this.stakeholderArray.push(data);
        } else if(type === "logistics") {
            this.logisticsArray.push(data);
        } else if(type === "product") {
            this.productArray.push(data);
        }
    }

    List(type) {
        if(type === "general") {
            return this.generalArray;
        } else if(type === "stakeholder") {
            return this.stakeholderArray;
        } else if(type === "logistics") {
            return this.logisticsArray;
        } else if (type === "product") {
            return this.productArray;
        }
    }

}