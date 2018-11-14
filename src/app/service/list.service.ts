import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IList } from "src/app/model/list";
import { Observable } from "rxjs";
import { v4 as uuid } from "uuid";
import { ICard } from "../model/card";
const DATA_URL = "http://localhost:3000/lists";
@Injectable({
  providedIn: "root"
})
export class ListService {
  constructor(private http: HttpClient) {}

  getLists(): Observable<IList[]> {
    return this.http.get<IList[]>(DATA_URL);
  }

  getListById(id): Observable<IList> {
    return this.http.get<IList>(`${DATA_URL}/${id}`);
  }

  addNewList(list: IList) {
    if (!list.id) {
      list.id = uuid();
    }
    return this.http.post(DATA_URL, list);
  }
  // addNewCard(list: IList, listId) {
  //   if (!list.card.cardId) {
  //     list.card.cardId = uuid();
  //   }
  //   console.log(`${DATA_URL}/${listId}` + " " + list.card);
  //   return this.http.post(`${DATA_URL}/${listId}`, list.card);
  // }
  addNewCard(card: ICard, listId) {
    if (!card.cardId) {
      card.cardId = uuid();
    }
    return this.http.post(`${DATA_URL}/${listId}`, card);
  }
}
