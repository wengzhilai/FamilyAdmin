import { Component } from '@angular/core';
import { Config } from "../../@core/Classes/Config";
import { AppGlobal } from "../../@core/Classes/AppGlobal";
import { JsonFilterPipe } from "../../@theme/pipes/JsonFilter";
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import {
  TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';

@Component({
  selector: 'ngx-confirmModal',
  templateUrl: './confirm.html',
})
export class ModalConfirmPage {
  OkText = "确定"
  ChancelText = "取消"
  message: string;
  OkHandler: any;
  CancelHandler: any
  inputs = []
  inputsIsTabs = []
  bean: any = {}

  _columns: any = {}
  saveKeys = []
  key: string = ""
  //所有用于绑定的值
  ValuesBean = {}
  ItemIsNew: boolean = false;

  ddrtreeConfig = TreeviewConfig.create({
    hasAllCheckBox: false,
    maxHeight: 100
  });
  constructor(
    private http: Http,
  ) {

  }

  ngOnInit() {
    // this.Post("query/query", {
    //   "Key": "query",
    //   "PageIndex": 1,
    //   "PageSize": 10
    // }).then(data => {
    //   if (data.IsSuccess) {
    //     this.ValuesBean["roleIdList"]=[]
        
    //     data.Data.forEach(element => {
    //       console.log(element)
    //       this.ValuesBean["roleIdList"].push(new TreeviewItem(element))
    //     });
    //     console.log(this.ValuesBean["roleIdList"]);
    //   }
    // })
  }



  confirm(): void {
    if (this.OkHandler != null) {
      this.OkHandler(this.bean, this.saveKeys);
    }
  }
  decline(): void {
    if (this.CancelHandler != null) {
      this.CancelHandler(this.bean, this.saveKeys);
    }
  }


  SetSettingsColumns(columnsJson) {
    this.inputs = []
    for (const key in columnsJson) {
      this.inputs.push({
        name: key,
        title: columnsJson[key].title,
        placeholder: columnsJson[key].title,
        type: columnsJson[key].type,
        inputWidth: columnsJson[key].inputWidth,
        editable: columnsJson[key].editable,
        editor: columnsJson[key].editor,
        isTabs: columnsJson[key].isTabs ? true : false, //是否用tabs显示
        tooltip: columnsJson[key].tooltip,
      })


      if (this.bean != null && columnsJson[key].defaultValue != null) {
        //没有配置值才设置默认值
        if (this.bean[key] == null) this.bean[key] = columnsJson[key].defaultValue
      }

      if (columnsJson[key].editable != false) {
        this.saveKeys.push(key)
      }
    }

    this.inputsIsTabs = new JsonFilterPipe().transform(this.inputs, "isTabs", true);
    //传入的配置
    console.log("传入的配置")
    console.log(this.inputs)
    //传入的默认值
    console.log("传入的默认值")
    console.log(this.bean)

  }
  GetTreeviewConfig(fig, dataFig: any, name) {
    console.log(fig)
    console.log(dataFig)
    console.log(name)
    this.ValuesBean[name] = []
    this.Post(dataFig.api, dataFig.config).then(data => {
      if (data.IsSuccess) {
        data.Data.forEach(element => {
          this.ValuesBean[name].push(new TreeviewItem(element))
        });
        console.log(this.ValuesBean[name]);
      }
    })
    return TreeviewConfig.create({
      "hasAllCheckBox": true,
      "hasFilter": true,
      "hasCollapseExpand": false,
      "maxHeight": 500
    });
  }


  Post(apiName, postBean: any, callback = null) {
    console.group("开始请求[" + apiName + "]参数：");
    console.time("Post时间");

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (AppGlobal.GetToken() != null) {
      headers.append('Authorization', 'Bearer ' + AppGlobal.GetToken());
    }
    // console.log(headers)
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(Config.api + apiName, postBean, options)
      .toPromise()
      .then((res: any) => {
        console.log("返回结果：");
        let response: any = res.json();
        if (response.IsSuccess) {
          if (callback) {
            callback(response);
          }
        }
        else {
        }
        console.timeEnd("Post时间");
        console.groupEnd();
        return response;
      }, (error) => {
        console.error('请求失败:');
        console.timeEnd("Post时间");
        console.groupEnd();

        let errorMsg: any = {};
        errorMsg.IsSuccess = false;
        errorMsg.Msg = "连接网络失败";
        return errorMsg
      })
  }

}
