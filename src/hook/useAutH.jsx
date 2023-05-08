import {useContext} from 'react'
import { AuthContexts} from '../contexts'


export const useAuth = () => useContext(AuthContexts)