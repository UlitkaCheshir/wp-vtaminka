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

        //let response = await this._$http.get( `${this._PASS.HOST}${this._PASS.GET_PRODUCTS}` );

        try{

            let response = await this._$http({
                method : "POST",
                url : '/wp-vtaminka/admin/wp-admin/admin-ajax.php',
                data: {
                    'action': 'getProductList',
                }
            });



            console.log('RESPONSE: ' , response);

        }//try
        catch( ex ){

            console.log('EX: ' , ex);

        }//catch


        let products = response.data;

        products.forEach( p => {
            p.amount = 1;
        } );

        return products;

    }//getProducts

    async getSingleProduct(productID){

        let id = this._PASS.GET_PRODUCT.replace('{{ProductID}}' , productID);

        let response = await this._$http.get(`${this._PASS.HOST}${id}`);

        return response.data;

    }//getSingleProduct

}