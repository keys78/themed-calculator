import { useState, useEffect } from 'react'

function App() {
  const [calc, setCal] = useState("");
  const [result, setResult] = useState("");
  const [colorTheme, setColorTheme] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if (
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ) {
      return;
    }

    setCal(calc + value)

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toLocaleString());
    }
  }

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          onClick={() => updateCalc(i.toString())}
          key={i}>
          {i}
        </button>
      )
    }

    return digits

  }

  const calculate = () => {
    if (calc) {
      setCal(eval(calc).toLocaleString())
    } else {
      setCal('syntax error #4-901')
    }
  }

  const deleteLast = () => {
    if (calc == '') {
      return;
    }
    const value = calc.slice(0, -1)
    setCal(value);
  }

  const reset = () => {
    setCal('')
    setResult('')
  }

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('theme-color');
    if(currentThemeColor) {
      setColorTheme(currentThemeColor)
    }
  }, []);

  const handleClick = (theme) => {
    setColorTheme(theme);
    localStorage.setItem('theme-color', theme)
  }


  return (
    <div className={`App ${colorTheme}`}>

      <div classNam="title">
      <h1>calc</h1>
      
      <div className="theme-options">
        <div className={`${colorTheme === 'theme-white' ? 'active' : ''} `} id="theme-white" onClick={() => handleClick('theme-white')}>1</div>
        <div className={`${colorTheme === 'theme-black' ? 'active' : ''} `} id="theme-black" onClick={() => handleClick('theme-black')}>2</div>
        <div className={`${colorTheme === 'theme-leet' ? 'active' : ''} `} id="theme-black" onClick={() => handleClick('theme-leet')}>3</div>
      </div>

      </div>





      <div className="calculator">
        <div className="display">
          {result ? <span> ({result}) </span> : ''}&nbsp;
          {calc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>x</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>

          <button onClick={deleteLast}>DEL</button>
          <button onClick={reset}>RESET</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button className="calculate-btn" onClick={calculate}>=</button>
        </div>

      </div>

    </div>
  );
}

export default App;
