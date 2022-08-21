import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, ProductAdmFacadeInterface } from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

  constructor(
    private useCasesProps: UseCasesProps
  ) { }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this.useCasesProps.addUseCase.execute(input);
  }
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeInputDto> {
    throw new Error("Method not implemented.");
  }
}