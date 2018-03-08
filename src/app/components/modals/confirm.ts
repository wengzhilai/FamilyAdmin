import { Component } from '@angular/core';
import { JsonFilterPipe } from "../../@theme/pipes/JsonFilter";

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
  
    ItemIsNew: boolean = false;

  
  
  
    constructor(
    ) {
  
    }
  
    ngOnInit() {
  
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
  

  }
  