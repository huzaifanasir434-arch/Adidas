import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gazelle } from './gazelle';

describe('Gazelle', () => {
  let component: Gazelle;
  let fixture: ComponentFixture<Gazelle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gazelle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gazelle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
