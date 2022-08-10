import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core'
import { Order, OrderListItem } from '../../shared/interfaces'
import { IMaterialInstance, MaterialService } from '../../shared/classes/material.service'
import * as moment from 'moment'
import { OrderListService } from 'src/app/shared/services/orderListService'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  @Input() orders: Order[] | any
  @ViewChild('modal') modalRef: ElementRef | any

  modal: IMaterialInstance | any
  selectedOrder!: Order
  status: string | any
  orderLists!: OrderListItem[]
  orderList$!: Observable<OrderListItem[]>

  constructor(private orderListService: OrderListService) { }

  getOrderTime(order: Order): string {
    return moment(order.updatedAt).format('HH:mm:ss')
  }

  getOrderDate(order: Order): string {
    return moment(order.updatedAt).format('DD.MM.YYYY')
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy()
  }
  orderTransform(order: Order) {
    if (order.orderStatus === true) {
      this.status = 'Open'
    } else {
      this.status = 'Close'
    }
    return this.status
  }

  showOrderList(order: Order) {
    this.selectedOrder = order
    this.orderList$ = this.orderListService.fetchOrderListByOrder(order)
    this.modal.open()
  }

  closeListModal() {
    this.modal.close()
  }

}