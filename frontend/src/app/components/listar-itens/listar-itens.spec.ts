import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarItens } from './listar-itens';

describe('ListarItens', () => {
  let component: ListarItens;
  let fixture: ComponentFixture<ListarItens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarItens]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarItens);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
