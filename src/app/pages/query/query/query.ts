import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToPostService } from '../../../@core/Service/ToPost.Service';
import { CommonService } from '../../../@core/Service/Common.Service';
import { RequestPagesModel } from "../../../@core/Model/Transport/RequestPagesModel";
import { AppReturnDTO } from "../../../@core/Model/Transport/AppReturnDTO";
import { RequestSaveModel, PostBaseModel } from "../../../@core/Model/Transport";
import { ServerDataSource } from "../../../@core/Classes/SmartTable/ServerDataSource";
import { Http } from '@angular/http';
import { ViewCell } from 'ng2-smart-table';
import { concat } from 'rxjs/observable/concat';
import { SmartTableFormatValuePage } from "../../../components/SmartTable/formatValue";
import { fail } from 'assert';

@Component({
  selector: 'query',
  templateUrl: './query.html',
  styleUrls: ['./query.scss']
})
export class QueryQueryComponent implements OnInit {
  @ViewChild('smartTable') smartTable: ElementRef;

  source: ServerDataSource;
  queryEnt: any = {};
  /**
   * 表头按钮
   */
  headBtnSet: Array<any> = [];
  /**
   * 行按钮
   */
  rowBtnSet: Array<any> = [];

  LoadSetting: boolean = false;
  /**
   * 用于绑定table的设置
   */
  settings: any = ServerDataSource.getDefaultSetting();
  /**
   * 读取配置文件的设置
   */
  configJson: any = {}
  selectedArr = []
  code: any;
  constructor(
    private routerIonfo: ActivatedRoute,
    private toPostService: ToPostService,
    private commonService: CommonService,
    http: Http,
  ) {

  }

  ngOnInit() {
    this.code = this.routerIonfo.snapshot.params["code"];

    this.commonService.showLoading();
    let postClass: PostBaseModel = new PostBaseModel();
    postClass.Key = this.code;
    this.toPostService.Post("query/single_code", postClass).then((data: AppReturnDTO) => {
      this.commonService.hideLoading()
      if (data.IsSuccess) {
        this.queryEnt = data.Data
        //隐藏，hide=true的字段
        let t: any = {}
        //设置列配置
        eval("t=" + this.queryEnt.QUERY_CFG_JSON)
        this.configJson = t
        //设置表头按钮配置
        eval("t=" + this.queryEnt.HEARD_BTN)
        this.headBtnSet = t
        //读取行按钮
        eval("t=" + this.queryEnt.ROWS_BTN)
        this.rowBtnSet = t
        if (this.rowBtnSet == null) this.rowBtnSet = []

        let tempCol = ServerDataSource.ReMoveHideItem(this.configJson);
        for (const item in tempCol) {
          if (tempCol[item]["renderComponent"] == "SmartTableFormatValuePage") {
            tempCol[item]["renderComponent"] = SmartTableFormatValuePage
          }
        }
        this.settings.columns = tempCol
        this.LoadSetting = true
        //配置是否有筛选框
        if (this.queryEnt.SHOW_CHECKBOX != 1) {
          this.settings.selectMode = "single"
        }

        if (this.rowBtnSet.length > 1) {
          this.settings.actions.edit = true
          this.settings.edit.editButtonContent = '<i class="' + this.rowBtnSet[0].class + '"></i>'
        }
        if (this.rowBtnSet.length > 2) {
          this.settings.actions.edit = true
          this.settings.delete.deleteButtonContent = '<i class="' + this.rowBtnSet[1].class + '"></i>'
        }
        this.source = new ServerDataSource(this.toPostService, this.commonService, { endPoint: 'query/query' }, this.code);
      }
      else {
        this.commonService.hideLoading()
      }
    }, (x) => {
      console.log(x)
    })
  }


  userRowSelect(event) {
    this.selectedArr = event.selected
    console.log(this.selectedArr)
  }

  /**
   * 表头按钮事件
   * @param event 
   */
  HeadBtnClick(nowThis, event) {
    if (event != null) {
      eval(event)
    }
  }

  onExportXls() {

    let postBean: RequestPagesModel = new RequestPagesModel();
    postBean.Key=this.code
    this.toPostService.Post("view/export_query",postBean).then(x=>{
      console.log(x)
    })
    // console.log(this.source.getFilter());
    // console.log(this.source.getSort());
  }


  /**
 * 
 * @param event 添加事件
 */
  onDelete(event): void {

    if (this.rowBtnSet.length > 1) {
      this.DeleteApi(this.rowBtnSet[1].apiUrl, event.data.ID, this.rowBtnSet[1].confirmTip)
    }

  }

  onSave(nowThis, event) {
    if (this.rowBtnSet.length > 0) {
      this.Add(this.rowBtnSet[0].apiUrl, event.data)
    }
  }

  DeleteApi(apiUrl, Key, confirmTip) {
    if (window.confirm(confirmTip)) {
      this.commonService.showLoading();
      let postClass: PostBaseModel = new PostBaseModel();
      postClass.Key = Key;
      this.toPostService.Post(apiUrl, postClass).then((data: AppReturnDTO) => {
        this.commonService.hideLoading()
        if (data.IsSuccess) {
          this.source.refresh()
        }
      });
    }
  }


  Add(apiUrl, data = {}): void {
    console.log(this.smartTable)
    console.log(event)
    let add = this.commonService.ShowModal({ class: 'modal-lg' })
    add.content.SetSettingsColumns(this.configJson)
    add.content.bean = data
    add.content.message = "修改查询"
    if (data != null) {
      add.content.message = "添加查询"
    }
    add.content.OkHandler = (bean, saveKeys) => {
      if (window.confirm('确定要保存吗？')) {
        let postClass: RequestSaveModel = new RequestSaveModel();
        postClass.Data = bean;
        postClass.SaveKeys = saveKeys;
        this.toPostService.Post(apiUrl, postClass).then((data: AppReturnDTO) => {
          console.log(data)
          if (data.IsSuccess) {
            this.source.refresh()
            add.hide()
          }
          else {
            this.commonService.hint(data.Msg)
          }
        });
      } else {
        add.hide()
      }
    }
    add.content.CancelHandler = (bean) => {
      add.hide()
    }
  }
}
