import { SlydepayProvider } from './../../providers/slydepay/slydepay';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  paymentInfo: any
  details:any
  checkPaymentInfo:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public slyde: SlydepayProvider) {

    this.paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'))
    console.log('Payment data ', this.paymentInfo)
    this.onCheckPayment(this.details)
  }

  ionViewDidLoad() {
    
  }
  onDismiss() {
    this.viewCtrl.dismiss();
  }

  onCheckPayment(details) {
    this.details = {
      emailOrMobileNumber: 'kingcode01@gmail.com',
      merchantKey: '1527702629234',
      orderCode: this.paymentInfo.orderCode,
      confirmTransaction: true
    }

   this.slyde.checkPayment(this.details).then((res)=> {
    this.checkPaymentInfo = JSON.stringify(res) 
    console.log("Check payment ",this.checkPaymentInfo)
   },(err)=> {
     console.log(err);
   })
  }

}
