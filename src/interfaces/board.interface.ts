import { IBoardColumn } from "./boardColumn.interface";

export interface IBoard {
    id: string;
    title: string;
    columns: IBoardColumn[];
}