const fs = require('fs');

const longest = list => list.reduce((acc, word) => (acc.length > word.length ? acc : word));
const isValid = chain => chain.length > 0 && chain.slice(-1)[0].length == 1;

const longestChain = dictionary =>
	longest(
		Array.from(dictionary.values()).map(word => checkChain(word, dictionary)).filter(isValid)
	);

const checkChain = (word, dictionary) => {
	const wordL = word.slice(0, word.length - 1);
	const wordR = word.slice(1);

	return !dictionary.has(wordL) && !dictionary.has(wordR)
		? [word] // base case
		: [word].concat(longest(checkChain(wordL, dictionary), checkChain(wordR, dictionary)));
};

const dictionary = new Set(
	fs
		.readFileSync('dictionary.txt', 'utf8')
		.split('\n')
		.map(str => str.toLowerCase())
		.concat(['a', 'i', 'o'])
);
console.log(longestChain(dictionary));
