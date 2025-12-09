import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesItem } from './detalhes-item';

describe('DetalhesItem', () => {
  let component: DetalhesItem;
  let fixture: ComponentFixture<DetalhesItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
