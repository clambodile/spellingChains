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
        dictionary = data.split('\n').map(function(c){
            return c.toLowerCase()
        }).reduce(function(dict, word) {
            if (dict[word] === undefined) {
                dict[word] = word;
            }
            return dict;
        }, {});
        console.log('longest chain!\n', longestChain(dictionary));
        
    });

}

function longestChain(dictionary) {
    const dictObj = Object.keys(dictionary);
    return Object.keys(dictionary).reduceRight(function(longest, word) {
        const wChain = checkChain(word, dictionary);
        const wValid = (wChain.length > 0) && wChain.slice(-1)[0].length < 3;
        if (wValid && (wChain.length > longest.length)) return wChain;
        else return longest;
    }, ['h']);
}

function checkChain(word, dictionary) {
    const wordValid = (dictionary && dictionary[word] !== undefined);
    const wordL = word.slice(0, word.length - 1);
    const wordLValid = dictionary[wordL] !== undefined;
    const wordR = word.slice(1);
    const wordRValid = dictionary[wordR] !== undefined;

    if (!wordLValid && !wordRValid) {
        return [word];
    }

    const wordLChain = checkChain(wordL, dictionary);
    const wordRChain = checkChain(wordR, dictionary);

    if (wordLValid && wordRValid) {
        return wordLChain.length >= wordRChain.length ? [word].concat(wordLChain) : [word].concat(wordRChain);
    }
    else if (wordLValid) return [word].concat(wordLChain);
    else if (wordRValid) return [word].concat(wordRChain);
    else return [];
}

function findLongest(words) {
    return words.reduce(function(acc, word) {
        const len1 = acc.length
        const len2 = word.length
        return len1 > len2 ? acc : word;
    }, '')
}
main();