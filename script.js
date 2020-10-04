const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//How to set up a loader
// 1) write a loader <div> at index.html
// 2) create a function showLoadingSpinner to show the loader (use html 'hidden' attribute to define)
// 3) create a function removeLoadingSpinner to show the quote-container and set the loader to hidden
// 4) put the showLoadingSpinner function before fetch, and once it finished fetching, put the cremoveLoadingSpinner function right above catch
function showLoadingSpinner() {
    loader.hidden = false;
    //loader is showing
    quoteContainer.hidden = true;
    //then the whole quote-container is hiding now
}

// Loader: 3) if the loadder.hidden is false(if loader is showed), change the quote-container to show up and hide the loader
function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote from api
//apilink + ? + method = getQuote + lang = en + format = json
// in async function, write try and catch. awiat limit that response will not get set unitl fetch get finished, and data will not get set until get the response in json format. 
async function getQuoteFromAPI() {
    // show the loader here before fetching start
    showLoadingSpinner();
    const proxyUrl = 'https://murmuring-crag-21120.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // if author is empty, add 'unkonow' instead of black
        if(data.quoteAuthor === ''){
            quoteAuthor.innerText = 'Unkonwn'
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        // if quote character is longer than 120, change font size to small
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //data.quoteText / quoteAuthor is a special method by the apiUrl

        //hide the loader and show the quote-container after fetching
        removeLoadingSpinner();
    }catch(error){
        getQuoteFromAPI();
    }
}

// create a tweet quote function and use it in the twitter button event listener
// use `` and twitter link from website to create a dynamic twitter quote
// https://twitter.com/intent/tweet + ? + text= + ${} - ${}
// window.open is stand for open a new tab
function tweetQuote (){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// add event listener for buttons, once the twitterbutton was clicked, it will trigger the tweetQuote function
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuoteFromAPI);

//On load
getQuoteFromAPI();