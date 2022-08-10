import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'

import { IMaterialInstance, MaterialService } from '../shared/classes/material.service'

import { delay, Observable } from 'rxjs'
import { Order, OrderListItem, Position } from '../shared/interfaces'
import { OrderListService } from '../shared/services/orderListService'

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionsService } from '../shared/services/position.service';
import { OrdersService } from '../shared/services/orders.service'
import { Router } from '@angular/router'



@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],

})
export class NewOrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal_cost') modalRefCost: ElementRef | any



  Position!: Position

  formCost!: FormGroup
  modal_cost: IMaterialInstance | any

  values = 0

  orderItem: OrderListItem | any

  name!: string
  description?: String
  cost: number = 0
  order!: Order
  idOrder: string | any
  orderLists!: OrderListItem[]
  ordersList$: Observable<OrderListItem[]> | undefined
  constructor(
    private orderService: OrdersService,
    private positionService: PositionsService,
    private orderListService: OrderListService,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.ordersList$ = this.orderListService.fetchOrderList()

    this.formCost = new FormGroup({
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,2}$/)]),
    })

    this.orderService.fetchActual().subscribe(
      order => {
        this.order = order

      },
      error => {
        MaterialService.toast(error.error.message)
      },
    )
  }


  ngOnDestroy() {
    this.modal_cost.destroy()
  }

  ngAfterViewInit() {
    this.modal_cost = MaterialService.initModal(this.modalRefCost)
  }

  openModal() {
    this.modal_cost.open()
  }

  cancel() {
    this.modal_cost.close()
    this.formCost.reset({ quantity: '' })
  }

  submit() {

    this.formCost.disable()
    var cost = 0
    var quan = 0
    cost = this.cost
    quan = this.formCost.value.quantity
    const costs = cost * quan
    const newOrderList = {

      id: this.orderItem.id,
      idPosition: this.orderItem.idPosition,
      cost: costs,
      updatedAt: this.orderItem.updatedAt,
      idOrder: this.orderItem.idOrder,
      quantity: this.formCost.value.quantity,
      name: this.name
    }

    this.orderListService.update(newOrderList).subscribe(
      () => {
        MaterialService.toast('Position  was updated')
        this.formCost.enable()
        const idx = this.orderLists.findIndex(p => p.id === newOrderList.id)

        this.orderLists[idx] = newOrderList
      },
      error => {
        MaterialService.toast(error.error.message)
        this.formCost.enable()
      },
      () => {
        this.modal_cost.close()
        this.formCost.reset({ quantity: 0 })
        this.formCost.enable()

        this.orderService.fetchActual().subscribe(
          order => {
            this.order = order
          },
          error => {
            MaterialService.toast(error.error.message)
          },
        )
      }
    )
  }

  onSelectPosition(orderList: OrderListItem | any, orderLists: OrderListItem[] | any) {
    this.orderItem = orderList
    this.orderLists = orderLists

    this.positionService.getById(orderList.idPosition).subscribe(
      position => {
        this.name = position.name
        this.description = position.description
        this.cost = position.cost

      }
    )



    this.formCost.patchValue({
      quantity: orderList.quantity
    }
    )
    this.modal_cost.open()
    MaterialService.updateTextInput()
  }
  onKey(value: string) {
    this.values = +value * this.cost
  }

  onRemovePosition(event: Event, orderList: OrderListItem, orderLists: OrderListItem[]) {
    event.stopPropagation()
    const decision = window.confirm(`Delete position "${orderList.name}"?`)
    if (decision) {
      this.orderListService.remove(orderList).subscribe(
        response => {
          const idx = orderLists.findIndex(p => p.id === orderList.id)
          orderLists.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
  }
  closeOrder() {
    const decision = window.confirm(`You definitely want to close the order?`)
    if (decision) {
      this.orderService.close()
        .subscribe(
          response => {
            MaterialService.toast(response.message)
            setTimeout(() => {
              this.router.navigate(['/history'])
            }, 2000);
          },
          error => {
            MaterialService.toast(error.error.message)
          }
        )
    }
  }
}