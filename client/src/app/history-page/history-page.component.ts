import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { OrdersService } from '../shared/services/orders.service'
import { Order } from '../shared/interfaces'
import { Observable, Subscription } from 'rxjs'
import { IMaterialInstance, MaterialService } from '../shared/classes/material.service'
import { Filter } from './history-filter/history-filter.component'

const STEP = 5
const LIMIT = 5


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('datepicker') modalRef: ElementRef | any
  @ViewChild('tooltip') tooltipRef: ElementRef | any
  modal: IMaterialInstance | any
  isRoot!: boolean
  filterVisible = false
  loading = true
  oSub!: Subscription

  orders: Order[] = []
  tooltip: IMaterialInstance | any
  reloading = false
  noMore = false
  helpText = false
  limit = LIMIT
  offset = 0
  activePrev = false
  activeNext = true
  ordersLenght = 0
  filter: Filter = {}

  orders$: Observable<Order[]> | undefined
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    const params = Object.assign({}, this.filter, {
      limit: 10,
    })
    this.orders$ = this.ordersService.fetch(params)

    this.helpText = true
  }


  ngOnDestroy() {

    this.tooltip.destroy()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  private fetchByParams() {



    const params = Object.assign({}, this.filter, {
      limit: this.limit,
      offset: this.offset
    })
    this.orders$ = this.ordersService.fetchByParams(params)
    this.orders$.subscribe(
      order => {
        if (this.offset - STEP >= 0) {
          this.activePrev = true
          this.activeNext = true
        } else {
          this.activePrev = false

        }
        this.ordersLenght = order.length
        if (this.ordersLenght == STEP) {
          this.activeNext = true

        } else {
          this.activeNext = false

        }


      }

    )
    this.loading = false
  }



  loadPreview() {
    if (this.offset - STEP >= 0) {

      this.offset -= STEP
      this.loading = true
      this.fetchByParams()
    }


  }
  loadMore() {

    if (this.ordersLenght > 1) {

      this.offset += STEP
      this.loading = true
      this.fetchByParams()
    }



  }
  applyFilter(filter: Filter) {
    this.limit = LIMIT
    this.offset = 0
    this.helpText = false

    this.filter = filter

    this.fetchByParams()
  }
  isFiltered(): boolean {

    return Object.keys(this.filter).length !== 0
  }

  enterFilter() {
    /*    if (this.filter) {
         this.filter = false
       } else {
         this.filter = true
       } */
  }
  clickPicker() {
    /* ocument.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.datepicker');
      var instances = MaterialService.initDatepicker(this.modalRef)*/
  }
}
