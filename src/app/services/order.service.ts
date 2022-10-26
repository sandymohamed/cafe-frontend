import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faColonSign } from '@fortawesome/free-solid-svg-icons';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrderForAdd } from '../interface/i-order-for-add';
import { Iorder } from '../interface/iorder';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpOption:any;

 objOrder : Iorder = {} as Iorder;

  constructor(
    private HttpClient : HttpClient
  ) {

   }


   private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('an error ocuured: ', error.error)

    }else{
      console.error(`Backend returned code ${error.status}, body was: `, error.error)
    }
    return throwError(
      ()=> new Error('error occured, please try again. ')
    )
  }

   getAllOrders(): Observable<any>{
      return this.HttpClient.get<Iorder[]>(`${environment.BasicURL}order`)
      .pipe(
        retry(2),
        catchError(this.handleError)
        )
  }


  getOrderById(orderID: string): Observable<Iorder>{
    return this.HttpClient.get<Iorder>(`${environment.BasicURL}orders/${orderID}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
      )


}


  getOrdersByDate(startDate:any, endDate:any){
    return this.HttpClient.get<Iorder>(`${environment.BasicURL}orders/date_range?startDate=${startDate}&endDate=${endDate}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
      )
  }

  getOrdersByUserName(){

  }

  addOrder(newOrder:IOrderForAdd) : Observable<Iorder>{
    return this.HttpClient.post<Iorder>(`${environment.BasicURL}orders`,    
     JSON.stringify(newOrder),httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
      )}

  // updateOrder(id: string,newOrder:Order) : Observable<Order>{
    updateOrder(id: string,newOrder:any) : Observable<Iorder>{
    return this.HttpClient.put<Iorder>(`${environment.BasicURL}orders/`+id,
     JSON.stringify(newOrder))
    .pipe(
      retry(2),
      catchError(this.handleError)
      ) }

  deleteOrder(id:any) {
    return this.HttpClient.delete(`${environment.BasicURL}orders/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
      )
  }
}