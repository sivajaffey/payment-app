import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  cardForm: FormGroup;
  constructor(private fb: FormBuilder, private service: CommonService, private route: Router,private toastr: ToastrService) { }
  pageType = true;
  displayedColumns: string[] = ['cardno', 'firstName', 'lastName', 'cvvNo', 'expDate', 'amount'];

  dataSource = [];
  ngOnInit() {
    if( this.route.url == "/card") {
      this.cardForm = this.fb.group({
        cardno: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        expDate: ['', Validators.required],
        cvvNo: ['', Validators.required],
        amount: ['', Validators.required]
      });
      this.pageType = true;
    } else if (this.route.url == "/card-details") {
      this.pageType = false;
      this.dataSource = this.service.getLocal('payment-details');
    }

  }
  onSubmit(){
    
    if(this.cardForm.valid) {
      if (this.service.postCardData(this.cardForm.value)) {
        this.cardForm.reset();
      }
    } else {
      this.service.alert('warning' ,'Not valid');
    }
  }

}

