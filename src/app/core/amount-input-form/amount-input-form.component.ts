import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';






@Component({
  selector: 'app-amount-input-form',
  templateUrl: './amount-input-form.component.html',
  styleUrls: ['./amount-input-form.component.css'],
  
})


export class AmountInputFormComponent {

  /** 
  Constructor with INJECTION for forms and our service
  */
  constructor(private formBuilder: FormBuilder,
              private formService: FormService) {}

    
  //Property containing our Form object - asserting  it's non null w ! 
  //
  inputForm!: FormGroup;

  //getters for our Form Controls, 1 for the amount and 1 for the toggle slider button 
  //
  get amount() {
    return this.inputForm.get('amount')!;
  }

  get backend() {
    return this.inputForm.get('backend');
  }
  

  //On Init : Create form i.e. structure + validators  
  //
  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      amount: new FormControl('', [Validators.required, 
                                   Validators.pattern("^\\d+([\\.,][0-9]{1,2})?$")]),  //regex pattern accepting only valid EUR amounts  (the backslash has to be escaped in js, remember)
      backend: new FormControl('')
    });  
  }
    

    //behaviour of submit button : if validation is passed => amount published to observer (tables)  via the Observable(Subject) in the injected service  
    //
  onSubmit() {
    if (this.inputForm.valid) {
      console.log("submitted (valid)");
      console.log(this.backend?.value);
      let updatedAmount: number = parseFloat(this.amount.value.replace(',','.'));
      this.formService.submittedForm.next([updatedAmount, this.backend!.value]); 
    }
    
  }

  

}


