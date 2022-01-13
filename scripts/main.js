import * as util from "./utility.js"
import Search from "./Search.js"

const [ searchInput, resultsList ] = util.getElements("searchInput", "resultsList");
const urlParams = new URLSearchParams(window.location.search);
const searchObj = new Search();

searchInput.addEventListener("keydown", util.debounce(() => {
    const inputText = searchInput.value;
    if(inputText){
        // util.getData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputText}&limit=10&exchange=NASDAQ`)
        // .then(data => {
        //     showResults(data);
        //     urlParams.set('query', inputText);
        //     window.history.replaceState( null, "", `?${urlParams}`);
        // }).catch(err => {
        //     console.error(err);
        // })
        searchObj.search(inputText)
        .then(hasResults => {
            console.log(searchObj.companies);
        })
    }else if(resultsList.innerHTML){
        util.clearHTML(resultsList);
        window.history.replaceState( null, "", window.location.pathname);
    }
},500));

//rendering the results list with the data from the server
const showResults = async (resultsData) => {        
    util.clearHTML(resultsList) //override prev search

    if(resultsData.length){
        for(const result of resultsData){
            let resultItem       = document.createElement("li");
            resultItem.innerHTML = `<a href="./company.html?symbol=${result.symbol}">${result.name} (${result.symbol})</a>`
            // `<div class="list-item-container">
            //      <a href="./company.html?symbol=${result.symbol}">${result.name} (${result.symbol})</a>

            //  </div>`;
            resultsList.appendChild(resultItem);
        } 
    }else {
        const noResults          = document.createElement("li");
        noResults.style.fontSize = "3rem";
        noResults.innerHTML      = "Sorry but couldn't find any results... :'("
        resultsList.appendChild(noResults);
    }      
}

//disables the button and the text input, shows indicator while fetching the request and rendering the page
const setLoadingMode = enable => {
    searchBtn.innerHTML = `<i class="${enable ? "spinner-border w-50 h-50 p-2":"fas fa-search"}"></i>` // bootstrap's spinner: fontawesome's icon
    searchBtn.disabled = enable;
    searchInput.disabled = enable;
}

const checkForQueries = () => {
    if(urlParams.has('query')){
        searchInput.value = urlParams.get('query');
       searchInput.dispatchEvent(new KeyboardEvent('keydown',  {'key':'enter'}));
    }
}

window.onload = checkForQueries();