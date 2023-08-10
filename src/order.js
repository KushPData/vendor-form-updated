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

    const orderDate = document.querySelector("#order-date").value;
    const orderPoNumber = document.querySelector("#order-po-number").value;
    const vendor = document.querySelector("#vendor-list").value;
    const shipTo = document.querySelector("#ship-to").value;
    const deliveryMethod = document.querySelector("#delivery-method").value;
    const paymentTerms = document.querySelector("#payment-terms").value;
    const againstQuote = document.querySelector("#against-quote").value;
    const nameList = document.querySelectorAll("#product-name");
    const quantityList = document.querySelectorAll("#quantity");
    const priceList = document.querySelectorAll("#unit-price");

    const nameArray = order.getValues(nameList);
    const quantityArray = order.getValues(quantityList);
    const priceArray = order.getValues(priceList);

    const discount = document.querySelector("#discount").value;
    const otherCosts = document.querySelector("#other-costs").value;
    const gstVatRate = document.querySelector("#gst-vat-rate").value;
    const note = document.querySelector("#note").value;

    const object = {"date": orderDate, "poNumber": orderPoNumber, "vendor": vendor, "shipTo": shipTo, "deliveryMethod": deliveryMethod, "paymentTerms": paymentTerms, "againstQuote": againstQuote, "nameArray": nameArray, "quantityArray": quantityArray, "priceArray": priceArray, "discount": discount, "otherCosts": otherCosts, "gstVatRate": gstVatRate, "note": note};

    test1.add(object);

    const arr = test1.List();

    let row = "";

    const table = document.querySelector("#table");

    for(let i = 0; i < arr.length; i++) {
        row += "<tr><th colspan='2'>Vendor</th><th colspan='3'>Ship To</th><tr>";
        row += "<tr><td colspan='2'>" + arr[i].vendor + "</td><td colspan='3'>" + arr[i].shipTo + "</td></tr>"

        row += "<tr><th colspan='2'>Delivery Method</th><th>Payment Terms</th><th colspan='2'>Against Quote No:</th></tr>";
        row += "<tr><td colspan='2'>" + arr[i].deliveryMethod + "</td><td>" + arr[i].paymentTerms + "</td><td colspan='2'>" + arr[i].againstQuote + "</td></tr>"

        row += "<tr><th>SR. NO.</th><th>Product Name/Description</th><th>Qty Approx</th><th>Unit Price</th><th>Total</th></tr>"

        let counter = 0;
        let totalExcludingTax = 0;
        let totalProduct = 0;
        for(let j = 0; j < arr[i].nameArray.length; j++) {
            let total = parseInt(arr[i].quantityArray[j]) * parseInt(arr[i].priceArray[j]);
            totalProduct += parseInt(arr[i].quantityArray[j]);
            row += "<tr><td>" + (j + 1) + "</td><td>" + arr[i].nameArray[j] + "</td><td>" + arr[i].quantityArray[j] + "</td><td>" + arr[i].priceArray[j]  + "</td><td>" + total + "</td></tr>";

            counter++;
            totalExcludingTax += total;
        }

        for(let j = 0; j < (16 - counter); j++) {
            row += "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
        }

        row += "<tr><td></td><td>Total Excl. Tax</td><td>" + totalProduct + "</td><td colspan='2'>" + totalExcludingTax + "</td></tr>";

        row += "<tr><td rowspan='7' colspan='2'>" + "Note:" + arr[i].note + "</td><td>Discount</td><td colspan='2'>" + arr[i].discount + "</td></tr>";

        row += "<tr><td>Other Costs</td><td colspan='2'>" + arr[i].otherCosts + "</td></tr>";

        row += "<tr><td>GST/VAT Rate</td><td colspan='2'>" + arr[i].gstVatRate + "%" + "</td></tr>";

        let gstVatValue = (parseInt(arr[i].gstVatRate) / 100) * parseInt(totalExcludingTax);

        row += "<tr><td>GST/VAT " + arr[i].gstVatRate + "%" + "</td><td colspan='2'>" + gstVatValue + "</td></tr>"

        let grandTotal = (parseInt(totalExcludingTax) + parseInt(arr[i].otherCosts) + parseInt(gstVatValue)) - parseInt(arr[i].discount);

        row += "<tr><td colspan='3'></td></tr>"

        row += "<tr><td>Total</td><td colspan='2'>" + grandTotal + "</td></tr>"

        row += "<tr><td rowspan='2' colspan='3'>Authorized signature</td></tr>"

        // row += "<tr><td>Date</td><td>" + arr[i].date + "</td><td colspan='2'></td></tr>"

    }

    table.innerHTML = row;
   
})