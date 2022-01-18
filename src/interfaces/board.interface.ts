import { IBoardColumn } from "./boardColumn.interface.js";

export interface IBoard {
    id: string;
    title: string;
    columns: IBoardColumn[];
}