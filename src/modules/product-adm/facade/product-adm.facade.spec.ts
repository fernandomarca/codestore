import { Sequelize } from "sequelize-typescript";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";
describe('ProductAdmFacade test', () => {
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
    // const productRepository = new ProductRepository();
    // const addProductUseCase = new AddProductUseCase(productRepository);
    // const productFacade = new ProductAdmFacade({
    //   addUseCase: addProductUseCase,
    //   stockUseCase: undefined
    // });

    const productFacade = ProductAdmFacadeFactory();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
    }

    await productFacade.addProduct(input);

    const findProduct = await ProductModel.findOne({
      where: { id: "1" }
    });

    expect(input.id).toEqual(findProduct.id);
    expect(input.name).toEqual(findProduct.name);
    expect(input.description).toEqual(findProduct.description);
    expect(input.purchasePrice).toEqual(findProduct.purchasePrice);
    expect(input.stock).toEqual(findProduct.stock);

  })
})
