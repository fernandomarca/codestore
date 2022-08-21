import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

describe('ProductRepository test', () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel])
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should create a product', async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
    };

    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);
    const findProduct = await ProductModel.findOne({
      where: { id: productProps.id.id }
    });

    expect(productProps.id.id).toEqual(findProduct.id);
    expect(productProps.name).toEqual(findProduct.name);
    expect(productProps.description).toEqual(findProduct.description);
    expect(productProps.purchasePrice).toEqual(findProduct.purchasePrice);
    expect(productProps.stock).toEqual(findProduct.stock);
  })
})
