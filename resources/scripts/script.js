// Our code

const pairingApp = {};

pairingApp.getDrink = (aDrink) => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        
        // const userPriceChoice = $('input[name="q1"]:checked').attr('class');

        // const userPriceChoiceRange = userPriceChoice
        // 0 cents to 250 = cheap, 250 to 500 = mid, 500 and up = expensive
        const userOriginChoice = $('input[name="q2"]:checked').attr('class');
        const userTypeChoice = $('input[name="q3"]:checked').attr('class');
        // console.log(userPriceChoice);
        // console.log(userOriginChoice);
        // console.log(userTypeChoice);

        // const userchoice1 = 
        // const userchoice2 = 
        // const userchoice3 = 
        $.ajax({
            url: 'http://lcboapi.com/products?',
            dataType: 'jsonp',
            method: 'GET',
            access_key: 'MDphODVlYjk0Ni0xMDQ1LTExZTgtYTg0My1lMzE1YjBiZWVjYzI6RHo3bktkcG9TNkt5b2FqZHFxOFpkSEVHWGoxVEVvZ2k5MmtZ',
            data: {
                // q: 'lager+canada+can',
                q: `${userOriginChoice}+${userTypeChoice}`,
                // order: total_package_units
                // Images 'http;www.lcmbo.com/product/product/${orudoct.id}'
                // q: '`${answer1}+${answer2}+${answer3}`',
                per_page: 50,
            }
        }).then((res) => {
            const displayDrink = res.result;
            console.log(displayDrink);
            // pairingApp.displayDrinkAnswers(answers);
        });
    })
}

// pairingApp.displayDrinkAnswers = (answers) => {
    // This part is to eliminate multipacks
    // const singlesOnly = displayDrink.filter(() => {
    //     return item.total_package_units === 1
    // })
// }

// // This is where our events go
// pairingApp.events = () => {
//     $('form').on('submit', function(){
//         // const userPriceChoice = $('input[name="q1"]:checked').attr('class');

//         // const userPriceChoiceRange = userPriceChoice
//         // 0 cents to 250 = cheap, 250 to 500 = mid, 500 and up = expensive
//         const userOriginChoice = $('input[name="q2"]:checked').attr('class');
//         const userTypeChoice = $('input[name="q3"]:checked').attr('class');
//         // console.log(userPriceChoice);
//         // console.log(userOriginChoice);
//         // console.log(userTypeChoice);

//         // const userchoice1 = 
//         // const userchoice2 = 
//         // const userchoice3 = 
//     })
// }

pairingApp.init = () => {
    pairingApp.getDrink();
    // pairingApp.events();
}

// Document ready
$(function () {
    pairingApp.init();
});

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



