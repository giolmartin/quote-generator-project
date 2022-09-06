'use strict';

// const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show loading Spinner
const showLoadingSpinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//Hide Loading Spinner
const removeLoadingSpinner = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

//For using Local quotes .js
const newLocalQuote = function () {
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  console.log(quote);
};
//Show new Quote
const newQuote = function () {
  showLoadingSpinner();

  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if author is blank and replace it with 'Unknoewn'
  if (!quote.author) {
    quoteAuthor.textContent = 'Unknown';
  } else {
    quoteAuthor.textContent = quote.author;
  }

  //Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  //Set quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
};

//Get Quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
  window.open(twitterUrl, '_blank');
}

//event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
// newLocalQuote();

//On Load
// newQuote();
// getQuotes();
