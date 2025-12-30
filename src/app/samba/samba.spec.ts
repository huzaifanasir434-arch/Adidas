import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Samba } from './samba';

describe('Samba', () => {
  let component: Samba;
  let fixture: ComponentFixture<Samba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Samba]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Samba);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
