import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsComponent } from './schools.component';
import { SchoolBatteriesDataStore } from './store/school-batteries-data.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SchoolsModule } from './schools.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        SchoolsModule,
        BrowserAnimationsModule
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
