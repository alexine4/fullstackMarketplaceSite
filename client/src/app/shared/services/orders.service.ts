import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Message, Order, OrderListItem } from '../interfaces'

@Injectable()
export class OrdersService {
	constructor(private http: HttpClient) { }

	create(order: Order): Observable<Order> {
		return this.http.post<Order>('/api/order', order)
	}
	createList(order: OrderListItem): Observable<OrderListItem> {
		return this.http.post<OrderListItem>('/api/order', order)
	}

	fetchActual(): Observable<Order> {
		return this.http.get<Order>(`/api/order/orderStatus/${true}`)
	}

	fetch(params: any = {}): Observable<Order[]> {
		return this.http.get<Order[]>('/api/order', {
			params: new HttpParams({ fromObject: params })
		})

	}

	fetchByParams(params: any = {}): Observable<Order[]> {
		return this.http.get<Order[]>(`/api/order`, {
			params: new HttpParams({ fromObject: params })
		})
	}
	close(): Observable<Message> {
		return this.http.patch<Message>(`/api/order/${false}`, null)
	}
}