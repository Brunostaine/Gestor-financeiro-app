import { GetFinancaItem } from "./getFinancaItem";

export interface GetAllFinancasResponse {
  content: GetFinancaItem[] ;
  first: boolean;
  last: boolean;
  size: number;
  totalPages: number;
  totalelements: number,
}
