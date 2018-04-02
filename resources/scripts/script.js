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

pairingApp.filterByUnits = (answers) => {
    const singlesOnly = answers.filter((item) => {
        return item.total_package_units === 1;
    });
    pairingApp.filterByPrice(singlesOnly);
}

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
        let finalAnswer = cheapAnswers;

        finalAnswer.forEach((drink) => {
            $('.api-answer').append(`<h5 class="margin-top"><span class="bold">${drink.name}</span></h5>`);
            $('.api-answer').append(`<p>Product ID: ${drink.id}</p>`);
            const priceInDollars = drink.price_in_cents / 100
            const priceRounded = (priceInDollars).toFixed(2);
            $('.api-answer').append(`<p>$ ${priceRounded}</p>`);
            if(drink.image_url !== null) {
                $('.api-answer').append(`<div class="drink-img-div"><img src=${drink.image_thumb_url}></div>`);
            } else {
                $('.api-answer').append(`<div class="drink-img-div"><img src="resources/images/no-image.png"></div>`);
            }
            $('.api-answer').append(`<a class="button button-api" href="https://www.lcbo.com/lcbo/product/product/${drink.id}">More Info</a>`)
        })

    } else if (pairingApp.userPriceChoice === "mid") {
        let finalAnswer = midAnswers;

        finalAnswer.forEach((drink) => {
            $('.api-answer').append(`<h5 class="margin-top"><span class="bold">${drink.name}</span></h5>`);
            $('.api-answer').append(`<p>Product ID: ${drink.id}</p>`);
            const priceInDollars = drink.price_in_cents / 100
            const priceRounded = (priceInDollars).toFixed(2);
            $('.api-answer').append(`<p>$ ${priceRounded}</p>`);
            if (drink.image_url !== null) {
                $('.api-answer').append(`<div class="drink-img-div"><img src=${drink.image_thumb_url}></div>`);
            } else {
                $('.api-answer').append(`<div class="drink-img-div"><img src="resources/images/no-image.jpg"></div>`);
            }
            $('.api-answer').append(`<a class="button button-api" href="https://www.lcbo.com/lcbo/product/product/${drink.id}">More Info</a>`)
        })

    } else if (pairingApp.userPriceChoice === "expensive") {
        let finalAnswer = expensiveAnswers;

        finalAnswer.forEach((drink) => {
            $('.api-answer').append(`<h5 class="margin-top"><span class="bold">${drink.name}</span></h5>`);
            $('.api-answer').append(`<p>Product ID: ${drink.id}</p>`);
            const priceInDollars = drink.price_in_cents / 100
            const priceRounded = (priceInDollars).toFixed(2);
            $('.api-answer').append(`<p>$ ${priceRounded}</p>`);
            if (drink.image_url !== null) {
                $('.api-answer').append(`<img src=${drink.image_thumb_url}>`);
            } else {
                $('.api-answer').append(`<div class="drink-img-div"><img src=${drink.image_thumb_url}></div>`);
            }
            $('.api-answer').append(`<a class="button button-api" href="https://www.lcbo.com/lcbo/product/product/${drink.id}">More Info</a>`)
        })

    } else {
        
        // console.log("No beers match your selections");
    }

}

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
}

// Document ready
$(function () {
    pairingApp.init();
});
