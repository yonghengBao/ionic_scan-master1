import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {App, ToastController ,LoadingController  } from 'ionic-angular';

@Injectable()
export class BaseServiceProvider {
  userData:any;
  loadingIsOpen:boolean = false;
  loading:any;
  public getUpdateInfo(uuid, showLoading) {
    if (showLoading) {
      this.loading.presentLoadingDefault();
    }
    // var url = "此地址获取app信息的接口地址" + uuid;//此处是我们项目接口所需把本地app的信息包名传到接口
    // return this.http.get(url).toPromise()
    return this.http.get('').toPromise()
      .then(res => {
        if (this.loading) {
          // this.loading.dismissLoadingDefault();
          console.log("请求回来的数据是空")
        }
        return res
        // return res.json();
      })
      .catch(err => {
        console.log("APP信息接口出错："+err)
        // this.handleError(err);
      });
  }
  //正则：
  public regEmail = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/); //邮箱的正则
  public regPhone = new RegExp(/^1[3456789]\d{9}$/); //手机号码的正则
  public regQQ = new RegExp(/[1-9][0-9]{4,}/); //QQ号码的正则
  public regPassward = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/); //密码验证规则（6~12位字母数字组和）
  public regID = new RegExp(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/); //身份证正则
  public regIP = new RegExp(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/)
  public regBankCard = new RegExp( /^([1-9]{1})(\d{15}|\d{18})$/);//银行卡的正则
  public regMoney = new RegExp(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);//金额正则
  constructor(public http: HttpClient,public storage:Storage,public createToast:ToastController ,public appCtrl: App ,public loadingCtrl: LoadingController) {
  }
  //test(){
  //  //noinspection TypeScriptValidateTypes
  //  return this.http.get("http://jsonplaceholder.typicode.com/users").toPromise().then((data)=>{
  //    console.log(data)
  //  },(err)=>{
  //    console.log("ERROR",err)
  //  }).then(()=>{
  //    console.log(111111)
  //  })
  //}
  //postData(url,data){
  //  const headers = new HttpHeaders().set("Accept","application/json;charset=UTF-8");
  //  this.http.request("POSt", url, {body:data,headers:headers}).subscribe((data)=>{
  //    console.log(data)
  //  },(error)=>{
  //    console.log("Error", error);
  //  })
  //}
  //不携带参数请求数据
  requestData(type:string,url:string,succ:any){
    //url = "http://10.120.3.224:9999"+url;
    url = "http://182.140.221.106:12219"+url;
    this.storage.get("userData").then((val:any)=>{
      if(val){//判断用户信息是否存在
        this.userData = val;
        const headers = new HttpHeaders().set("Accept","application/json;charset=UTF-8").set('x-user-token',this.userData.token);
        this.http.request(type,url,{headers:headers}).subscribe((resData:any)=>{
          this.hideLoading();
          if(resData.code == "000000"){
            succ(resData)
          }else if (resData.code == "000001" || resData.code == "000002"){
            this.toast("登录失效请重新登录","bottom");
            this.storage.remove("userData");
            let myTimer = setTimeout(()=>{
              this.appCtrl.getRootNav().setRoot("LoginPage");
              clearTimeout(myTimer);
              myTimer = null;
            },2000)
          }else {
            this.toast(resData.msg,"bottom");
          }
        },(err)=>{//错误处理
          console.log("ERROR",err)
        })
      }else{
        this.http.request(type,url).subscribe((resData:any)=>{
          this.hideLoading();
          if(resData.code == "000000"){
            succ(resData)
          }else if (resData.code == "000001" || resData.code == "000002"){
            this.toast("登录失效请重新登录","bottom");
            this.storage.remove("userData");
            let myTimer = setTimeout(()=>{
              this.appCtrl.getRootNav().setRoot("LoginPage");
              clearTimeout(myTimer);
              myTimer = null;
            },2000)
          }else {
            this.toast(resData.msg,"bottom");
          }
        },(err)=>{//错误处理
          console.log("ERROR",err)
        })
      }
    })
  }
  //携带参数请求数据
  requestParamData(type:string,url:string,myParams:any,succ:any){
    //url = "http://10.120.3.224:9999"+url;
    url = "http://182.140.221.106:12219"+url;
    this.storage.get("userData").then((val:any)=>{
      if(val){//判断用户信息是否存在
        this.userData = val;
        const headers = new HttpHeaders().set("Accept","application/json;charset=UTF-8").set('x-user-token',this.userData.token);
        if(type=="GET" || type == "get"){
          this.http.request(type,url,{headers:headers,params:myParams}).subscribe((resData:any)=>{
            this.hideLoading();
            if(resData.code == "000000"){
              succ(resData)
            }else if (resData.code == "000001" || resData.code == "000002"){
              this.toast("登录失效请重新登录","bottom");
              this.storage.remove("userData");
              let myTimer = setTimeout(()=>{
                this.appCtrl.getRootNav().setRoot("LoginPage");
                clearTimeout(myTimer);
                myTimer = null;
              },2000)
            }else {
              this.toast(resData.msg,"bottom");
            }
          },(err)=>{
            console.log("ERROR",err)
          })
        }else {
          this.http.request(type,url,{body:myParams,headers:headers}).subscribe((resData:any)=>{
            this.hideLoading();
            if(resData.code == "000000"){
              succ(resData)
            }else if (resData.code == "000001" || resData.code == "000002"){
              this.toast("登录失效请重新登录","bottom");
              this.storage.remove("userData");
              let myTimer = setTimeout(()=>{
                this.appCtrl.getRootNav().setRoot("LoginPage");
                clearTimeout(myTimer);
                myTimer = null;
              },2000)
            }else {
              this.toast(resData.msg,"bottom");
            }
          },(err)=>{
            console.log("ERROR",err)
          })
        }
      }else{
        if(type=="GET" || type == "get"){
          this.http.request(type,url,{params:myParams}).subscribe((resData:any)=>{
            this.hideLoading();
            if(resData.code == "000000"){
              succ(resData)
            }else if (resData.code == "000001" || resData.code == "000002"){
              this.toast("登录失效请重新登录","bottom");
              this.storage.remove("userData");
              let myTimer = setTimeout(()=>{
                this.appCtrl.getRootNav().setRoot("LoginPage");
                clearTimeout(myTimer);
                myTimer = null;
              },2000)
            }else {
              this.toast(resData.msg,"bottom");
            }
          },(err)=>{
            console.log("ERROR",err)
          })
        }else {
          this.http.request(type,url,{body:myParams}).subscribe((resData:any)=>{
            this.hideLoading();
            if(resData.code == "000000"){
              succ(resData)
            }else if (resData.code == "000001" || resData.code == "000002"){
              this.toast("登录失效请重新登录","bottom");
              this.storage.remove("userData");
              let myTimer = setTimeout(()=>{
                this.appCtrl.getRootNav().setRoot("LoginPage");
                clearTimeout(myTimer);
                myTimer = null;
              },2000)
            }else {
              this.toast(resData.msg,"bottom");
            }
          },(err)=>{
            console.log("ERROR",err)
          })
        }
      }
    })
  }
  //带请求回调
  //postData(url,data){
  //    const headers = new HttpHeaders().set("Accept","application/json;charset=UTF-8");
  //    this.http.request("POSt", url, {body:data,headers:headers}).toPromise().then((data)=>{
  //    console.log(data)
  //  },(error)=>{
  //      console.log("Error", error);
  //  }).then(()=>{
  //      this.http.get("http://jsonplaceholder.typicode.com/users").subscribe((data)=>{
  //        console.log(data)
  //      })
  //    })
  //}
  //toast弹出信息
  toast(msg:any,postion:string){
    let toastCtrl=this.createToast.create({
      message:msg,
      duration:2000 ,    //持续时间
      position:postion,
    });
    toastCtrl.present();  //出现
  }
  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading(content: string = ''): void {
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => { //最长显示10秒
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, 10000);
    }
  };

  /**
   * 关闭loading
   */
  hideLoading(): void {
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };

  //日期格式化为几分钟前、几小时前
  FormatMsgTime=function (time) {

    var dateTime = new Date(time);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();

    var now = new Date().getTime();//当前时间

    var milliseconds = now - time;//时间差

    var timeSpanStr;//时间差转换

    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚';
    }
    else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }
    else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }
    else {
      timeSpanStr = year + '-' + month + '-' + day;
    }
    return timeSpanStr;
  };

  //日期格式化
  DateFormatter=function(sj){
    var date = new Date(sj);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
  }
}
