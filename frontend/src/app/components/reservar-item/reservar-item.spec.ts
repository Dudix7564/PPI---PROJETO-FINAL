import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarItem } from './reservar-item';

describe('ReservarItem', () => {
  let component: ReservarItem;
  let fixture: ComponentFixture<ReservarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
