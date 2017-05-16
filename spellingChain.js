const fs = require('fs');

const longest = list => list.reduce((acc, word) => (acc.length > word.length ? acc : word));
const isValid = chain => chain.length > 0 && chain.slice(-1)[0].length == 1;

const longestChain = (dictList, dictSet) =>
	longest(dictList.map(word => checkChain(word, dictSet)).filter(isValid));

const checkChain = (word, dictSet) => {
	const wordL = word.slice(0, word.length - 1);
	const wordR = word.slice(1);

	return !dictSet.has(wordL) && !dictSet.has(wordR)
		? [word]
		: longest([word].concat(checkChain(wordL, dictSet)), [word].concat(checkChain(wordR, dictSet)));
};

const dictionary = fs
	.readFileSync('dictionary.txt', 'utf8')
	.split('\n')
	.map(str => str.toLowerCase())
	.concat(['a', 'i', 'o']);

console.log(longestChain(dictionary, new Set(dictionary)));
