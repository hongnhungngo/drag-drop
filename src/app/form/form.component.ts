import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IList } from "src/app/model/list";
import { ListService } from "src/app/service/list.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { ICard } from "../model/card";

@Component({
  selector: "hn-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  isClickList = true;
  isClickCard = true;
  selectedList = {};
  selectedCard = {};
  editCard = {};
  lists: IList[];
  cards: ICard[];
  abc: IList;
  addList: FormGroup;
  addCard: FormGroup;

  editTitle: ElementRef;
  constructor(private _listService: ListService, private fb: FormBuilder) {
    this.getList();
    this.addList = this.fb.group({
      title: this.fb.control("", [Validators.required])
    });
    this.addCard = this.fb.group({
      name: this.fb.control("", [Validators.required])
    });
  }
  onClickList() {
    this.isClickList = !this.isClickList;
  }
  onClickCard(id: string) {
    this.selectedCard[id] = !this.selectedCard[id];
  }
  getList() {
    this._listService
      .getLists()
      .subscribe((data: IList[]) => (this.lists = data));
  }

  addNewList() {
    if (this.addList.valid) {
      this._listService
        .addNewList(this.addList.value)
        .subscribe(() => this.getList());
      this.addList.reset();
    }
  }
  addNewCard(list: IList) {
    if (this.addCard.valid) {
      this._listService.addNewCard(this.addCard.value, list).subscribe();
      this.addCard.reset();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

  onEditList(id: string) {
    this.selectedList[id] = !this.selectedList[id];
    console.log(this.selectedList[id]);
    // if (this.selectedList[id]) {
    //   this.editTitle.nativeElement.focus();
    // }
  }
  onEditCard(id: string) {
    this.editCard[id] = !this.editCard[id];
  }

  onEditTitle(list: IList, value: string) {
    this.selectedList[list.id] = !this.selectedList[list.id];
    if (value) {
      list.title = value;
      this._listService.updateData(list).subscribe(() => this.getList());
    }
  }
  onEditCardName(card: ICard, list: IList, value: string) {
    this.editCard[card.id] = !this.editCard[card.id];
    if (value) {
      card.name = value;
      this._listService.updateData(list).subscribe(() => this.getList());
    }
  }
  dropItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  deleteAlert(list: IList) {
    this.deleteList(list);
  }
  deleteList(list: IList) {
    this._listService.deleteList(list).subscribe(() => this.getList());
  }
  // updateListTitle(list){
  //   if()
  // }
  getListById(list: IList) {
    this._listService.getListById(list.id).subscribe(data => (this.abc = data));
    return this.abc;
  }
  deleteCard(i: number, list: IList, cards: ICard[]): void {
    list.cards = cards.filter((el, index) => index !== i);
    this._listService.updateData(list).subscribe(() => this.getList);
  }
  ngOnInit() {}
}
