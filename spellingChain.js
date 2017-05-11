// A word is a "spelling chain" if you can remove one letter from it at a time, 
// all the way down to 1 letter, and have a valid word of the same language the 
// whole time.

// Examples 1: dados -> dado -> ado -> do -> O ; dado is a chain
// Ex 2: ideals -> ideal -> idea -> ide -> id -> I; ideals is a chain
// Ex 3: cull -x> NOT a chain; neither cul nor ull are English words.

// What is the longest "spelling chain" in the English language?

//TODO:
// Take a filename as a command-line argument
// Refactor

var fs = require('fs');

function main() {
    let dictionary = null;
    fs.readFile('dictionary.txt', 'utf8', (err, data) => {
        if (err) throw err;
        dictionary = data.split('\n').map(function (c) {
            return c.toLowerCase()
        }).reduce(function (dict, word) {
            if (dict[word] === undefined) {
                dict[word] = word;
            }
            return dict;
        }, {'a':'a', 'i':'i', 'o':'o'}); //3 1-letter words not included in dictionary.txt
        console.log(longestChain(dictionary));
    });
}

function longestChain(dictionary) {
    return Object.keys(dictionary).reduce(function(longest, word) {
        const wChain = checkChain(word, dictionary);
        const wValid = (wChain.length > 0) && wChain.slice(-1)[0].length == 1;
        if (wValid && (wChain.length > longest.length)) return wChain;
        else return longest;
    }, []);
}

function checkChain(word, dictionary) {
    const wordL = word.slice(0, word.length - 1);
    const wordLValid = dictionary[wordL] !== undefined;
    const wordR = word.slice(1);
    const wordRValid = dictionary[wordR] !== undefined;

    //base case
    if (!wordLValid && !wordRValid) {
        return [word];
    }

    const wordLChain = [word].concat(checkChain(wordL, dictionary));
    const wordRChain = [word].concat(checkChain(wordR, dictionary));

    if (wordLValid && wordRValid) {
        return wordLChain.length >= wordRChain.length ? wordLChain : wordRChain
    }
    else if (wordLValid) return wordLChain;
    else return wordRChain; 
}

function findLongest(words) {
    return words.reduce(function (acc, word) {
        const len1 = acc.length
        const len2 = word.length
        return len1 > len2 ? acc : word;
    }, '');
}

main();