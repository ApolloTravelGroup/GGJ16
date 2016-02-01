namespace Random{
/**
 * Seedable random number generator functions.
 * @version 1.0.0
 * @license Public Domain
 *
 * @example
 * var rng = new RNG('Example');
 * rng.random(40, 50);  // =>  42
 * rng.uniform();       // =>  0.7972798995050903
 * rng.normal();        // => -0.6698504543216376
 * rng.exponential();   // =>  1.0547367609131555
 * rng.poisson(4);      // =>  2
 * rng.gamma(4);        // =>  2.781724687386858
 */

/**
 * @param {String} seed A string to seed the generator.
 * @constructor
 */
  
 class RC4{
  private s:number[] = [256];
  private i:number = 0;
  private j = 0;
  
  constructor(seed:string) {
    this.s = new Array(256);
    
    for (let i = 0; i < 256; i++) {
        this.s[i] = i;
    }
    if (seed) {
        this.mix(seed);
      
    }
  }
  
  private mix(seed:string) {
    var input = this.getStringBytes(seed);
    var j = 0;
    for (var i = 0; i < this.s.length; i++) {
        j += this.s[i] + input[i % input.length];
        j %= 256;
        this._swap(i, j);
    }
  }
  
  private getStringBytes(s:string) {
    var output = [];
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        var bytes = [];
        do {
            bytes.push(c & 0xFF);
            c = c >> 8;
        } while (c > 0);
        output = output.concat(bytes.reverse());
    }
    return output;
}
  
  private _swap (i:number, j:number) {
    var tmp = this.s[i];
    this.s[i] = this.s[j];
    this.s[j] = tmp;
}

   next () {
    this.i = (this.i + 1) % 256;
    this.j = (this.j + this.s[this.i]) % 256;
    this._swap(this.i, this.j);
    return this.s[(this.s[this.i] + this.s[this.j]) % 256];
};
  
}


/**
 * Create a new random number generator with optional seed. If the
 * provided seed is a function (i.e. Math.random) it will be used as
 * the uniform number generator.
 * @param seed An arbitrary object used to seed the generator.
 * @constructor
 */
export class RNG{
  
  _state:RC4;

  constructor(seed:string) {
    if (seed == null) {
        seed = '' + Math.random() + Date.now();
    } 
    if (seed) {
        this._state = new RC4(seed);
    } else {
        this._state = null;
    }
  }
/**
 * @returns {number} Uniform random number between 0 and 1.
 */
uniform () {
    var BYTES = 7; // 56 bits to make a 53-bit double
    var output = 0;
    for (var i = 0; i < BYTES; i++) {
        output *= 256;
        output += this.nextByte();
    }
    return output / (Math.pow(2, BYTES * 8) - 1);
}
  
  
/**
 * @returns {number} Uniform random number between 0 and 255.
 */
  nextByte () {
    return this._state.next();
};

/**
 * Produce a random integer within [n, m).
 * @param {number} [n=0]
 * @param {number} m
 *
 */
random (n:number, m:number) {
    if (n == null) {
        return this.uniform();
    } else if (m == null) {
        m = n;
        n = 0;
    }
    return n + Math.floor(this.uniform() * (m - n));
}

  }


}