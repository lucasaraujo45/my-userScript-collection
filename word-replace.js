// ==UserScript==
// @name         Word Replacement
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  replace word green with blue on a webpage
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
// ==UserScript==
// @name         Word Replacement
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  replace word green with blue on a webpage
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Word replacement
    var replacements = {
        "the": "yyyyyyyyyy"
    };


    // Iterate over all text nodes
    function replaceTextNodes(node) {
        if(node.nodeType === Node.TEXT_NODE) {
            // Replace words in the text node
            var text = node.nodeValue;
            for(var key in replacements) {
                var regExp = new RegExp("\\b" + key + "\\b", 'gi');
                text = text.replace(regExp, replacements[key]);
            }
            node.nodeValue = text;
        } else {
            // Iterate over child nodes
            for(var i = 0; i < node.childNodes.length; i++) {
                replaceTextNodes(node.childNodes[i]);
            }
        }
    }

    // Start the replacement
    replaceTextNodes(document.body);

    // Create a MutationObserver instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // For each added node
            for(var i = 0; i < mutation.addedNodes.length; i++) {
                // Apply the word replacements
                replaceTextNodes(mutation.addedNodes[i]);
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
})();

(function() {
    'use strict';

    // Word replacement
    var replacements = {
        "the": "Pride Month"
    };


    // Iterate over all text nodes
    function replaceTextNodes(node) {
        if(node.nodeType === Node.TEXT_NODE) {
            // Replace words in the text node
            var text = node.nodeValue;
            for(var key in replacements) {
                var regExp = new RegExp("\\b" + key + "\\b", 'gi');
                text = text.replace(regExp, replacements[key]);
            }
            node.nodeValue = text;
        } else {
            // Iterate over child nodes
            for(var i = 0; i < node.childNodes.length; i++) {
                replaceTextNodes(node.childNodes[i]);
            }
        }
    }

    // Start the replacement
    replaceTextNodes(document.body);
})();
