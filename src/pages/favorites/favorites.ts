import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
}) 
export class FavoritesPage implements OnInit{

  favorites: Dish[];
  errMess: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private favoriteservice: FavoriteProvider,
              private toastCtrl: ToastController,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController,
              @Inject('BaseURL') private BaseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
    
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
                 errmess => this.errMess = errmess);
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);

    let alert = this.alertCtrl.create({
      title: 'Deleting',
      message: 'Do you want to delete Favorite' + id,
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadCtrl.create({
              content: 'Deleting . . .',
              duration: 3000
            });
            let toast = this.toastCtrl.create({
              message: 'Dish '+ id + ' deleted successfully',
              duration: 3000
            });
            loading.present();
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present()},
              errmess => { this.errMess = errmess; loading.dismiss();});
          }
        }
      ]
    });

    alert.present();
    

    item.close();

  }

  dishSelected(event, dish) {
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    })
  } //navigate to dishdetail page
  
  

}
