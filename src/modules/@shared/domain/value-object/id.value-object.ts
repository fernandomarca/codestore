import valueObject from "./value-object.interface";
import { randomUUID } from "node:crypto";

export default class Id implements valueObject {
  private _id: string;

  constructor(id?: string) {
    this._id = id || randomUUID()
  }

  get id(): string {
    return this._id;
  }
}