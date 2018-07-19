import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage{

  commentForm: FormGroup;
  comment: Comment;
  dish: Dish;
  dishes: Dish[];
  dishcopy = null;
  errmess: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private formbuilder: FormBuilder) { 
                this.dish = navParams.get('dish');
                this.commentForm = this.formbuilder.group({
                  author:'',
                  rating:5,
                  comment:''
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();    
    this.dish.comments.push(this.comment);
    
    this.viewCtrl.dismiss();
    console.log("submitted")

  }


}
