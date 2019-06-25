import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorHashtagComponent } from './buscador-hashtag.component';

describe('BuscadorHashtagComponent', () => {
  let component: BuscadorHashtagComponent;
  let fixture: ComponentFixture<BuscadorHashtagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorHashtagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorHashtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
