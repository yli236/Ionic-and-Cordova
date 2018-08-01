import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit{

  dishes: Dish[];
  errMess: string;
  favorites: Dish[];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dishservice: DishProvider,
              private favoriteservice: FavoriteProvider,
              private toastCtrl: ToastController,
              @Inject('BaseURL') private BaseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ngOnInit(){
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = errmess);
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => errmess = this.errMess);
  }

  dishSelected(event, dish) {
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    }); //navigate to dishdetail page
  }

  addToFavorite(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this.favoriteservice.addFavorite(dish.id);
    this.toastCtrl.create({
      message: 'Dish '+ dish.id + ' added successfully',
      position: 'middle',
      duration: 1000
    }).present();

    
  }

}
