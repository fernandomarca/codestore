import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
  async add(product: product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    })
  }
  async find(id: string): Promise<Product> {
    const findProduct = await ProductModel.findOne({
      where: { id: id }
    });

    if (!findProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    const product = new Product(
      {
        id: new Id(findProduct.id),
        name: findProduct.name,
        description: findProduct.description,
        purchasePrice: findProduct.purchasePrice,
        stock: findProduct.stock,
        createdAt: findProduct.createdAt,
        updatedAt: findProduct.updatedAt,
      }
    )
    return product;
  }
}