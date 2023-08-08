"use strict";

import data from './../data/data.json' assert { type: "json" };

export class functionalities {
    makeDropdownList(place, jsonKey, elementId, elementDescription, value) {
        const jsonValueArray = data[jsonKey];
        console.log(jsonValueArray);

        const label = document.createElement("label");
        label.setAttribute("for", elementId);
        label.textContent = elementDescription;
        place.appendChild(label);

        console.log(place);

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
        console.log(place);
    }

    addProduct(place, elementIdArray, elementFeedbackIdArray, elementFeedbackArray) {
        
    }
}