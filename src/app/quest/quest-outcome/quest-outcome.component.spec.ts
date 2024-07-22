import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestOutcomeComponent } from './quest-outcome.component';

describe('QuestOutcomeComponent', () => {
  let component: QuestOutcomeComponent;
  let fixture: ComponentFixture<QuestOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestOutcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
