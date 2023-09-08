import { IType } from "./IType"

export interface IPastType {
    generation: {
        name: string,
        url: string
      },
      types: IType[]
}