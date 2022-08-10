import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/interfaces';
import { OrderListService } from 'src/app/shared/services/orderListService';
import { PositionsService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('idCategory') idCategory: string | any
  @ViewChild('modal') modalRef: ElementRef | any
  @ViewChild('modal_cost') modalRefCost: ElementRef | any

  form!: FormGroup
  formCost!: FormGroup
  isNew = false
  positions!: Position[]
  positionId: string | any
  loading = true
  name?: String
  description?: String
  cost: number = 0
  costs?: number
  pSub!: Subscription
  values = 0;
  modal: IMaterialInstance | any
  modal_cost: IMaterialInstance | any

  constructor(private positionService: PositionsService,
    private orderListService: OrderListService
  ) { }

  ngOnInit(): void {
    this.pSub = this.positionService.fetch(this.idCategory).subscribe(
      positions => {
        this.positions = positions
        this.loading = false
      }
    )
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      cost: new FormControl('', [Validators.required, Validators.min(1)]),
    })
    this.formCost = new FormGroup({
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,2}$/)]),
    })
  }
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
    this.modal_cost = MaterialService.initModal(this.modalRefCost)
  }
  ngOnDestroy(): void {
    this.modal.destroy()
    this.modal_cost.destroy()
  }

  onSubmit(event: boolean) {
    if (event === true) {
      this.form.disable()


      const newPosition = {
        id: '',
        name: this.form.value.name,
        description: this.form.value.description,
        cost: this.form.value.cost,
        idCategory: this.idCategory
      }
      const completed = () => {
        this.modal.close()
        this.form.reset({ name: '', description: '', cost: 0 })
        this.form.enable()

      }

      if (this.positionId) {
        newPosition.id = this.positionId
        this.positionService.update(newPosition).subscribe(
          () => {
            const idx = this.positions.findIndex(p => p.id === newPosition.id)
            this.positions[idx] = newPosition
            MaterialService.toast('Сhanges saved')
          },
          error => {
            MaterialService.toast(error.error.message)
            this.form.enable()
          },
          completed
        )
      } else {
        this.positionService.create(newPosition).subscribe(
          () => {
            MaterialService.toast('Position added')
            this.positions.push(newPosition);

          },
          error => {
            MaterialService.toast(error.error.message)
            this.form.enable()
          },
          completed
        )
      }
    }

    else {
      this.formCost.disable()
      const orderList = {
        idPosition: this.positionId,
        quantity: this.formCost.value.quantity,
      }

      this.orderListService.create(orderList).subscribe(
        response => {
          MaterialService.toast('Position added to order')
          this.formCost.enable()

        },
        error => {
          MaterialService.toast(error.error.message)
          this.formCost.enable()
        },
        () => {
          this.modal.close()
          this.formCost.reset({ quantity: 0 })
          this.formCost.enable()
        }
      )
    }

  }

  onAddPosition() {
    this.positionId = null
    this.isNew = true
    this.modal.open()
    this.form.reset({
      name: '',
      description: '',
      cost: 0
    })
    this.modal.open()
    MaterialService.updateTextInput()
  }

  onSelectPosition(position: Position) {
    this.positionId = position.id
    this.isNew = false
    this.form.patchValue({
      name: position.name,
      description: position.description,
      cost: position.cost
    })
    this.modal.open()
    MaterialService.updateTextInput()
  }
  onRemovePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Delete position "${position.name}"?`)
    if (decision) {
      this.positionService.remove(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p.id === position.id)
          this.positions.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
  }
  onCancel() {
    this.modal.close()
    this.modal_cost.close()
    this.formCost.reset({ quantity: '' })
  }
  onAddToOrder(event: Event, position: Position) {
    this.values = 0
    event.stopPropagation()

    this.positionId = position.id
    this.name = position.name
    this.description = position.description
    this.cost = position.cost
    this.isNew = false
    this.formCost.enable()
    this.modal_cost.open()
    MaterialService.updateTextInput()
  }
  onKey(value: string) {
    this.values = +value * this.cost
  }


}
