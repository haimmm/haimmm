import * as util from "./utility.js"

export default class Search{
    static getCompanyProfileUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";

    constructor(){
        this.companies = [];
    }

    search = async userInput => {
        return new Promise(async (resolve,reject) => {
            const searchResults = await util.getData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ`);
            if(searchResults){
                const symbols = searchResults.map(company => company.symbol);
                console.log(symbols);
                const profilePromiseList = [util.getData(Search.getCompanyProfileUrl + symbols.slice(0,3).join())];
                if(symbols.length > 3)  profilePromiseList.push(util.getData(Search.getCompanyProfileUrl + symbols.slice(3,6).join()));
                if(symbols.length > 6)  profilePromiseList.push(util.getData(Search.getCompanyProfileUrl + symbols.slice(6,9).join()));
                if(symbols.length > 9)  profilePromiseList.push(util.getData(Search.getCompanyProfileUrl + symbols[9]));
                this.companies = await Promise.all(profilePromiseList);
                console.log(this.companies);
                this.companies = this.companies.map(resultsObj => resultsObj.companyProfiles ? resultsObj.companyProfiles:resultsObj).flat();
                resolve(true);
            }
            resolve(false);
        })
    }
}