import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Optional, Renderer2, Self, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorMessagesService } from '../services/utility/errors/error-messages.service';

@Directive({
  selector: '[appFormFieldError]',
  host: {'(blur)': 'onBlur()'},
  standalone: true
})
export class FormFieldErrorDirective implements OnInit, OnChanges {
  @Input() control!: AbstractControl;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private errorMessagesService: ErrorMessagesService,
    private formGroupDirective: FormGroupDirective
  ) { }

  ngOnInit() {
    if (this.control) {
      this.control.valueChanges.subscribe(() => {
        this.control.markAsTouched();
        this.displayErrorMessage(this.getErrorMessage());
      });
    }

    // Listen to form submit event
    this.formGroupDirective.ngSubmit.subscribe(() => {
      if (this.control) {
        this.control.markAsTouched();
        this.displayErrorMessage(this.getErrorMessage());
      }
    });
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //this.displayErrorMessage(this.getErrorMessage());
  }

  getErrorMessage(): string {
    if (this.control?.touched) {
      const errors = this.control.errors;
      if (errors) {
        const errorKey = Object.keys(errors)[0];
        const errorParams = errors[errorKey];
        return this.errorMessagesService.getErrorMessage(errorKey, errorParams);
      }
    }
    return '';
  }

  private displayErrorMessage(message: string) {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', message);
  }
}
