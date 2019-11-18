export class LSystem {

  productionRules : any;
  instructions : string;

  constructor(S: string, L: any){
    this.instructions = S;
    this.productionRules = L;
  }

  //produce the next string
	step(){
		var stringLength = this.instructions.length;
		var rule : any;
		var templist = ""; //a string to hold the production rules
		for(var ii = 0; ii < stringLength; ii++){
			templist += this.productionRules[this.instructions[ii]] || this.instructions[ii];
		}
		this.instructions = templist;
	}

  stepn(n){
    for(var ii = 0; ii < n; ii++){
      this.step();
    }
  }

}
