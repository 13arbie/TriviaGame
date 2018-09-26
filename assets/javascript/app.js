$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: 'How old was Jerry when Gayle took his virginity?',
      q2: 'According to Ron, cats are?',
      q3: 'How much did Craig pay Andy to perform at a childrens party?',
      q4: 'Whose parents have been divorced for 30 years?',
      q5: "Ron has two ex-wives, Both named?",
      q6: 'What does Leslie always order at JJs Diner?',
      q7: "Who is Orin friends with?"
    },
    options: {
      q1: ['24', '23', '26', '28'],
      q2: ['Annoying', 'Necessary', 'Rewarding', 'Pointless'],
      q3: ['$500', '$20', '$151', '$150'],
      q4: ['Ron', 'April', 'Ben', 'Jerry'],
      q5: ['Tammy','Christina','Molly','Melissa'],
      q6: ['Pancakes','Waffles','Toast','Milkshake'],
      q7: ['Tom', 'April', 'Tammy','Kelly']
    },
    answers: {
      q1: '24',
      q2: 'Pointless',
      q3: '$150',
      q4: 'Ben',
      q5: 'Tammy',
      q6: 'Waffles',
      q7: 'April'
    },
    
    startGame: function(){
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      

      $('#game').show();
      

      $('#results').html('');
      
    
      $('#timer').text(trivia.timer);
      
     
      $('#start').hide();
  
      $('#remaining-time').show();
      
     
      trivia.nextQuestion();
      
    },
    
    nextQuestion : function(){
      
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      

      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
    
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },

    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
     
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
       
        $('#game').hide();
        
      
        $('#start').show();
      }
      
    },
   
    guessChecker : function() {
      
      var resultId;
      
     
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      trivia.currentSet++;
      
     
      $('.option').remove();
      $('#results h3').remove();
      
      trivia.nextQuestion();
       
    }
  
  }
