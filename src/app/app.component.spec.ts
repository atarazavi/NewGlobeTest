import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SchoolsModule } from './features/schools/schools.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialDesignModule } from './shared/materialdesign/materialdesign.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [
      HttpClientTestingModule,
      SchoolsModule,
      MaterialDesignModule,
      BrowserAnimationsModule,
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
