import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  
//Class holds array of possible currency denominations.
export class DenomValues {
    public denomArr: number[] = 
        [200, 100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01];
    public static denomArr: number[] = 
        [200, 100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01];
    
        denomMap(): Map<number, number> {
            const map = new Map<number, number>;
            this.denomArr.forEach( 
                denom => map.set(denom, 0) );
            return map;

        }
}
