import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAndAgeRendererComponent } from './name-and-age-renderer.component';

describe('NameAndAgeRendererComponent', () => {
  let component: NameAndAgeRendererComponent;
  let fixture: ComponentFixture<NameAndAgeRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameAndAgeRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAndAgeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
