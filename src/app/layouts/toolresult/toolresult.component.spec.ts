import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolresultComponent } from './toolresult.component';

describe('ToolresultComponent', () => {
  let component: ToolresultComponent;
  let fixture: ComponentFixture<ToolresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
