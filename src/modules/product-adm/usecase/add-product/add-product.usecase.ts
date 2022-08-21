import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {

  constructor(private productRepository: ProductGateway) { }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    }

    const product = new Product(props);
    this.productRepository.add(product);
    //que garantia temos se o produto criado foi persistido de fato no banco? e se houver falha no banco?
    // 2 opções: 1- retornar logo depois da criação add()
    //2 - fazer um find no banco find(id);
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}