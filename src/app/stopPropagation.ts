import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[click-stop-propagation]"
})
export class ClickStopPropagation {
  @HostListener("mousedown", ["$event"])
  public onClick(event: any): void {
    if (event.which == 1) event.stopPropagation();
  }
}
