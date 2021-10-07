import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-description-header',
  templateUrl: './page-description-header.component.html',
  styleUrls: ['./page-description-header.component.scss']
})
export class PageDescriptionHeaderComponent implements OnInit {

  @Input() title? : string = "Titulo";
  @Input() subtitle? : string = "Subtitulo";

  constructor() { }

  ngOnInit(): void {
  }

}
