// Our code

const pairingApp = {};

pairingApp.getDrink = (aDrink) => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        // 0 cents to 250 = cheap, 250 to 500 = mid, 500 and up = expensive
        pairingApp.userPriceChoice = $('input[name="q1"]:checked').attr('class');
        const userOriginChoice = $('input[name="q2"]:checked').attr('class');
        const userTypeChoice = $('input[name="q3"]:checked').attr('class');
        $.ajax({
            url: 'http://lcboapi.com/products?',
            dataType: 'jsonp',
            method: 'GET',
            access_key: 'MDphODVlYjk0Ni0xMDQ1LTExZTgtYTg0My1lMzE1YjBiZWVjYzI6RHo3bktkcG9TNkt5b2FqZHFxOFpkSEVHWGoxVEVvZ2k5MmtZ',
            data: {
                // q: 'lager pilsner+canada',
                q: `${userOriginChoice}+${userTypeChoice}`,
                // Images 'http;www.lcmbo.com/product/product/${orudoct.id}'
                per_page: 50,
            }
        }).then((res) => {
            const displayDrink = res.result;
            pairingApp.filterByUnits(displayDrink);
        });
    })
}

// This works
pairingApp.filterByUnits = (answers) => {
    const singlesOnly = answers.filter((item) => {
        return item.total_package_units === 1;
    });
    pairingApp.filterByPrice(singlesOnly);
}

// This works
pairingApp.filterByPrice = (singlesOnly) => {
    const cheapAnswers = singlesOnly.filter((item) => {
            return item.price_in_cents <= 250;
        }); 

    const midAnswers = singlesOnly.filter((item) => {
            return item.price_in_cents <= 500 && item.price_in_cents >= 250;
        });

    const expensiveAnswers = singlesOnly.filter((item) => {
            return item.price_in_cents > 500;
        });

    if (pairingApp.userPriceChoice === "cheap") {
        // console.log(cheapAnswers);
        const finalAnswer = cheapAnswers;

        finalAnswer.forEach((drink) => {
                console.log(drink);
                // const title = $('<h2>').text(art.title);
                // const artist = $('<p>').text(art.principalOrFirstMaker);
                $('.api-answer').append(`<img src=${drink.image_url}>`);
                $('.api-answer').append(`<p>${drink.name}</p>`);
                // const container = $('<div>').append(title, artist, image);
                // $('.api-answer').append(container);
            })
            
            // console.log(finalAnswer);

        // pairingApp.displayDrinkAnswers(answers);
    } else if (pairingApp.userPriceChoice === "mid") {
        // console.log(midAnswers);
        const finalAnswer = midAnswers;
        // console.log(finalAnswer);
        // pairingApp.displayDrinkAnswers(answers);

    } else if (pairingApp.userOriginChoice === "expensive") {
        // console.log(expensiveAnswers);
        const finalAnswer = expensiveAnswers;
        // console.log(finalAnswer);
        // pairingApp.displayDrinkAnswers(answers);
    } else {
        console.log("No beers match your selections");
    }
    // pairingApp.displayDrinkAnswers(answers);
}
// console.log(finalAnswer);

// pairingApp.displayDrinkAnswers = (answers) => {
//     console.log(answers);
// }

// // This is where our events go
// pairingApp.events = () => {
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



