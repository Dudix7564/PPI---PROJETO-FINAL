import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarItem } from './editar-item';

describe('EditarItem', () => {
  let component: EditarItem;
  let fixture: ComponentFixture<EditarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
