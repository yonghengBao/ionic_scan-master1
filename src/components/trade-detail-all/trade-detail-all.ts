import { Component } from '@angular/core';


@Component({
  selector: 'trade-detail-all',
  templateUrl: 'trade-detail-all.html'
})
export class TradeDetailAllComponent {
  allList:Array<{detail:string,createDate:string,totalAmount:string,type:string,amount:string}> = [];
  noData:boolean=false;

  constructor() {

  }

}
