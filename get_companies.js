const request = require("request")
const API_KEY = 'b3f7df6a-18ee-46d9-a1e2-910235853b6a'
const count = 5;
let returnedCompanies = [];


getCompanies = () => {
    if (typeof offset == 'undefined') {
        offsetParam = null;
    } else {
        offsetParam = `offset=${offset}`;
    }

    const hapikeyParam = `hapikey=${API_KEY}`
    const paramsString = `?count=${count}&${hapikeyParam}&${offsetParam}&properties=name&properties=domain&properties=equipement`;

    const url = `https://api.hubapi.com/companies/v2/companies/paged${paramsString}`
    
    request(url, (error, response, body) => {
        if (error) {
            console.log('error', error)
            throw new Error
        }
        const parsedBody = JSON.parse(body)
        parsedBody.companies.forEach(company => {
            returnedCompanies.push(company);
            //print out each companies
            // console.log(company);
        });
        if (parsedBody['has-more']) {
            getCompanies(parsedBody['offset'])
        } else {
            //print out all companies
            console.log(returnedCompanies)
        }
    })
}

getCompanies();