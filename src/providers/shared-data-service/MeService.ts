import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseServiceProvider } from '../../providers/base-service/base-service';
import { SharedDataServiceProvider } from "../../providers/shared-data-service/shared-data-service";
/*
  Generated class for the SharedDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MeService {
  platform: string; //平台
  savePath: string; //存储路径

  packageName: string;  //包名
  appVersion: string = '1.0.18';  //版本号

  constructor(
    public http: HttpClient,
    public httpService:BaseServiceProvider,
    private Share: SharedDataServiceProvider,
  ) {
    console.log('Hello SharedDataServiceProvider Provider');
  }
  getUpdate(showLoading: boolean) {
    return this.httpService.getUpdateInfo(this.Share.packageName, showLoading);
  }
}
