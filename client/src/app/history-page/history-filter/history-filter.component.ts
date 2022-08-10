import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core'
import { IMaterialDatepicker, MaterialService } from '../../shared/classes/material.service'
import * as moment from 'moment'


export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {

  @ViewChild('dtStart') dtStartRef: ElementRef | any
  @ViewChild('dtEnd') dtEndRef: ElementRef | any

  @Output() onFilter = new EventEmitter<Filter>()

  start: IMaterialDatepicker | any
  end: IMaterialDatepicker | any

  orderNumber: number | any



  validboll: boolean | any



  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(this.dtStartRef, this.validateDate.bind(this))
    this.end = MaterialService.initDatepicker(this.dtEndRef, this.validateDate.bind(this))
    MaterialService.updateTextInput()
  }

  validateDate() {
    this.end += " 24:00"
    if (this.start.date === undefined && this.end.date === undefined) {
      this.validboll = false

    }

    if (this.start.date !== undefined && this.end.date !== undefined) {

      const s = moment(this.start.date)
      const e = moment(this.end.date)

      this.validboll = s.isBefore(e)
    } else if (this.start !== undefined || this.end !== undefined) {
      this.validboll = true

    }


  }




  submit() {
    const opts: Filter = {}

    if (this.start.date) {
      opts.start = this.start.date
    }

    if (this.end.date) {
      opts.end = this.end.date
    }

    if (this.orderNumber) {
      opts.order = this.orderNumber
    }


    this.onFilter.emit(opts)


  }

  ngOnDestroy() {
    this.start.destroy()
    this.end.destroy()
  }

}