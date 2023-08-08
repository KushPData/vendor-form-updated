"use strict";

import data from './../data/data.json' assert { type: "json" };

let numberOfProducts = 1;
export class functionalities {
    makeDropdownList(place, jsonKey, elementId, elementDescription, value) {
        const jsonValueArray = data[jsonKey];

        const label = document.createElement("label");
        label.setAttribute("for", elementId);
        label.textContent = elementDescription;
        place.appendChild(label);

        const select = document.createElement("select");
        select.setAttribute("class", "input-box");
        select.setAttribute("name", elementId);
        select.setAttribute("id", elementId);

        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", "");
        defaultOption.textContent = "--None Selected";
        select.appendChild(defaultOption);

        for(let i = 0; i < jsonValueArray.length; i++) {
            let option = document.createElement("option");
            if(typeof jsonValueArray[i] === 'object') {
                option.setAttribute("value", jsonValueArray[i][value]);
                option.textContent = jsonValueArray[i][value];
            } else {
                option.setAttribute("value",jsonValueArray[i]);
                option.textContent = jsonValueArray[i];
            }
            select.appendChild(option);
        }

        place.appendChild(select);
    }

    makeProductValue(elementId, elementDescription, elementFeedbackId, elementFeedback){
        const productValue = document.createElement("div");
        
        const label = document.createElement("label");
        label.setAttribute("for", elementId);
        label.textContent = elementDescription;
        productValue.appendChild(label);

        const input = document.createElement("input");
        input.classList.add("input-box")
        input.setAttribute("type", "text");
        input.setAttribute("name", elementId);
        input.setAttribute("id", elementId);
        productValue.appendChild(input);

        const feedback = document.createElement("div");
        feedback.classList.add("invalid-input", "d-none", elementFeedbackId);
        feedback.textContent = elementFeedback;
        productValue.appendChild(feedback);

        return productValue;
    }

    addProduct(addButton, place, elementIdArray,elementDescriptionArray, elementFeedbackIdArray, elementFeedbackArray) {
        addButton.addEventListener("click", function(event) {
            event.preventDefault();
            numberOfProducts += 1;
            const order = new functionalities();

            const oneProduct = document.createElement("div");
            oneProduct.classList.add("one-product");
            oneProduct.setAttribute("id", numberOfProducts);

            for(let i = 0; i < elementIdArray.length; i++) {
                let productValue = order.makeProductValue(elementIdArray[i], elementDescriptionArray[i], elementFeedbackIdArray[i], elementFeedbackArray[i]);
                oneProduct.appendChild(productValue);
            }

            console.log(oneProduct);

            place.appendChild(oneProduct);
        })
    }
}