import { Product } from "./product";
import { Ticket } from "./ticket";

export interface Invoice {
    ticket: {code:string, amount: number};
    products: Product[];
}
