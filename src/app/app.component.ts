import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from './services/toastr.service';
import { ToastType } from './components/toaster/enums/toast-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly toastrService: ToasterService) {}

  ngOnInit(): void {
    this.toastrService.init();
    this.toastrService.showToast({ 
        type: ToastType.ERROR,
        text: 'Hello!',
    })
  }
}
