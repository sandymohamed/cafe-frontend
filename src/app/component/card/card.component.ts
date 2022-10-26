import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() content:any

  @Input() ord:any 
  myitem:object={
    date: '',
    user: '',
    room: 0,
    ext: 0,
    action: ''
    
    
    } 
  constructor() { 
    // JSON.stringify(this.content)
  //   this.ord.map((item:any) => {
  //     console.log('item: '+ item)
  //    return this.myitem= {
  //     date: item.date,
  //     user: item.user.username,
  //     room: item.room,
  //     ext: item.ext,
  //     action: item.action
  //    }
  //   })
  }

  ngOnInit(): void {
    console.log("content: " + this.content)
  

  } 

  ngOnChanges(changes: SimpleChanges): void {

  }

}