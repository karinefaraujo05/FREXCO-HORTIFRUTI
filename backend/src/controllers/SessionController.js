const connection = require('../database/connection');

module.exports ={
  
  async create(request,response) {
    const{id} = request.body;

    const store = await connection('store')
      .where('id', id)
      .select('name')
      .first();

    if(!store){
      return response.status(400).json({error: 'No Product encontrado com esse ID'});
    }

    return response.json(store);
  }
}