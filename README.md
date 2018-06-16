<a name="multiChoice"></a>

## multiChoice
**Kind**: global class

* [multiChoice](#multiChoice)
    * [new multiChoice()](#new_multiChoice_new)
    * _instance_
        * [.createForm([questions], [domElem])](#multiChoice+createForm)
        * [.shuffleAnswers(array)](#multiChoice+shuffleAnswers) ⇒ <code>Array</code>
        * [.checkAnswer(e)](#multiChoice+checkAnswer)
        * [.calcScore()](#multiChoice+calcScore)
        * [.printMsg(score, [msgs])](#multiChoice+printMsg)
        * [.setEventListeners([domElem])](#multiChoice+setEventListeners)
    * _static_
        * [.multiChoice](#multiChoice.multiChoice)
            * [new multiChoice(questions, scoreMsgs, domElem)](#new_multiChoice.multiChoice_new)

<a name="new_multiChoice_new"></a>

### new multiChoice()
Create a multiple choice test

<a name="multiChoice+createForm"></a>

### multiChoice.createForm([questions], [domElem])
Add a form to the DOM based on the given questions

**Kind**: instance method of [<code>multiChoice</code>](#multiChoice)

| Param | Type | Default |
| --- | --- | --- |
| [questions] | <code>\*</code> | <code>this.questions</code> |
| [domElem] | <code>\*</code> | <code>this.domElem</code> |

<a name="multiChoice+shuffleAnswers"></a>

### multiChoice.shuffleAnswers(array) ⇒ <code>Array</code>
The Fisher-Yates (aka Knuth) shuffle

**Kind**: instance method of [<code>multiChoice</code>](#multiChoice)
**Returns**: <code>Array</code> - shuffled array

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | array that you want shuffled |

<a name="multiChoice+checkAnswer"></a>

### multiChoice.checkAnswer(e)
Check if selected option is the right answer, then check if everything is answered

**Kind**: instance method of [<code>multiChoice</code>](#multiChoice)

| Param | Type |
| --- | --- |
| e | <code>\*</code> |

<a name="multiChoice+calcScore"></a>

### multiChoice.calcScore()
Retrieve the number of correct answers

**Kind**: instance method of [<code>multiChoice</code>](#multiChoice)
<a name="multiChoice+printMsg"></a>

### multiChoice.printMsg(score, [msgs])
Print the end message depending on the user score

**Kind**: instance method of [<code>multiChoice</code>](#multiChoice)

| Param | Type | Default |
| --- | --- | --- |
| score | <code>\*</code> |  |
| [msgs] | <code>\*</code> | <code>this.messages</code> |

<a name="multiChoice+setEventListeners"></a>

### multiChoice.setEventListeners([domElem])
Set the event listeners to the inputs

**Kind**: instance method of [<code>multiChoice</code>](#multiChoice)

| Param | Type | Default |
| --- | --- | --- |
| [domElem] | <code>\*</code> | <code>this.domElem</code> |

<a name="multiChoice.multiChoice"></a>

### multiChoice.multiChoice
**Kind**: static class of [<code>multiChoice</code>](#multiChoice)
<a name="new_multiChoice.multiChoice_new"></a>

#### new multiChoice(questions, scoreMsgs, domElem)
Creates an instance of multiChoice.


| Param | Type |
| --- | --- |
| questions | <code>Array.&lt;Object&gt;</code> |
| scoreMsgs | <code>Array.&lt;Object&gt;</code> |
| domElem | <code>HTMLElement</code> |