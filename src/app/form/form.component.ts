import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IList } from "src/app/model/list";
import { ListService } from "src/app/service/list.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

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
  lists: IList[];
  addList: FormGroup;
  addCard: FormGroup;
  @ViewChild("editTitle") editTitle: ElementRef;
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
  onClickCard(id) {
    this.selectedCard[id] = !this.selectedCard[id];
    console.log(id);
  }
  getList() {
    this._listService
      .getLists()
      .subscribe((data: IList[]) => (this.lists = data));
  }

  addNewList() {
    if (this.addList.valid) {
      // this.lists.push(this.addList.value);
      this._listService
        .addNewList(this.addList.value)
        .subscribe(() => this.getList());
      this.addList.reset();
    }
  }
  addNewCard(list) {
    console.log();
    if (this.addCard.valid) {
      this._listService.addNewCard(this.addCard.value, list).subscribe();
      this.addCard.reset();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

  onEditList(id) {
    // this.editTitle.nativeElement.focus();
    this.selectedList[id] = !this.selectedList[id];
  }
  onEditTitle(list) {
    this.selectedList[list.id] = !this.selectedList[list.id];
    this._listService.updateListTitle(list);
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

  deleteAlert(list) {
    this.deleteList(list);
  }
  deleteList(list) {
    this._listService.deleteList(list).subscribe(() => this.getList());
  }
  // updateListTitle(list){
  //   if()
  // }
  ngOnInit() {}
}
