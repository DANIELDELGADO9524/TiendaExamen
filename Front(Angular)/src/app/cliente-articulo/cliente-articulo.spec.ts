import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteArticulo } from './cliente-articulo';

describe('ClienteArticulo', () => {
  let component: ClienteArticulo;
  let fixture: ComponentFixture<ClienteArticulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteArticulo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteArticulo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
