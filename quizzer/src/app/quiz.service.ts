import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

var database = firebase.database();

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  categoriesLoop=[]; questionsLoop = []; answersLoop   =[]

  rootRef = database.ref().child("Categories")
  constructor() { }

  getCategories(){
    this.clearArray(this.categoriesLoop)
    this.rootRef = database.ref().child("Categories")
    this.rootRef.on("child_added", snap=> {
      let categoryName = snap.child("CategoryName").val()
      let key = snap.key
      this.categoriesLoop.push(
        {
          key: key,
          name: categoryName
        }
      )
    } )
    return this.categoriesLoop
  }

  getQuestions(categoryCode){
    this.clearArray(this.questionsLoop)
    let Counter = 0
    var rootRef = firebase.database().ref('Questions/' + categoryCode)
    rootRef.once('value',(snapshot) => {
      let questionsSet = snapshot.val();
        for(let key in questionsSet){
        Counter = Counter + 1
        this.questionsLoop.push({
          Counter: Counter,
          Question: key,
          Answer: Object.keys(questionsSet[key]),
          Values: Object.values(questionsSet[key])
          });
       }
   })
   return this.questionsLoop
  }
  clearArray(array){
    for(let i=0; i < array.length; i++){array.splice(i)}
  }
 
}
