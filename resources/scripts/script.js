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