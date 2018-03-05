import { Component } from '@angular/core';
import { JsonFilterPipe } from "../../@theme/pipes/JsonFilter";
import { ToPostService, CommonService } from '../../@core/Service';
import {
  TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';


@Component({
  selector: 'role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent {

  key: string = ""

  items: Array<TreeviewItem> = [];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    maxHeight: 100
  });

  constructor(
    private toPostService: ToPostService,
    private commonService: CommonService,
  ) {
    this.toPostService.Post("module/list", { Key: this.key }).then(x => {
      let allItem = this.commonService.JsonToTreeJson(x.Data, "ID", "NAME", "PARENT_ID");
      allItem.forEach(element => {
        this.items.push(new TreeviewItem(element))
      });
    })
  }

  ngOnInit() {
    if (this.key != "") {
      this.toPostService.Post("role/single", { Key: this.key }).then(x => {
        console.log(x)
      })
    }
  }

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

      if (columnsJson[key].defaultValue != null) {
        this.bean[key] = columnsJson[key].defaultValue
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

  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    console.log(downlineItems)
    console.log(this.bean)
  }
}