(g => {
  const multiplier = 6364136223846793005n,
        increment  = 1442695040888963407n,
        rotr       = (x, r) => x >> r | x << (32n - r);

  class PCG_XSH_RR32 {
    state = 5573589319906701683n;

    next() {
      let x,
          count;

      //assert(typeof x == "uint64_t")
      x           = this.state;
      count       = this.state >> 59n;
      this.state  = x * multiplier + increment;
      this.state %= 2n**64n;
      x          ^= x >> 18n;
      x         >>= 27n;
      x          %= 2n**32n;

      return Number(rotr(x, count) % 2n**32n);
    }

    constructor(v) {
      if (v == null)
        return;

      v %= 2n**64n;
      this.state = v + increment;
      this.next();
    }
  }

  Object.assign(g, { PCG_XSH_RR32 });
})(this);
