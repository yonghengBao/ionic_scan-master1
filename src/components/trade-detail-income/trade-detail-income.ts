import { Component } from '@angular/core';

/**
 * Generated class for the TradeDetailIncomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trade-detail-income',
  templateUrl: 'trade-detail-income.html'
})
export class TradeDetailIncomeComponent {

  incomeList:Array<{detail:string,createDate:string,totalAmount:string,type:string,amount:string}> = [];
  noData:boolean=false;

  constructor() {

  }

}
