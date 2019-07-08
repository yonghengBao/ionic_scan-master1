import { Component } from '@angular/core';

/**
 * Generated class for the TradeDetailCostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trade-detail-cost',
  templateUrl: 'trade-detail-cost.html'
})
export class TradeDetailCostComponent {

  costList:Array<{detail:string,createDate:string,totalAmount:string,type:string,amount:string}> = [];
  noData:boolean=false;


  constructor() {

  }

}
