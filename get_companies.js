const request = require("request")
const returnedCompanies = [];
const API_KEY = '3b027ac0-0ae1-489f-b424-822c3df0b024'
const count = 5;

getCompanies = () => {
    if (typeof offset == 'undefined') {
        offsetParam = null;
    } else {
        offsetParam = `offset=${offset}`;
    }

    const hapikeyParam = `hapikey=${API_KEY}`
    const paramsString = `?count=${count}&${hapikeyParam}&${offsetParam}`;
    const properties = `&properties=name&properties=domain&properties=equipement`

    const finalUrl = `https://api.hubapi.com/companies/v2/companies/paged${paramsString}${properties}`
    console.log(finalUrl)
    request(finalUrl, (error, response, body) => {
        if (error) {
            console.log('error', error)
            throw new Error
        }
        const parsedBody = JSON.parse(body)
        parsedBody.companies.forEach(company => {
            returnedCompanies.push(company);
            console.log(company);
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