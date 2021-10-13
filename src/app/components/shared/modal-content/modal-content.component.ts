import { Component, Input, OnInit } from '@angular/core';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  constructor() { }

  @Input() modal? : NgxSmartModalComponent;

  ngOnInit(): void {
  }

  onAccept() {
    if(this.modal?.hasData()) {
      this.modal.getData().onAccept()
    }
    this.modal?.close()
  }

  onCancel() {
    this.modal?.close();
  }

}
