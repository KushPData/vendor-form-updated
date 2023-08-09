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

    const summary = document.querySelector(".summary");
    summary.classList.remove("d-none");

    // --------------------------------------------------------------------------------------------------------
    const orderDate = document.querySelector("#order-date").value;
    const orderPoNumber = document.querySelector("#order-po-number").value;

    let generalObject = {"heading": "Date", "data": orderDate};
    test1.add(generalObject, "general");

    generalObject = {"heading": "P.O. Number", "data": orderPoNumber};
    test1.add(generalObject, "general");

    let generalArray = test1.List("general");
    let generalRow = "";

    for(let i = 0; i < generalArray.length; i++) {
        generalRow += "<tr><td>" + generalArray[i].heading + "</td><td>" + generalArray[i].data + "</td></tr>";
    }

    const generalTable = document.getElementById("general-table");
    generalTable.innerHTML = generalRow;

    // ---------------------------------------------------------------------------------------------------------

    const vendor = document.querySelector("#vendor-list").value;
    const shipTo = document.querySelector("#ship-to").value;

    let stakeholderObject = {"vendor": vendor, "shipTo": shipTo};
    test1.add(stakeholderObject, "stakeholder");

    let stakeholderArray = test1.List("stakeholder");
    let stakeholderRow = "<tr><th>Vendor</th><th>Ship To</th></tr>";

    for(let i = 0; i < stakeholderArray.length; i++) {
        stakeholderRow += "<tr><td>" + stakeholderArray[i].vendor + "</td><td>" + stakeholderArray[i].shipTo + "</td></tr>";
    }

    const stakeholderTable = document.getElementById("stakeholder-table");
    stakeholderTable.innerHTML = stakeholderRow;

    // ---------------------------------------------------------------------------------------------------------

    const deliveryMethod = document.querySelector("#delivery-method").value;
    const paymentTerms = document.querySelector("#payment-terms").value;
    const againstQuote = document.querySelector("#against-quote").value;

    let logisticsObject = {"deliveryMethod": deliveryMethod, "paymentTerms": paymentTerms, "againstQuote": againstQuote};
    test1.add(logisticsObject, "logistics");

    let logisticsArray = test1.List("logistics");
    let logisticsRow = "<tr><th>Delivery Method</th><th>Payment Terms</th><th>Against Quote Number</th></tr>";

    for(let i = 0; i < logisticsArray.length; i++) {
        logisticsRow += "<tr><td>" + logisticsArray[i].deliveryMethod + "</td><td>" + logisticsArray[i].paymentTerms + "</td><td>" + logisticsArray[i].againstQuote + "</td><tr>";
    }

    const logisticsTable = document.getElementById("logistics-table");
    logisticsTable.innerHTML = logisticsRow;

    // ---------------------------------------------------------------------------------------------------------

    const nameList = document.querySelectorAll("#product-name");
    const quantityList = document.querySelectorAll("#quantity");
    const priceList = document.querySelectorAll("#unit-price");

    const nameArray = order.getValues(nameList);
    const quantityArray = order.getValues(quantityList);
    const priceArray = order.getValues(priceList);

    for(let i = 0; i < nameArray.length; i++) {
        let productObject = {"srNumber": i + 1,"name": nameArray[i], "quantity": quantityArray[i], "price": priceArray[i]};
        test1.add(productObject, "product");
    }

    let productArray = test1.List("product");
    let productRow = "<tr><th>SR. No.</th><th>Product Name/Description</th><th>Qty Approx</th><th>Unit Price</th><th>Total</th></tr>";
    let counter = 0;
    let totalExcludingTax = 0;
    for (let i = 0; i < productArray.length; i++) {
        productRow += "<tr><td>" + productArray[i].srNumber + "</td><td>" + productArray[i].name + "</td><td>" + productArray[i].quantity + "</td><td>" + productArray[i].price + "</td><td>" + parseInt(productArray[i].quantity)*parseInt(productArray[i].price) + "</td></tr>";
        counter++;
        totalExcludingTax += parseInt(productArray[i].quantity)*parseInt(productArray[i].price);
    }

    for(let i = 0; i < 16 - counter; i++){
        productRow += "<tr><td></td><td></td><td></td><td></td><td></td></tr>"
    }

    productRow += "<tr><td></td><td></td><td></td><td>Total Excl. Tax</td><td>" + totalExcludingTax + "</td></tr>"

    const productTable = document.getElementById("product-table");
    productTable.innerHTML = productRow;

    
    // ---------------------------------------------------------------------------------------------------------

    const discount = document.querySelector("#discount").value;
    const otherCosts = document.querySelector("#other-costs").value;
    const gstVatRate = document.querySelector("#gst-vat-rate").value;
    const note = document.querySelector("#note").value;

    const otherObject = {"discount": discount, "otherCosts": otherCosts, "gstVatRate": gstVatRate, "note": note, "date": orderDate};
    test1.add(otherObject);

    const otherArray = test1.List();
    console.log(otherArray);

    console.log(orderDate);

    const noteContainer = document.querySelector(".note-container");
    noteContainer.textContent = "Note: " + otherArray[0].note;

    const dateContainer = document.querySelector(".date-container");
    dateContainer.innerHTML = "<tr><td>Date</td><td>" + otherArray[0].date + "</td></tr>";

    const gstVatValue = (parseInt(otherArray[0].gstVatRate)/100)*parseInt(totalExcludingTax);
    const total = parseInt(totalExcludingTax) + parseInt(otherArray[0].otherCosts) - parseInt(otherArray[0].discount) + gstVatValue;

    const otherTable = document.getElementById("other-table");
    otherTable.innerHTML = "<tr><td>Discount</td><td>" + otherArray[0].discount + "</td></tr><tr><td>Other Costs</td><td>" + otherArray[0].otherCosts + "</td></tr><tr><td>GST/VAT Rate</td><td>" + otherArray[0].gstVatRate + "</td></tr><tr><td>GST/VAT " + otherArray[0].gstVatRate + "%" + "</td><td>"+ gstVatValue + "</td></tr><tr><td>Total</td><td>" + total + "</td></tr>"

    const signature = document.querySelector(".signature");
    signature.textContent = "Authorized Signature";

})