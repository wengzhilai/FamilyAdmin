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
  LoadSetting: boolean = false;
  /**
   * 用于绑定table的设置
   */
  settings: any = ServerDataSource.getDefaultSetting();
  /**
   * 读取配置文件的设置
   */
  configJson: any = {}


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
        //隐藏，hide=true的字段
        let t = ""
        eval("t=" + data.Data.QUERY_CFG_JSON)
        this.configJson = t
        let tempCol = ServerDataSource.ReMoveHideItem(this.configJson);
        for (const item in tempCol) {
          if (tempCol[item]["renderComponent"] == "SmartTableFormatValuePage") {
            tempCol[item]["renderComponent"] = SmartTableFormatValuePage
          }
        }
        this.settings.columns = tempCol
        this.LoadSetting = true
        //配置是否有筛选框
        if (data.Data.SHOW_CHECKBOX != 1) {
          this.settings.selectMode = "single"
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

  onSave(e) {
    // console.log(this.source.getAll())
    console.log(this.smartTable)
    console.log(e)
    this.source.getFilteredAndSorted().then(x => {
      console.log(x)
    })
  }

}