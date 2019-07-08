import { NgModule } from '@angular/core';
import { NoDataComponent } from './no-data/no-data';
import { OrderHistoryAllComponent } from './order-history-all/order-history-all';
import { IonicModule } from "ionic-angular/index";
import { OrderHistorySettledComponent } from './order-history-settled/order-history-settled';
import { OrderHistoryUnsettledComponent } from './order-history-unsettled/order-history-unsettled';
import { OrderListAllComponent } from './order-list-all/order-list-all';
import { OrderListFinishedComponent } from './order-list-finished/order-list-finished';
import { OrderListRefundComponent } from './order-list-refund/order-list-refund';
import { UnCouponComponent } from './un-coupon/un-coupon';
import { HadCouponComponent } from './had-coupon/had-coupon';
import { PastCouponComponent } from './past-coupon/past-coupon';
import { TradeDetailAllComponent } from './trade-detail-all/trade-detail-all';
import { TradeDetailCostComponent } from './trade-detail-cost/trade-detail-cost';
import { TradeDetailIncomeComponent } from './trade-detail-income/trade-detail-income';
@NgModule({
	declarations: [NoDataComponent,
    OrderHistoryAllComponent,
    OrderHistorySettledComponent,
    OrderHistoryUnsettledComponent,
    OrderListAllComponent,
    OrderListFinishedComponent,
    OrderListRefundComponent,
    UnCouponComponent,
    HadCouponComponent,
    PastCouponComponent,
    TradeDetailAllComponent,
    TradeDetailCostComponent,
    TradeDetailIncomeComponent],
	imports: [IonicModule],
	exports: [NoDataComponent,
    OrderHistoryAllComponent,
    OrderHistorySettledComponent,
    OrderHistoryUnsettledComponent,
    OrderListAllComponent,
    OrderListFinishedComponent,
    OrderListRefundComponent,
    UnCouponComponent,
    HadCouponComponent,
    PastCouponComponent,
    TradeDetailAllComponent,
    TradeDetailCostComponent,
    TradeDetailIncomeComponent]
})
export class ComponentsModule {}
