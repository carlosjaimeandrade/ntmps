function identity<QUALQUERCOISA>(arg: QUALQUERCOISA): any {
    console.log(arg)
  }

  
  // type of output will be 'string'
  let output = identity<number>(1); 



function apresentar<Q>(a: Q): Q {
    return a
}

apresentar<string>('asd')