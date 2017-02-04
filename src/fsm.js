class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.initial = config.initial
      this.state = config.initial
      this.states = config.states
      this.prev = []
      this.rstates = []
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      let exists = false
      for (let x in this.states){
        if(x == state){
          this.prev.push(this.state)
          this.rstates.length = 0
          this.state = state
          exists = true
        }
      }
      if(!exists){
        throw new Error()
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      let prev = this.state
      for(let x in this.states[prev].transitions){
        if(event == x){
          this.prev.push(this.state)
          this.state = this.states[prev].transitions[event]
          return 0
        }
      }
      throw new Error()
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.initial
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var events = []
      for(let x in this.states){
        for(let y in this.states[x].transitions){
          if(y == event || event == undefined){
            if(!events.includes(x.toString())){
              events.push(x.toString())
            }
          }
        }
      }
      return events
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if(this.prev.length > 0){
        if(!(this.rstates[this.rstates.length-1] == this.state)){
          this.rstates.push(this.state)
        }
        this.state = this.prev.pop()
        return true
      }else{
        return false
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if(this.rstates.length > 0){
        this.prev.push(this.state)
        this.state = this.rstates.pop()
        return true
      }else{
        return false
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      console.log('Массив до сброса', this.prev)
      this.prev.length = 0
      this.rstates.length = 0
      console.log('Массив после сброса',this.prev)
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
