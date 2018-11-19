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
  addNewCard(card: ICard, list) {
    if (!card.id) {
      card.id = uuid();
    }
    if (!list.cards) {
      list.cards = [];
    }
    list.cards.push(card);
    return this.http.patch(`${DATA_URL}/${list.id}`, { cards: list.cards });
  }

  updateData(list:IList) {
    return this.http.put(`${DATA_URL}/${list.id}`, list);
  }
  deleteList(list: IList) {
    return this.http.delete(`${DATA_URL}/${list.id}`);
  }
  // deleteCard(card:ICard, list){
  //   return this.http.delete(`${DATA_URL}/${list.id}`, ), 
  // }
}
