import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
///////////////////////////
import * as firebase from 'firebase'

var database = firebase.database();
@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.page.html',
  styleUrls: ['./view-quiz.page.scss'],
})
export class ViewQuizPage implements OnInit {
  questionSet = []; answerSet = []; gameArray=[]
  categoryCode; userId= 97896978
  index = 0
  constructor(public quizService: QuizService, public route : ActivatedRoute) {
    
    console.log(this.questionSet)
   
  }
    getAnswers(){
      alert("")
     // this.answerSet = this.quizService.getAnswers()
    }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryCode = params.get('key');
    
      this.questionSet = this.quizService.getQuestions(this.categoryCode)
      
      console.log("code" + this.categoryCode)
      console.log("just space")
      
    })
  }
  pushToGameArray(question, answer, correctAnswer, scoreBoolean){
    this.gameArray.push({
      gameQuestions: question,
      usersAnswer: answer,
      correctAnswer: correctAnswer,
      scoreBoolean: scoreBoolean
    })
  }

  setScore(event, Question){
    let question : string = Question
    let userAnswer : string = event.detail.value
    let correctAnswer : string = ""
    let scoreBoolean: string = ""
    console.log(question);
    console.log(userAnswer);

    if(question){
      console.log(this.questionSet)
      for(let i = 0; i<this.questionSet.length; i++){
        if(this.questionSet[i].Question === Question){
          for(let j = 0; j<this.questionSet[i].Answer.length; j++){
            //console.log(this.questionSet[i].Values[j])
            if((this.questionSet[i].Values[j]=== "True") && (this.questionSet[i].Question === question)){
              correctAnswer = this.questionSet[i].Answer[j]
              console.log(correctAnswer)
            }
          }
        }
      }
    }

    if(correctAnswer === userAnswer){
      scoreBoolean = "True"
      console.log("User's Answer is " + scoreBoolean)
    }else{
      scoreBoolean = "False"
      console.log("User's Answer is " + scoreBoolean)
    }

    if(this.gameArray.length == 0){
      //Pushing to game array
      this.pushToGameArray(question, userAnswer, correctAnswer, scoreBoolean)
    }else if(this.gameArray.length > 0){
      for(let i=0; i<this.gameArray.length; i++){
        if(this.gameArray[i].gameQuestions === question){
          this.index = this.gameArray.indexOf(this.gameArray[i])
          console.log(this.index)
        }else{
          this.index = null
        }
       
      }
     
    if(this.index != null){
      console.log(this.index)
        this.gameArray[this.index].usersAnswer = userAnswer
        this.gameArray[this.index].scoreBoolean = scoreBoolean
        console.log(userAnswer)
    } if(this.index === null){
      //Pushiong to the game array
      this.pushToGameArray(question, userAnswer, correctAnswer, scoreBoolean)
      }
    }
    console.log(this.gameArray)
    console.log(this.index)
  }

  submitScores(){
    let gameScore : number =0
    if(this.gameArray){
      console.log(this.gameArray)
      for(let i = 0; i<this.gameArray.length; i++){
        if(this.gameArray[i].scoreBoolean === "True"){
          gameScore++
          
        }
        }
       console.log(gameScore)
      }
      this.submitToFirebase(gameScore)
      
    }
  submitToFirebase(gameScore){
    console.log(this.gameArray)
    var newPostKey = firebase.database().ref().child('Results/' + this.userId + "/").push().key;
    console.log(newPostKey)
    for(let i = 0; i< this.gameArray.length; i++){
              database.ref().child('Results/' + this.userId + "/"  + newPostKey + "/" + this.categoryCode+ "/" + "/Questions/" + this.gameArray[i].gameQuestions).update({
              userAnswer : this.gameArray[i].usersAnswer,
              userBooleanScore : this.gameArray[i].scoreBoolean
              });
        }
    
        database.ref().child('Results/' + this.userId + "/"  + newPostKey + "/" + this.categoryCode+ "/").update({usersScore : gameScore})
  }


  checkAnswer(){

  }
 
}
