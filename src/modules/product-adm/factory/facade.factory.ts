import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";

export function ProductAdmFacadeFactory() {
  const productRepository = new ProductRepository();
  const addProductUseCase = new AddProductUseCase(productRepository);
  const productFacade = new ProductAdmFacade({
    addUseCase: addProductUseCase,
    stockUseCase: undefined
  });
  return productFacade;
}

//poderia ser uma simples função
// export class ProductAdmFacadeFactory {
//   static create() {
//     const productRepository = new ProductRepository();
//     const addProductUseCase = new AddProductUseCase(productRepository);
//     const productFacade = new ProductAdmFacade({
//       addUseCase: addProductUseCase,
//       stockUseCase: undefined
//     });
//     return productFacade;
//   }
// }