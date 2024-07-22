import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultHandlerComponent } from './result-handler.component';

describe('ResultHandlerComponent', () => {
  let component: ResultHandlerComponent;
  let fixture: ComponentFixture<ResultHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
