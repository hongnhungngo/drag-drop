import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IList } from "../model/list";

@Injectable({
  providedIn: "root"
})
export class UpdateService {
  private _list = new BehaviorSubject<IList[]>([]);

  updateList(list: IList[]) {
    this._list.next(list);
  }
}
