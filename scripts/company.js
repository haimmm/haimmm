import * as util from "./utility.js"

const [ companyName,
        companyImg, 
        companyPrice, 
        companyDesc,
        stockChart ] = util.getElements("companyName", "companyImg", "companyPrice", "companyDesc", "stockChart");

const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');

const getChart = stockHistory => {
    const filteredData = stockHistory.historical.filter((_, i, arr) => !(i % Math.ceil(arr.length/15))).reverse(); // filter the data from n length to 15.
    const datesList = filteredData.map(day => day.date);
    const pricesList = filteredData.map(day => day.close);

    const data = {
        labels: datesList,
        datasets: [{
            label: 'Stock price history',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: pricesList,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
      };

    const myChart = new Chart(stockChart, config);
}

const buildPage = async (data) =>{
    const dataObj          = data.profile;
    companyImg.src         = dataObj.image;
    if(await util.waitForLoad(companyImg)) // prevents text load before image, and keeps the image hidden in case it's broken
        companyImg.style.visibility = "visible";
    companyName.innerText  = dataObj.companyName;
    const priceChange      = util.prettyFloat(dataObj.changesPercentage); 
    companyPrice.innerHTML = `Stock price: ${dataObj.price} <span style="color:${priceChange >= 0 ? "lightgreen" : "red"}">(${priceChange}%)</span>`;
    companyDesc.innerText  = dataObj.description;
    const stockHistory = await util.getData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`);
    getChart(stockHistory);
}


util.getData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
.then(data => {
    console.log(data);
    buildPage(data);
}).catch(err => {
    console.log(err);
});
