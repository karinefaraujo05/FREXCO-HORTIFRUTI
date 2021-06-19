const connection = require('../database/connection');
const crypto = require('crypto');

module.exports ={
  
  async index(request,response) {
    const store = await connection ('store').select('*')
   
    return response.json(store);
},

  async create(request,response) {
    const {  name, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
  

    await connection('store').insert({
      id, 
      name,
      whatsapp,
      city,
      uf
    })

    return response.json({ id });
}
}