

export interface User {
	id?: string
	username?: string
	email: string
	password: string

}

export interface Category {
	id?: string
	name?: string
	description?: string
	idUser?: string
	imageSrc?: string
}

export interface Position {
	id?: string
	name: string
	description?: string
	cost: number
	idCategory: string
	userCreator?: string
}

export interface Message {
	message: string
}

export interface Order {
	id: string
	costs: number
	idUser?: string
	updatedAt: Date
	orderStatus: boolean

}


export interface OrderListItem {
	id?: string
	idOrder?: string
	idPosition?: string
	quantity?: number
	cost?: number
	updatedAt?: Date
	name?: string
}





