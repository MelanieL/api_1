// Our code

const pairingApp = {};

pairingApp.getDrink = (aDrink) => {
    $.ajax({
        url: 'http://lcboapi.com/products?',
        dataType: 'jsonp',
        method: 'GET',
        access_key: 'MDphODVlYjk0Ni0xMDQ1LTExZTgtYTg0My1lMzE1YjBiZWVjYzI6RHo3bktkcG9TNkt5b2FqZHFxOFpkSEVHWGoxVEVvZ2k5MmtZ',
        data: {
            q: 'lager+canada+craft',
            // 'http;www.lcmbo.com/product/product/${orudoct.id}'
            // q: '`${answer1}+${answer2}+${answer3}`',
            // this is my change
            per_page: 50
        }
    }).then((res) => {
        const displayDrink = res.result;
        console.log(displayDrink);
    });
}

pairingApp.init = () => {
    pairingApp.getDrink();
}

// Document ready
$(function () {
    pairingApp.init();
});

// Esther's code starts

// function getDrink(aDrink) {
//     return $.ajax({
//         url: 'http://lcboapi.com/products',
//         method: 'GET',
//         dataType: 'jsonp',
//         access_key: 'MDphODVlYjk0Ni0xMDQ1LTExZTgtYTg0My1lMzE1YjBiZWVjYzI6RHo3bktkcG9TNkt5b2FqZHFxOFpkSEVHWGoxVEVvZ2k5MmtZ',
//         data: {
//             q: aDrink
//         }

//     })
//         .then((res) => {
//             const displayDrink = res.result;
//             console.log(displayDrink[0].name);
//         });
// }

// getDrink();
// Esther's code ends

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



