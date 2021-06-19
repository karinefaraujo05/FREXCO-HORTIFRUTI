const connection = require('../database/connection');


module.exports = {
  async index(request,response){
    const store_id = request.headers.authorization;

    const products = await connection('products')
      .where('store_id', store_id)
      .select('*');
    
    return response.json(products);

  }
}