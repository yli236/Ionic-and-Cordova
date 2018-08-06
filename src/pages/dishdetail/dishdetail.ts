import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage{

  dish: Dish;
  errMess: String;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  favorites: Dish[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              @Inject('BaseURL') private BaseURL,
              private favoriteservice: FavoriteProvider,
              private toastCtrl: ToastController,
              private actionsheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private soicalSharing: SocialSharing,) {
                this.dish = navParams.get('dish');
                this.favorite = this.favoriteservice.isFavorite(this.dish.id);
                this.numcomments = this.dish.comments.length;
                
                let total = 0;
                this.dish.comments.forEach(comment => total+=comment.rating);
                this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  

  addToFavorite() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish '+this.dish.id+ " added successfully",
      duration: 3000
    }).present();


  }

  presentAction(dish) {
    const action = this.actionsheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorite();
            console.log('Successfully add the dish')
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            let modal = this.modalCtrl.create(CommentPage, {dish: dish});
            modal.present();
            console.log('successfully add the comment')
          }
        },
        {
          text: 'Share via Facebook',
          handler: () =>{
            this.soicalSharing.shareViaFacebook(
              this.dish.name + " -- " + this.dish.description,
              this.BaseURL + this.dish.image,
              ''
            )
            .then(() => console.log("Successfully shared via facebook"))
            .catch(() => console.log("FB Failed"));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.soicalSharing.shareViaTwitter(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image,
              ''
            )
            .then(() => console.log("Successfully shared via twitter"))
            .catch(() => console.log("Twitter Failed"));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel the action')
          }
        }
      ]
    }).present();
  }



  

}
