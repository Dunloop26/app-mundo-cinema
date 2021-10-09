import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/interfaces/feature';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  features: Array<Feature> = [
    {
      title: 'Más calidad',
      content: 'Te aseguramos una experiencia como nunca la has visto antes',
      other: { bxIcon: 'bx-badge-check' },
    },
    {
      title: 'Lo último en cartelera',
      content: 'La mejor selección de contenidos con las películas taquilleras de la industria',
      other: { bxIcon: 'bx-glasses-alt' },
    },
    {
      title: 'A la hora que tú quieras',
      content: 'Nuestros horarios te permiten disfrutar de las peliculas cuando tu quieras ;)',
      other: { bxIcon: 'bx-time-five' },
    },
  ];
}
