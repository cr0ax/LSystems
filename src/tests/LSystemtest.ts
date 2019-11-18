import { expect, assert } from 'chai';
import 'mocha';
import {LSystem, Renderer} from "../main";


describe("LSystem Test", () => {
    it("Steps correctly", () => {
      var seed = 'DFDF';
      var rules = {
        'D' : 'helloF',
        'F' : 'worldD',
      }
      var ls = new LSystem(seed, rules);
      ls.step();
      //console.log("Instructions: ", ls.instructions);
      assert.equal(ls.instructions, 'helloFworldDhelloFworldD');
      ls.step();
      assert.equal(ls.instructions, 'helloworldDworldhelloFhelloworldDworldhelloF');
    });

    it("performs under stress", () => {
      var seed = 'F+D+FD+-';
      var rules = {
        'D' : '<hello>F',
        'F' : 'F<world>FD',
        '+' : '-D!',
        '-' : 'FD?',
      }
      var ls = new LSystem(seed, rules);
      for(var ii = 0; ii < 10; ii++){
        ls.step();
      }
      console.log("length: ", ls.instructions.length);
    });
});