import ProductManager from '../dao/ProductManager.js';

export async function attachManagerToRequest(req,res,next){
  // en el middleware agregamos a la request la instancia de la clase ProductManager ya que la vamos a usar en varias peticiones
  req.productManager = ProductManager;
  next();
}