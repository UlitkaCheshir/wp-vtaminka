"use strict";

export default class ProductService{

    constructor(
        $http ,
       PASS
    ){

        this._$http = $http;
        this._PASS = PASS;

    }

    async getProducts(){

        try{

            let response = await this._$http({
                method: 'POST',
                url: '/wp-vtaminka/admin/wp-admin/admin-ajax.php',
                data:{
                        'numberposts': 10,
                        'action': 'getProductList',
                    },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            });


            let products = response.data.products;


            products.forEach( p => {
                p.amount = 1;
            } );

            return products;

        }//try
        catch( ex ){

            console.log('EX: ' , ex);

        }//catch




    }//getProducts

    async getCategory(){

        try{

            let response = await this._$http({
                method: 'POST',
                url: '/wp-vtaminka/admin/wp-admin/admin-ajax.php',
                data:{
                    'action': 'getCategories',
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            });



            let categories = response.data;

            return categories;

        }//try
        catch( ex ){

            console.log('EX: ' , ex);

        }//catch
    }//getCategory

    async getCategoryProducts( name ) {

        try{

            let response = await this._$http({
                method: 'POST',
                url: '/wp-vtaminka/admin/wp-admin/admin-ajax.php',
                data:{
                    'nameCategory': name,
                    'action': 'getProductByCategory',
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            });


            let categories = {};

            categories.products = response.data.products;

            categories.name = response.data.nameCategory
            return  categories;

        }//try
        catch( ex ){

            console.log('EX: ' , ex);

        }//catch

    }//getCategoryProducts

    async getSingleProduct(productID){

        let id = this._PASS.GET_PRODUCT.replace('{{ProductID}}' , productID);

        let response = await this._$http.get(`${this._PASS.HOST}${id}`);

        return response.data;

    }//getSingleProduct

}