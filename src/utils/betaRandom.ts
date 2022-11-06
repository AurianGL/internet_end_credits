type BetaFunc = (
  a: number,
  b: number,
  x: number,
) => number

const lnBetaPDF: BetaFunc = (a, b, x) => {
      // Log of the Beta Probability Density Function
  return ((a-1)*Math.log(x) + (b-1)*Math.log(1-x)) - lnBetaFunc(a,b,x)
}

const lnBetaFunc: BetaFunc = (a, b, _x) => {
  // Log Beta Function
  // ln(Beta(x,y))
  let foo = 0.0;
  
  for (let i=0; i<a-2; i++) {
      foo += Math.log(a-1-i);
  }
  for (let i=0; i<b-2; i++) {
      foo += Math.log(b-1-i);
  }
  for (let i=0; i<a+b-2; i++) {
      foo -= Math.log(a+b-1-i);
  }
  return foo
}

export const betaPDF: BetaFunc  = (a, b, x) => {
  // Beta probability density function impementation
  // using logarithms, no factorials involved.
  // Overcomes the problem with large integers
  return Math.exp(lnBetaPDF(a, b, x))
}