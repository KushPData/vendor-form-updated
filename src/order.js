"use strict";
import { functionalities } from "./functionalities.js";
import { test } from "./testdemo.js"

const order = new functionalities();
const test1 = new test();

const stakeholdersDetailsContainer = document.querySelector(".stakeholders-details-container");
order.makeDropdownList(stakeholdersDetailsContainer, "VendorList", "vendor-list", "Vendors: ", "VendorName");
order.makeDropdownList(stakeholdersDetailsContainer, "ShipTo", "ship-to", "Ship To: ", "CompanyName");

const logisticsContainer = document.querySelector(".logistics-details");
order.makeDropdownList(logisticsContainer, "DeliveryMethod", "delivery-method", "Delivery Method: ");
order.makeDropdownList(logisticsContainer, "PaymentTerms", "payment-terms", "Payment Terms: ");

const addButton = document.querySelector("#add-button");
const productList = document.querySelector(".product-list");
order.addProduct(addButton, productList, ["product-name", "quantity", "unit-price"], ["Product Name/Description: ", "Qty Approx: ", "Unit Price: "], ["name-feedback", "quantity-feedback", "price-feedback"], ["Please enter a product name!!!", "Please enter the quantity of product!!!", "Please enter the unit price of the product!!!"]);

const submit = document.getElementById("submit-button");
submit.addEventListener("click", (event) => {
    event.preventDefault();
    
    const nameList = document.querySelectorAll("#product-name");

    const quantityList = document.querySelectorAll("#quantity");

    const priceList = document.querySelectorAll("#unit-price");

    const nameArray = order.getValues(nameList);
    const quantityArray = order.getValues(quantityList);
    const priceArray = order.getValues(priceList);

    for(let i = 0; i < nameArray.length; i++) {
        let obj = {"name": nameArray[i], "quantity": quantityArray[i], "price": priceArray[i]};
        test1.add(obj);
    }

    let arr = test1.List();
    let row = "";
    for (let i = 0; i < arr.length; i++) {
        row += "<tr><td>" + arr[i].name + "</td><td>" + arr[i].quantity + "</td><td>" + arr[i].price + "</td></tr>";
    }

    alert(row);

    const generalTable = document.getElementById("general-table");
    generalTable.innerHTML = row;

    console.log(generalTable);
})