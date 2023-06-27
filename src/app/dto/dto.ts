import { DenomValues } from '../core/denom-values/denom-values';

export class Dto {

    
    public result: number[] = [];
    public difference: string[] = [];
    
    //constructor converts maps into arrays of the values
    constructor(public total: number, result: Map<number, number>)
        {
            result.forEach((val: number, key: number) => {
                this.result.push(val);
            });         
        }

        public static arrToMap(arr: any[]): Map<number, any> {
            
            let map = new Map();
            let i: number = 0;

            map.forEach((val, key) => {
                map.set(DenomValues.denomArr[i], arr[i]);
                i++;
            })
            
            return map;
        }
  
        public toString(): string {
            console.log("total is : " + this.total);
            console.log("result is : " + this.result);
            console.log("difference is : " + this.difference);
            return "";
        }
}


