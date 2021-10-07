import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDescriptionHeaderComponent } from './page-description-header.component';

describe('PageDescriptionHeaderComponent', () => {
  let component: PageDescriptionHeaderComponent;
  let fixture: ComponentFixture<PageDescriptionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDescriptionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDescriptionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
