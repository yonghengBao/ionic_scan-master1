import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SharedDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedDataServiceProvider {
  platform: string; //平台
  savePath: string; //存储路径

  packageName: string;  //包名
  appVersion: string = '1.0.18';  //版本号

  constructor(public http: HttpClient) {
    console.log('Hello SharedDataServiceProvider Provider');
  }

}
