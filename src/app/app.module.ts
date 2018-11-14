import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./form/form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ListService } from "./service/list.service";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { UpdateService } from "./service/update.service";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FormComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, DragDropModule],
  providers: [ListService, UpdateService],
  bootstrap: [AppComponent]
})
export class AppModule {}
