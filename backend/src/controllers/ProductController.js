const connection = require('../database/connection');
const crypto = require('crypto');

module.exports ={

  async index(request,response) {
    const{page = 1 } = request.query;

    const count = await connection('products').count();

    response.header('X-Total-Count', count['count(x)']);

    const products = await connection ('products')
      .join('store','store.id','=','products.store_id')
      .limit(5)
      .offset((page-1) * 5)
      .select([
        'products.*',
        'products.name',
        'products.date',
        'products.crop',
        'products.validity',
        'products.quantity',
        'products.value'
      ]);

      return response.json( products )
},

  async create(request,response){
    const{name, date, crop, validity, quantity, value } = request.body;
    const store_id = request.headers.authorization; //espera que seja salvo no store.id a authoorization passada no headers da app

    const [id] = await connection('products').insert({
      name,
        date,
          crop,
            validity,
              quantity,
                  value
    });
    return response.json({id});
  },
    async delete(request,response){
      const {id} = request.params;
      const store_id = request.headers.authorization;

      const products = await connection('products')
        .where('id', id)
        .select('store_id')
        .first();

      if(product.store_id != store_id) {
        return response.status(401).json({error: 'Operation not Permitted'});
      }
   await connection('products').where('id', id).delete();
        return response.status(204).send();
    }
    
}