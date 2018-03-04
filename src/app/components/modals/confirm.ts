import { Component } from '@angular/core';
import { JsonFilterPipe } from "../../@theme/pipes/JsonFilter";

@Component({
    selector: 'ngx-confirmModal',
    templateUrl: './confirm.html',
})
export class ModalConfirmPage {

    constructor() { }

    ngOnInit() {
    }

    OkText = "确定"
    ChancelText = "取消"
    message: string;
    OkHandler: any;
    CancelHandler: any
    inputs = []
    inputsIsTabs =[]
    bean: any = {}

    _columns: any = {}
    saveKeys = []

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
    
    /**
     * 用于解译setting.columns
     * {
     * ID:{
     *   title: '描述', //标题
     *   type: 'string', //类型
     *   editable: false, //是否可以编辑
     *   inputWidth: 12   //编辑框长度，最大值12
     *   }
     * }
     * @param columns ng2-smart-table的setting.columns
     */
    SetSettingsColumns(columnsJson) {
        this.inputs=[]
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

            if (columnsJson[key].defaultValue != null) {
                this.bean[key] = columnsJson[key].defaultValue
            }

            if (columnsJson[key].editable != false) {
                this.saveKeys.push(key)
            }
        }

        this.inputsIsTabs=new JsonFilterPipe().transform(this.inputs,"isTabs",true);
        //传入的配置
        console.log("传入的配置")
        console.log(this.inputs)
        //传入的默认值
        console.log("传入的默认值")
        console.log(this.bean)
    }
}
