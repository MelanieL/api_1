const pairingApp = {};

pairingApp.getDrink = (query) => {
    $.ajax({
        url: 'http://lcboapi.com/products',
        data: 'jsonp',
        method: 'GET',
        data: {
            access_key: 'MDphODVlYjk0Ni0xMDQ1LTExZTgtYTg0My1lMzE1YjBiZWVjYzI6RHo3bktkcG9TNkt5b2FqZHFxOFpkSEVHWGoxVEVvZ2k5MmtZ'
        }
    }).then(function(data){
        console.log(data);
    });
}

// pseudo code
// we prompt users with four questions

// question 1: 
// prompt user to answer what price they would like to spend on beer
// ajax request for cost of beer in cents products
// store the returned price as a variable

// question 2:
// prompt user to answer what country of origin they would like their beer to originate from
// use checkboxes for this
// multiple choice
// store information in a variable 
// match origin variable to country of origin in retrieved data
// send ajax request to retrieve beers from countries listed

// question 3:
// prompt user to answer what type of beer they would like to drink
// store returned user value
// ajax request for secondary category or tags, this information is stored in both properties


// after user has answer all questions
// take information gathered from user
// return narrowed list of beverages with variables defined
// provide listing of products that match user beverage preferences



