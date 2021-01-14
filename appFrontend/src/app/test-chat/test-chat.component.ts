import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.css']
})
export class TestChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('test chat component!');
  }

}
