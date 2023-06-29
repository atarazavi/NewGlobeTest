import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsComponent } from './schools.component';
import { SchoolBatteriesDataStore } from './store/school-batteries-data.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SchoolsComponent', () => {
  let component: SchoolsComponent;
  let fixture: ComponentFixture<SchoolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SchoolsComponent,
      ],
      providers: [
        SchoolBatteriesDataStore,
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    fixture = TestBed.createComponent(SchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
