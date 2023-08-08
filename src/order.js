"use strict";
import { functionalities } from "./functionalities.js";

const order = new functionalities();

const stakeholdersDetailsContainer = document.querySelector(".stakeholders-details-container");
order.makeDropdownList(stakeholdersDetailsContainer, "VendorList", "vendor-list", "Vendors: ", "VendorName");
order.makeDropdownList(stakeholdersDetailsContainer, "ShipTo", "ship-to", "Ship To: ", "CompanyName");

const logisticsContainer = document.querySelector(".logistics-details");
order.makeDropdownList(logisticsContainer, "DeliveryMethod", "delivery-method", "Delivery Method: ");
order.makeDropdownList(logisticsContainer, "PaymentTerms", "payment-terms", "Payment Terms: ");

const addButton = document.querySelector("#add-button");
const productList = document.querySelector(".product-list");
order.addProduct(addButton, productList, ["product-name", "quantity", "unit-price"], ["Product Name/Description: ", "Qty Approx: ", "Unit Price: "], ["name-feedback", "quantity-feedback","price-feedback"], ["Please enter a product name!!!", "Please enter the quantity of product!!!", "Please enter the unit price of the product!!!"]);
