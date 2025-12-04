import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRestrita } from './pagina-restrita';

describe('PaginaRestrita', () => {
  let component: PaginaRestrita;
  let fixture: ComponentFixture<PaginaRestrita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaRestrita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaRestrita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
