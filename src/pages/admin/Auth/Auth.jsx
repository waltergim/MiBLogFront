import React, {useState} from 'react'
import {Tab} from 'semantic-ui-react'
import { RegisterForm , LogingForm } from '../../../components/Admin/Auth'
import './Auth.scss'
import tincodeWHite from '../../../assets/svg/tincode-white.svg'

export const Auth = () => {
   const [activeIndex,setActiveIndex] = useState(0)

  const openLogin = () =>{
    setActiveIndex(0)
  }

  const panes = [{
    menuItem: "entrar",
    render: ()=>(
      <Tab.Pane>
        <LogingForm />
      </Tab.Pane>
    )
  },{
    menuItem: "Nuevo usuario",
    render: ()=>(
      <Tab.Pane>
        <RegisterForm openLogin={openLogin}/>
      </Tab.Pane>
    ),
  }
]


  return (
    <div className='auth'>
      <img src={tincodeWHite} className='logo' />
       
       <Tab panes={panes}  className="auth__forms" activeIndex={activeIndex} onTabChange={(_,data)=>setActiveIndex(data.activeIndex)}/>

    </div>
  )
}
