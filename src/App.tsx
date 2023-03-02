import { useCallback, useState } from 'react'

interface FormState {
  email: string
  password: string
  stayLoggedIn: boolean
}

const App = () => {

const[formState, setFormState] = useState({
  email: "",
  password: "",
  stayLoggedIn: false
})

console.log(formState)

const[ isLoggedIn, setIsLoggedIn] = useState(false)

const handleSubmit = useCallback( (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const { email, password} = formState

  if (!email || !password) {
    setIsLoggedIn(false)
    return alert('Please enter correct data')
  }
  setIsLoggedIn(true)
  alert('chegou até aqui, passou todos os dados')

}, [formState])

const handleChangeInput = useCallback( 
  (event: React.FormEvent<HTMLInputElement>) => {

    const targetIpunt = event.currentTarget;
    console.log(targetIpunt)
    const { value, name, type, checked} = targetIpunt

    const finalValue = type === "checkbox" ? checked : value
    console.log(finalValue)
    setFormState({...formState,
      [name]: finalValue,
    })
  }, 
  [formState]
) 

if(isLoggedIn) {
  return <div className="container mt-5">
     <p className="fs-1 mb-5">Bem-vindo</p>
  </div>
}

  return (
    <div className="container mt-5">
      <p className="fs-1 mb-5">Login</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input 
            type="email"
            className="form-control" 
            id="email" 
            name="email" 
            value={formState.email}
            required
            //onChange={e => setFormState({...formState, email: e.currentTarget?.value || ""})}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password"
            required
            value={formState.password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3 form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="stayLoggedIn"
            name="stayLoggedIn"
            checked={formState.stayLoggedIn}
            onChange={handleChangeInput}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default App
