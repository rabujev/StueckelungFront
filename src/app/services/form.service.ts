import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dto } from '../dto/dto';



@Injectable({
  providedIn: 'root'
})
export class FormService {

  //this is a Subject (multicastable Observable) others can subscribe to receive its value whenever updated.
  submittedForm: Subject<[number, boolean]> = new Subject<[number, boolean]>;
  
  backEndUrl: string = 'https://stueckelung-back-2db83e36cd11.herokuapp.com/api/processFormData';

  //local : "http://localhost:5000/api/processFormData";


  constructor(private httpClient: HttpClient) { }

  //Fills result Map with the amounts of notes and coins by calling either backend or frontend processing depending on user choice

  updateTables(total: number, previousTotal: number | null, result: Map<number, number>,
    useBackend: boolean,
    difference: Map<number, string>): void {

    if (useBackend) {
      this.calcBackend(total, previousTotal, result, difference);
    } else {
      this.calcFrontend(total, previousTotal, result, difference);

    }
  }

  //Gives back result + difference  Maps in an array  from backend 

  calcBackend(total: number, previousTotal: number | null,
    result: Map<number, number>,
    difference: Map<number, string>): void {

    console.log("using backend");

    let dto = new Dto(total, result);   // no need to send a difference

    ;
    //making post request to backend and setting table data with the response 
    let response = this.httpClient.post<Dto>(this.backEndUrl, dto).subscribe(
      dto => {
        //setting result
        let i: number = 0;
        for (let key of result.keys()) {
          result.set(key, dto.result[i]);
          i++;
        }

        // Setting difference
        if (previousTotal != null) {
          i = 0;
          for (let key of result.keys()) {
            difference.set(key, dto.difference[i]);
            i++;
          }
        }
      }
    );

  }


  calcFrontend(total: number, previousTotal: number | null, result: Map<number, number>,
    difference: Map<number, string>): void  // : Map<any, any>[] lets try no return
  {
    let previousResult = new Map(result);   //current Result becomes past result, useful for calculating difference later in this method



    let rest: number = total;
    //for each currency denomination, calculates how many of them fit in the rest amount and fills result map

    let cf: number = 100;  //correction factor when working with %modulo operation to transform decimals into intergers.

    for (let key of result.keys()) {
      let value: number = Math.floor(rest / key);
      result.set(key, value);  //should modify result as a side effect 

      rest = (rest * cf) % (key * cf);
    }
    //calculating the difference
    if (previousTotal != null)
      this.calcFrontDifference(result, previousResult, difference);
  }

  //calculates the difference between the present input and past input
  calcFrontDifference(result: Map<number, number>,
    previousResult: Map<number, number>,
    difference: Map<number, string>): void {
    console.log('dd')
    for (let key of result.keys()) {

      let diff: number = result.get(key)! - previousResult.get(key)!;

      if (diff > 0) {
        difference.set(key, ('+' + diff));
      } else if (diff < 0) {
        difference.set(key, ('' + diff));
      } else if (diff == 0 && previousResult.get(key) != 0) {
        difference.set(key, (' ' + diff));
      } else if (diff == 0) {
        difference.set(key, ('' + diff));
      }

    }

  }


}
