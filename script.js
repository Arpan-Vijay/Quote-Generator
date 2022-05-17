const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');

let apiQuotes = [];


// Show Loading;
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading;
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote;
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    }
    else {
        authorText.textContent = quote.author;
    }

    // Check quote length, if it's a longer quote then apply (.long-quote) css style
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    //  Set Quote and then hide loader;
    quoteText.textContent = quote.text
    complete();
}


// Get Quotes from API.

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes)
        // console.log(apiQuotes[12]) // randomly pick a quote
        newQuote();
    }
    catch (error) {
        // this is where we handle errors
    }
}

// Tweet Quote;

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event listners for twitter button and new Quotes button;

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)



// On Load:
getQuotes();
// loading();