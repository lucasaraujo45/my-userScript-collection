// ==UserScript==
// @name         Block Specific Values
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  block specific values from being typed into inputs
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const disallowedValues = [
        'lucas@myemail.com',
        'anotheremail@example.com',
        '123 Main St', // Some address example
        // Add more disallowed values here
    ].map(value => value.toLowerCase()); // Convert disallowed values to lower case

    function checkDisallowedValues(value) {
        let lowerCaseValue = value.toLowerCase(); // Convert the input value to lower case
        for (let disallowedValue of disallowedValues) {
            if (lowerCaseValue.includes(disallowedValue)) {
                // Show a confirm dialog
                if (!confirm('This value is not allowed! Please contact the server owner as soon as possible. Click OK to remove this value or Cancel to close the window.')) {
                    // If they clicked Cancel, close the window
                    window.close();
                }
                // Remove the disallowed value
                return value.replace(new RegExp(disallowedValue, 'i'), '');
            }
        }
        // If no disallowed values were found, return the original value
        return value;
    }

    document.body.addEventListener('input', function(e) {
        if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
            e.target.value = checkDisallowedValues(e.target.value);
        }
    });

    document.body.addEventListener('paste', function(e) {
        if ((e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') && e.clipboardData) {
            let pastedText = e.clipboardData.getData('text');
            let checkedText = checkDisallowedValues(pastedText);
            // If the pasted text contains a disallowed value, cancel the paste event
            if (pastedText !== checkedText) {
                e.preventDefault();
                e.target.value = checkedText;
            }
        }
    });

})();
