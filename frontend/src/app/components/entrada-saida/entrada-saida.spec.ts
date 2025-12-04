import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaSaida } from './entrada-saida';

describe('EntradaSaida', () => {
  let component: EntradaSaida;
  let fixture: ComponentFixture<EntradaSaida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaSaida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaSaida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
