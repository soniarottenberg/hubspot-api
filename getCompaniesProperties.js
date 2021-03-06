var request = require("request")
const returnedCompanies = [];
const API_KEY = '3b027ac0-0ae1-489f-b424-822c3df0b024'
const count = 1;
// live : b3f7df6a-18ee-46d9-a1e2-910235853b6a
// demo : 3b027ac0-0ae1-489f-b424-822c3df0b024

getCompanies = (offset) => {
    if (typeof offset == 'undefined') {
        offsetParam = null;
    } else {
        offsetParam = `offset=${offset}`;
    }
    const hapikeyParam = `hapikey=${API_KEY}`
    const paramsString = `?count=${count}&${hapikeyParam}&${offsetParam}&properties=name&properties=equipement&limit=1`;
    // deja_equipe_ou_non
    const finalUrl = `https://api.hubapi.com/companies/v2/companies/paged${paramsString}`
    request(finalUrl, (error, response, body) => {
        if (error) {
            console.log('error', error)
            throw new Error
        }
        const parsedBody = JSON.parse(body)
        parsedBody.companies.forEach(company => {
            returnedCompanies.push(company.properties.name.value);
            returnedCompanies.push(company.properties.equipement.value);
        });
        if (parsedBody['has-more']) {
            getCompanies(parsedBody['offset'])
        } else {
            //print out all companies
            console.log(returnedCompanies)
        }
    })
};

getCompanies()