import { Component, OnInit } from "@angular/core";
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
      this._listService
        .addNewList(this.addList.value)
        .subscribe(data => this.lists.push(this.addList.value));
      this.addList.reset();
    }
  }
  addNewCard(id) {
    console.log(id);
    if (this.addCard.valid) {
      this._listService
        .addNewCard(this.addCard.value, id)
        .subscribe(data => this.lists.push(this.addCard.value));
      this.addCard.reset();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }
  }

  onEditList(id) {
    this.selectedList[id] = !this.selectedList;
  }
  // dropItem(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }
  onSubmit(value) {
    console.log(value);
  }
  ngOnInit() {}
}
