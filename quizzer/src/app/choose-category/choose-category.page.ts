import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.page.html',
  styleUrls: ['./choose-category.page.scss'],
})
export class ChooseCategoryPage implements OnInit {
  categories = []
  
  constructor( public quizService : QuizService, public userService : UserService ) {
    this.categories = this.quizService.getCategories()
    console.log(this.categories)
  }
    
  ngOnInit() {
  }
}
