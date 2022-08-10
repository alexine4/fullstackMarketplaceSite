import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Message, Order, OrderListItem } from '../interfaces'


@Injectable()



export class OrderListService {


	constructor(private http: HttpClient) { }

	create(order: OrderListItem): Observable<OrderListItem> {
		return this.http.post<OrderListItem>('/api/order', order)
	}

	fetchOrderList(): Observable<OrderListItem[]> {
		return this.http.get<OrderListItem[]>(`/api/order/${true}`)
	}
	fetchOrderListByOrder(order: Order): Observable<OrderListItem[]> {
		return this.http.get<OrderListItem[]>(`/api/order/allOrders/${order.id}`)
	}

	fetch(): Observable<OrderListItem[]> {
		return this.http.get<OrderListItem[]>('/api/order')
	}

	getById(id: string): Observable<OrderListItem> {
		return this.http.get<OrderListItem>(`/api/order/${id}`)
	}
	update(orderList: OrderListItem): Observable<OrderListItem> {
		return this.http.patch<OrderListItem>(`/api/order/orderList/update`, orderList)
	}
	remove(orderList: OrderListItem): Observable<Message> {
		return this.http.delete<Message>(`/api/order/orderList/${orderList.id}`)
	}
}