import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Message, Position } from '../interfaces'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class PositionsService {
	constructor(private http: HttpClient) { }

	fetch(idCategory: string): Observable<Position[]> {
		return this.http.get<Position[]>(`/api/position/${idCategory}`)
	}

	create(position: Position): Observable<Position> {
		return this.http.post<Position>('/api/position', position)
	}

	remove(position: Position): Observable<Message> {
		return this.http.delete<Message>(`/api/position/${position.id}`)
	}

	getById(id: string): Observable<Position> {
		return this.http.get<Position>(`/api/position/findByid/${id}`)
	}
	update(position: Position): Observable<Position> {
		return this.http.patch<Position>(`/api/position/${position.id}`, position)
	}
}