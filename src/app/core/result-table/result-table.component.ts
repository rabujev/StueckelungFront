import { Component } from '@angular/core';
import { DenomValues } from '../denom-values/denom-values';
import { FormService } from 'src/app/services/form.service';



@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent {

  //Injecting the object for possible denominations + the object form service
  // and using parameter Properties to simultaneously define both as a property
  
  constructor(private denomValues: DenomValues,
              private formService: FormService) {};

  //Initial Map with denoms as keys and 0 as values for now

  //private denoms: Map<number, number> = this.denomValues.denomMap();
  
  result: Map<number, number> = new Map(this.denomValues.denomMap());


  previousAmount: number | null = null;

  prevAmountHTML: number | null = null;

  difference: Map<number, string> = new Map();


/**
 * On Init : subscribing to 
 */
  ngOnInit() {
    this.formService.submittedForm.subscribe( 
      submitted => {
        this.formService.updateTables( submitted[0], this.previousAmount, this.result, submitted[1], this.difference);
        this.prevAmountHTML = this.previousAmount;
        this.previousAmount = submitted[0];
      }
    );
  }

  
  



}
