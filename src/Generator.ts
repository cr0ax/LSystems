import { LSystem } from './LSystem';

function randomNumber(x){
    return Math.floor((Math.random() * x));// + 1);
  }
  
  export class Generator{
  
    possible = ['F', '+', '-', 'E', 'B', 'G', 'R'];
  
    singleRuleRandom(x){
        var retval = "";
        for(var ii = 0; ii < x; ii++){
            retval += String(this.possible[randomNumber(this.possible.length)]);
        }
        return retval;
    }
  
    ruleSetRandom(){
        var rule = 	{
                    'F': this.singleRuleRandom(13),
                    'E': this.singleRuleRandom(13)
                };
        return rule;
    }
  
    randomSystem(){
      var rules = this.ruleSetRandom();
      var seed  = "F";
      return new LSystem(seed, rules);
    }
  
    dragonCurve(){
      var rule = {		//dragon curve
        'F': 'F+E+',
        'E': '-F-E'
        }
      var seed = "F";
      return new LSystem(seed, rule);
    }
  }
  