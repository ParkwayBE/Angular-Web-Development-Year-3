import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EditEventComponent } from './edit-event.component';

describe('EditEventComponent', () => {
  let component: EditEventComponent;
  let fixture: ComponentFixture<EditEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have an event name', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#myInput');
    inputElement.value = 'Test Input';
    inputElement.dispatchEvent(new Event('input'));
    expect(inputElement.value).toBeTruthy();
  });
  it('date should be selected', () => {
    const datePicker: HTMLInputElement = fixture.nativeElement.querySelector('#datePicker');
    datePicker.value = '2023-11-15';
    datePicker.dispatchEvent(new Event('input'));
    const componentInstance = fixture.componentInstance;
    expect(componentInstance.selectedDate).toBe('2023-11-15');
  });
  it('event location should not only contain numbers', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#myInput');
    inputElement.value = 'abc123';
    inputElement.dispatchEvent(new Event('input'));
    const componentInstance = fixture.componentInstance;
    expect(componentInstance.inputValue).not.toMatch(/^\d+$/);

  });
  it('description can be empty', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#myInput');
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    const componentInstance = fixture.componentInstance;
    expect(componentInstance.inputValue).toBe('');
  });

});
