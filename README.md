# LSystems

A little library for creating and rendering L-Systems. It's a pretty old project.

To compile, just `npm install` followed by `npm run build`. This should create compile to lsystems.js in the root.

There are also a couple basic tests in `src/tests`

#### What is an L-System?

It's a string rewriting system, whose output is interpreted as drawing isntructions.
For more take a look [here](http://algorithmicbotany.org/papers/abop/abop-ch1.pdf)

#### What's inside?

A basic LSystem class, a renderer, and a generator.

For instance:

```javascript
  (new lsystems.Generator).randomSystem(x);        //return a random LSystem
  (new lsystems.Generator).ruleSetRandom();        //return a random ruleset
  (new lsystems.Generator).randomSystem();         //return a random LSystem
  (new lsystems.Generator).dragonCurve();          //return an LSystem that will render to the famous "dragon curve"
```

See the index.html for more example code.
