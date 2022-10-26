import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iorder } from 'src/app/interface/iorder';
import { Iprodcut } from 'src/app/interface/iprodcut';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnChanges {

  orderList : Iorder[] =  [];

  producOrdereList : Iprodcut[] = []

   OrderSelct :string ="[0]" ;

   selectedOrder :any 
   pipe = new DatePipe('en-US');

  constructor(
    private orderServ: OrderService,
    private userService: UserService,
    private orderService : OrderService,
    private router : Router
    ) { 
     }

  ngOnInit(): void {
    this.orderServ.getAllOrders().subscribe((data: any) => {
      this.orderList = data;
      console.log(data);
    });
  // }


  }



  getOrderById(id:any){
    this.orderServ.getOrderById(id).subscribe((data: any) => {
      this.selectedOrder = data;
      console.log(data);
      console.log(this.selectedOrder);

    });
  }




  ngOnChanges() {
  }

  ShowProduct(orderID :string){
    this.OrderSelct = orderID ;     
    const orderSelct = this.orderList.filter( (obj) =>
    obj._id == orderID
    )    
    this.producOrdereList = orderSelct[0].Prodeuct
   }


  onDelete(id:any, order: any){
    const observer = {
      next: () => {
        console.log('removed succesfully');
        this.orderServ.getAllOrders().subscribe((data: any) => {
          this.orderList = data;
        });
      },
      error: (err: Error) => alert(err.message),
    };
    this.orderServ.deleteOrder(id).subscribe(observer);
  }


}