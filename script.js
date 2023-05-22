const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show New Quote
function newQuote() {
    loading()
    // Pick a random quote from apiQuotes array 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    // Check if author name is there or not, if not then update it with "Unkown"

    if (!quote.author) {
        authorText.textContent = 'Unkown'
    } else {
        authorText.textContent = quote.author
    }

    // Check quote length to determine styling

    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    // Set Quote and Hide Loader
    quoteText.textContent = quote.text
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote();
    } catch (error) {

    }
}

// Tweet Quote: Twitter button functionality
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
}


// Event Listeners 
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)


// on Load
getQuotes()