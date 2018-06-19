import Haikunator from '../node_modules/haikunator/lib/haikunator.js'
var haikunator = new Haikunator()

/**
 *Create a multiple choice test
 * @class multiChoice
 */
class multiChoice {

  /**
   *Creates an instance of multiChoice.
   * @param {!Array.<Object>} questions
   * @param {!Array.<Object>} scoreMsgs
   * @param {!HTMLElement} domElem
   * @memberof multiChoice
   */
  constructor(questions, scoreMsgs, domElem) {
    this.questions = questions
    this.messages = scoreMsgs
    this.domElem = domElem

    this.validAnswers = {}
    this.totalQuestions = 0

    this.createForm()
    this.setEventListeners()
  }

  /**
   *Add a form to the DOM based on the given questions
   * @param {*} [questions=this.questions]
   * @param {*} [domElem=this.domElem]
   * @memberof multiChoice
   */
  createForm(questions = this.questions, domElem = this.domElem) {

    let form = document.createElement('form')
    form.classList.add('multiChoiceTest')

    questions.map((question) => {

      let hashkuQuestion = haikunator.haikunate()

      let fieldset = document.createElement('fieldset')
      fieldset.id = hashkuQuestion

      let questionElem = document.createElement('label')
      let questionElemTxt = document.createTextNode(question.question)
      questionElem.appendChild(questionElemTxt)

      fieldset.appendChild(questionElem)

      this.shuffleAnswers(question.answers).map((answer) => {

        let hashkuAnswer = haikunator.haikunate()

        if (answer.valid) {
          this.validAnswers[hashkuQuestion] = hashkuAnswer
        }

        let div = document.createElement('div')
        div.classList.add('multiChoiceAnswer')

        let input = document.createElement('input')
        input.setAttribute('type', 'radio')
        input.id = hashkuAnswer
        input.setAttribute('name', hashkuQuestion)
        input.setAttribute('value', hashkuAnswer)
        div.appendChild(input)

        let inputContent = document.createElement('label')
        inputContent.setAttribute('for', hashkuAnswer)
        let inputContentTxt = document.createTextNode(answer.answer)
        inputContent.appendChild(inputContentTxt)
        div.appendChild(inputContent)

        fieldset.appendChild(div)

      })
      
      form.appendChild(fieldset)

    })

    domElem.appendChild(form)

    this.totalQuestions = questions.length

  }

  /**
   *The Fisher-Yates (aka Knuth) shuffle
   * @param {!Array} array array that you want shuffled
   * @returns {Array} shuffled array
   * @memberof multiChoice
   */
  shuffleAnswers(array) {
    let currentIndex = array.length, temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  /**
   *Check if selected option is the right answer, then check if everything is answered
   * @param {*} e
   * @memberof multiChoice
   */
  checkAnswer(e) {
    let target = e.target
    let name = target.getAttribute('name')
    let value = target.getAttribute('value')

    if (this.validAnswers[name] == value) {

      let inputs = this.domElem.querySelectorAll('.multiChoiceAnswer input[name="'+name+'"]');
      [].forEach.call(inputs, (input) => {
        input.disabled = true
      })

      target.classList.add('correct')
      target.classList.add('selected')

      this.domElem.querySelector('#'+name).classList.add('answered')

    } else {

      let inputs = this.domElem.querySelectorAll('.multiChoiceAnswer input[name="'+name+'"]');
      [].forEach.call(inputs, (input) => {
        input.disabled = true
      })

      target.classList.add('wrong')
      target.classList.add('selected')

      this.domElem.querySelector('.multiChoiceAnswer input[value="'+this.validAnswers[name]+'"]').classList.add('correct')

      this.domElem.querySelector('#'+name).classList.add('answered')

    }

    let answered = this.domElem.querySelectorAll('fieldset.answered')

    if (this.totalQuestions == answered.length) {
      this.calcScore()
    }

  }

  /**
   *Retrieve the number of correct answers
   * @memberof multiChoice
   */
  calcScore() {
    let correctAnswers = this.domElem.querySelectorAll('input.selected.correct').length

    this.printMsg(correctAnswers)
  }

  /**
   *Print the end message depending on the user score
   * @param {*} score
   * @param {*} [msgs=this.messages]
   * @memberof multiChoice
   */
  printMsg(score, msgs = this.messages) {
    for (let i = 0 ; i < msgs.length ; i++) {

      if (score >= msgs[i].scoreThresold) {
        let scoreMsg = document.createElement('div')
        scoreMsg.classList.add('scoreMsg')

        let msgTitle = document.createElement('p')
        msgTitle.classList.add('msgTitle')
        let msgTitleTxt = document.createTextNode(msgs[i].title)
        msgTitle.appendChild(msgTitleTxt)
        scoreMsg.appendChild(msgTitle)

        let msgContent = document.createElement('p')
        let msgContentTxt = document.createTextNode(msgs[i].message)
        msgContent.appendChild(msgContentTxt)
        scoreMsg.appendChild(msgContent)

        this.domElem.appendChild(scoreMsg)
        break
      } 

    }
  }

  /**
   *Set the event listeners to the inputs
   * @param {*} [domElem=this.domElem]
   * @memberof multiChoice
   */
  setEventListeners(domElem = this.domElem) {
    let answers = domElem.querySelectorAll('.multiChoiceAnswer input');
    [].forEach.call(answers, (answer) => {
      answer.addEventListener('click', this.checkAnswer.bind(this))
    })
  }

}

export default multiChoice