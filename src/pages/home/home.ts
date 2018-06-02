import { PaymentPage } from './../payment/payment';
import { SlydepayProvider } from './../../providers/slydepay/slydepay';
import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  item: string
  quantity: number
  details: any
  invoiceDetails: any
  response: any;
  order: any[] = []
  constructor(public navCtrl: NavController, public slyde: SlydepayProvider, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }

  onPay(details) {
    this.details = {
      emailorMobileNumber: 'kingcode01@gmail.com',
      merchantKey: 1527702629234
    }
    this.slyde.showPayment(this.details).then((res) => {
      this.response = res

      console.log(res);
      console.log("Local Response ", this.response);
    }, (err) => {
      console.log(err);
    })
  }

  tapItem(details) {
    // const index: number = this.response.indexOf(order);
    // if (index !== -1) {
    //   this.order.push(order)
    // }
    // console.log(this.order);

    // this.details = {
    //   emailorMobileNumber: '0572400922',
    //   merchantKey: '1527702629234',
    //   amount: 35,
    //   orderCode: 'my-uniquely-generated-order-id'

    // }

    // this.slyde.createInvoice(this.details).then((res) => {
    //   console.log(res);
    // }, (err) => {
    //   console.log(err);
    // })

    this.presentAlert(details)
  }

  presentAlert(details) {
    const alert = this.alertCtrl.create({
      title: 'Processing Payment',
      message: 'Are you sure this is what you want to',
      buttons: [{
        text: 'No',
        handler: data => {
          console.log('Cancel clicked')
        }
      }, {
        text: 'Yes',
        handler: data => {
          this.onInvoice(this.invoiceDetails)
          const modal = this.modalCtrl.create(PaymentPage)
          modal.present();
        }
      }
      ]
    })
    alert.present()
  }




  onInvoice(details) {
    this.invoiceDetails = {
      emailOrMobileNumber: 'kingcode01@gmail.com',
      merchantKey: '1527702629234',
      amount: 35,
      orderCode: this.makeid(),
      // description: "Hope this works",
      orderItems: [{
        itemCode: 'test-01',
        itemName: this.item,
        unitPrice: 9.0,
        quantity: this.quantity,
        subTotal: this.quantity * 9.0
      }],
      sendInvoice: true,
      payOption: 'ZENITH_VISA',
      customerName: 'Nana Kwame',
      customerEmail: 'nacheampong123@gmail.com'
    }

    this.slyde.createInvoice(this.invoiceDetails).then((res) => {
      console.log(res);
      localStorage.setItem('paymentInfo', JSON.stringify(res))
    }, (err) => {
      console.log(err);
    })


  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
