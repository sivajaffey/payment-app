import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }
  postCardData(enteredData) {
    let getExistingData = JSON.parse(localStorage.getItem('payment-details'));
    if(getExistingData == null) {
      let arr = [];
      arr.push(enteredData);
      localStorage.setItem('payment-details', JSON.stringify(arr));
      return true;
    } else if (getExistingData && getExistingData.length > 0) {
      getExistingData.map(data=> {
        if (data.cardno == enteredData.cardno)  {
            this.alert('warning', 'Card Details exists');
          return false;
        } else {
          if(!getExistingData.includes(enteredData)) {
            getExistingData.push(enteredData);
            localStorage.setItem('payment-details', JSON.stringify(getExistingData));
            this.alert('success', 'Card added successfully');
          }
        }
      })
      return true;
    } else {
      this.alert('warning', 'Something went Wrong');
    }
  }
  getLocal(name) {
    return JSON.parse(localStorage.getItem(name));
  }
  alert(type,msg) {
    if ( type == 'success') {
      this.toastr.success(msg)
    } else if ( type == 'warning') {
      this.toastr.warning(msg)
    }
  }
}
