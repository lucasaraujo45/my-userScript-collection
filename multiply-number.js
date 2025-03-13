// ==UserScript==
// @name         Multiply Whole Dollar Amounts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Multiply whole dollar amounts (before the period) by 6 on a webpage and format with commas
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function multiplyWholeDollarAmounts(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Multiply whole dollar amounts in the text node
            var text = node.nodeValue;
            text = text.replace(/\$(\d+)(\.\d+)?/g, function(match, wholePart, decimalPart) {
                decimalPart = decimalPart || "";  // Retain the unchanged decimal part or set to empty string if not present
                var multipliedValue = parseInt(wholePart) * 32;
                return "$" + formatNumberWithCommas(multipliedValue) + decimalPart;
            });
            node.nodeValue = text;
        } else {
            // Iterate over child nodes
            for (var i = 0; i < node.childNodes.length; i++) {
                multiplyWholeDollarAmounts(node.childNodes[i]);
            }
        }
    }

    // Start the multiplication
    multiplyWholeDollarAmounts(document.body);

    // Create a MutationObserver instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // For each added node
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                // Apply the whole dollar amount multiplication
                multiplyWholeDollarAmounts(mutation.addedNodes[i]);
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
})();
