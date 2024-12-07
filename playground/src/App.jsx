import { useState } from 'react'
import Display from './Display'
import Button from './Button'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increase = () => setCounter(counter + 1)
  const decrease = () => setCounter(counter - 1)
  const reset = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>

      <Button
        onClick={increase}
        text='plus'
      />
      <Button
        onClick={reset}
        text='zero'
      />     
      <Button
        onClick={decrease}
        text='minus'
      />           
    </div>
  )
}

export default App
