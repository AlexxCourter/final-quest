import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestPathComponent } from './quest-path.component';

describe('QuestPathComponent', () => {
  let component: QuestPathComponent;
  let fixture: ComponentFixture<QuestPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestPathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
