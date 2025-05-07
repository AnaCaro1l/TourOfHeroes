import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from "../hero.service";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-hero-detail',
  imports: [
    NgIf,
    FormsModule,
    UpperCasePipe,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit{
  hero: Hero | undefined;


  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    const id = parseInt(this.route.snapshot.paramMap.get("id")!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
