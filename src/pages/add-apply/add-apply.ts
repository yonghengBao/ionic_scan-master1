import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { BaseServiceProvider } from '../../providers/base-service/base-service';

@IonicPage()
@Component({
  selector: 'page-add-apply',
  templateUrl: 'add-apply.html',
})
export class AddApplyPage {
  ticketTypeList:Array<{"name":string,"value":string}> = [];//餐券类型列表
  ticketType:string;//选中的餐券
  timeList:Array<{timeName:string,value:string}> = [];//用餐时段列表
  items:Array<{companyName:string,userName:string}>=[];//用餐人员列表
  choosedList:any=[];//选中的用餐时段
  chooseUseDate:any;//餐券使用日期
  addPerson:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private base:BaseServiceProvider,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //获取餐券类型
    this.base.requestData("GET","/diningTicket/getTicketName",(reqData)=>{
      if(reqData.data.length>0){
        for(var tmp of reqData.data){
          let object = {name:tmp.name,value:tmp.id+","+tmp.usedTarget+","+tmp.createBy+","+tmp.name};
          this.ticketTypeList.push(object);
        }
      }
    })
  }
  //修改餐券类型
  getTicketType(){
    //判断为选择客餐券是显示添加用餐人员
    if(this.ticketType.split(",")[3]=="客餐券"){
      this.addPerson=false;
    }else {
      this.addPerson=true;
    }
    //获取对应的用餐时段
    this.base.requestData("GET","/diningTicket/getTicketTime?ticketId="+this.ticketType.split(",")[0],(reqData)=>{
      this.timeList = [];
      if(reqData.data.length>0){
        let item;
        for(var tmp of reqData.data){
          item = {timeName:tmp.timeName+"("+tmp.startTime+"一"+tmp.endTime+")",value:tmp.ticketItemId};
          if(this.timeList.indexOf(item)==-1){
            this.timeList.push(item);
          }
        }
      }else{
        this.base.toast("暂无用餐时段，请选择其他餐券","bottom")
      }
    })
  }
  //添加用餐人员弹出框
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: '添加用餐人员',
      inputs: [
        {
          name: 'companyName',
          placeholder: '请输入公司名称'
        },
        {
          name: 'userName',
          placeholder: '请输入真实姓名'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: data => {
            if(!data.companyName || !data.userName){
              this.base.toast("公司名称和真实姓名不能为空","bottom");
              return;
            }
            this.items.push(data);
          }
        }
      ]
    });
    prompt.present();
  }

  //删除用餐人员
  removeFun(i){
    this.items.splice( i, 1);
  }

  //获取选择的用餐时段
  choose(time){
    if(time.checked){
      this.choosedList +=time.value+",";
    }else {
      let reg=time.value+ ",";
      this.choosedList = this.choosedList.replace(reg,"");
    }
  }

  //提交申请
  subBtn(){
    if(!this.chooseUseDate){
      this.base.toast("请选择用餐日期","bottom");
      return
    }
    if(!this.ticketType){
      this.base.toast("请选择餐券类型","bottom");
      return
    }
    if(!this.choosedList){
      this.base.toast("请选择用餐时段","bottom");
      return
    }
    let companyList = '';//所有公司名称的集合
    let userList = '';//所有使用人的名字的集合
    for(var i=0;i<this.items.length;i++){
      if(!this.items[i].companyName)break
      companyList += this.items[i].companyName + ",";
    }
    for(var j=0;j<this.items.length;j++){
      if(!this.items[j].userName)break
      userList+=this.items[j].userName + ",";
    }
    //对选中餐券的userTarget进行判断：1可以不传公司名称，2:必须传公司名称
    if(this.ticketType.split(",")[1]=="2" && !companyList){
      this.base.toast('请输入公司名称及真实姓名！','middle')
      return;
    }
    let diningTicketApply = {
      "createBy": this.ticketType.split(",")[2],
      "detailList": [
        {
          "companyName": companyList,
          "customerName": userList
        }
      ],
      "ticketId": this.ticketType.split(",")[0],
      "ticketItemId": this.choosedList,
      "useDate": this.chooseUseDate+" "+"08:00:00",
      "usedTarget": this.ticketType.split(",")[1]
    }
    this.base.showLoading("提交中...");
    this.base.requestParamData("POST","/diningTicket/saveTicketApply",diningTicketApply,(reqData)=>{
      this.navCtrl.push("ApplyPage");
    })
  }

}
