import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPizzaComponent } from './build-pizza.component';
import { HttpClientModule } from '@angular/common/http';

describe('BuildPizzaComponent', () => {
  let component: BuildPizzaComponent;
  let fixture: ComponentFixture<BuildPizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildPizzaComponent ],
      imports: [
        HttpClientModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
