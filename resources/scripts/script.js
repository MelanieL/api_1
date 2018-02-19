// Our code

const pairingApp = {};

pairingApp.getDrink = (aDrink) => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        pairingApp.userPriceChoice = $('input[name="q1"]:checked').attr('class');
        const userOriginChoice = $('input[name="q2"]:checked').attr('class');
        const userTypeChoice = $('input[name="q3"]:checked').attr('class');

        if (userTypeChoice === "lager") {
            $('.pairing-one').show();
            e.preventDefault();
        } else if (userTypeChoice === "pilsner") {
            $('.pairing-one').show();
            e.preventDefault();
        } else if (userTypeChoice === "stout") {
            $('.pairing-two').show();
            e.preventDefault();
        } else if (userTypeChoice === "porter") {
            $('.pairing-two').show();
            e.preventDefault();
        } else if (userTypeChoice === "ipa") {
            $('.pairing-three').show();
            e.preventDefault();
        } else if (userTypeChoice === "sour") {
            $('.pairing-four').show();
            e.preventDefault();
        } else {
            console.log("something went wrong!");
        }

        $.ajax({
            url: 'http://lcboapi.com/products?',
            dataType: 'jsonp',
            method: 'GET',
            access_key: 'MDphODVlYjk0Ni0xMDQ1LTExZTgtYTg0My1lMzE1YjBiZWVjYzI6RHo3bktkcG9TNkt5b2FqZHFxOFpkSEVHWGoxVEVvZ2k5MmtZ',
            data: {
                q: `${userOriginChoice}+${userTypeChoice}`,
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
            return item.price_in_cents <= 499 && item.price_in_cents >= 251;
        });

    const expensiveAnswers = singlesOnly.filter((item) => {
            return item.price_in_cents > 500;
        });

    if (pairingApp.userPriceChoice === "cheap") {
        // console.log(cheapAnswers);
        // console.log('consolellogworks');
        let finalAnswer = cheapAnswers;

        finalAnswer.forEach((drink) => {
            // console.log(drink);
            // $('.api-answer .').append(`<div class="item-container-div-test"></div>`)
            $('.api-answer').append(`<h5 class="margin-top"><span class="bold">${drink.name}</span></h5>`);
            $('.api-answer').append(`<p>Product ID: ${drink.id}</p>`);
            const priceInDollars = drink.price_in_cents / 100
            const priceRounded = (priceInDollars).toFixed(2);
            $('.api-answer').append(`<p>$ ${priceRounded}</p>`);
            // $('.api-answer').append(container);
            if(drink.image_url !== null) {
                $('.api-answer').append(`<div class="drink-img-div"><img src=${drink.image_thumb_url}></div>`);
            } else {
                $('.api-answer').append(`<div class="drink-img-div"><img src="resources/images/no-image.jpg"></div>`);
            }
            $('.api-answer').append(`<a class="button button-api" href="https://www.lcbo.com/lcbo/product/product/${drink.id}">More Info</a>`)
        })
        // console.log("No beers match your selections");
            
            // console.log(finalAnswer);

        // pairingApp.displayDrinkAnswers(answers);
    } else if (pairingApp.userPriceChoice === "mid") {
        // console.log(midAnswers);
        // console.log('consolelogworks');
        let finalAnswer = midAnswers;

        finalAnswer.forEach((drink) => {
            // console.log(drink);
            $('.api-answer').append(`<h5 class="margin-top"><span class="bold">${drink.name}</span></h5>`);
            $('.api-answer').append(`<p>Product ID: ${drink.id}</p>`);
            const priceInDollars = drink.price_in_cents / 100
            const priceRounded = (priceInDollars).toFixed(2);
            $('.api-answer').append(`<p>$ ${priceRounded}</p>`);
            // $('.api-answer').append(container);
            if (drink.image_url !== null) {
                $('.api-answer').append(`<div class="drink-img-div"><img src=${drink.image_thumb_url}></div>`);
            } else {
                $('.api-answer').append(`<div class="drink-img-div"><img src="resources/images/no-image.jpg"></div>`);
            }
            $('.api-answer').append(`<a class="button button-api" href="https://www.lcbo.com/lcbo/product/product/${drink.id}">More Info</a>`)
        })
        // console.log("No beers match your selections");
        // console.log(finalAnswer);
        // pairingApp.displayDrinkAnswers(answers);

    } else if (pairingApp.userPriceChoice === "expensive") {
        // console.log(expensiveAnswers);
        // console.log('consolelogworks');
        let finalAnswer = expensiveAnswers;

        finalAnswer.forEach((drink) => {
            // console.log(drink);
            $('.api-answer').append(`<h5 class="margin-top"><span class="bold">${drink.name}</span></h5>`);
            $('.api-answer').append(`<p>Product ID: ${drink.id}</p>`);
            const priceInDollars = drink.price_in_cents / 100
            const priceRounded = (priceInDollars).toFixed(2);
            $('.api-answer').append(`<p>$ ${priceRounded}</p>`);
            // $('.api-answer').append(container);
            if (drink.image_url !== null) {
                $('.api-answer').append(`<img src=${drink.image_thumb_url}>`);
            } else {
                $('.api-answer').append(`<div class="drink-img-div"><img src=${drink.image_thumb_url}></div>`);
            }
            $('.api-answer').append(`<a class="button button-api" href="https://www.lcbo.com/lcbo/product/product/${drink.id}">More Info</a>`)
        })
        // console.log("No beers match your selections");
        // console.log(finalAnswer);
        // pairingApp.displayDrinkAnswers(answers);
    } else {
        
        // console.log("No beers match your selections");
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


// iCheck plugin for radio buttons
$('input').iCheck({
    checkboxClass: 'icheckbox_square-grey',
    radioClass: 'iradio_square-grey',
    increaseArea: '20%' // optional
});

// This is where the reset command starts
$('.reset_button').click(function () {
    location.reload();
});

pairingApp.init = () => {
    // on reload no boxes are checked
    $('input').prop('checked', false);
    pairingApp.getDrink();
    // pairingApp.pairingAnswer();
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



