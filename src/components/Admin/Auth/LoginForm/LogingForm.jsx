import React from 'react'
import {Form} from 'semantic-ui-react'
import {useFormik} from 'formik'
import {initialValue,validationSchema} from './LoginForm.form'
import {Auth} from "../../../../api"
import { useAuth } from '../../../../hook'


export const LogingForm = () => {

    const  authController = new Auth()

    const { login} = useAuth()

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async(formvalue) =>{
            try {
                const response = await authController.login(formvalue)

                authController.setAccessToker(response.access)
                authController.setRefreshToken(response.access)

                login(response.access)
              
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
   <Form onSubmit={formik.handleSubmit}>

    <Form.Input name="email" placeholder="Ingrese su correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
    <Form.Input name="password" type='password' placeholder="Ingrese Contraseña " onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />

    <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
    Entrar
    </Form.Button>
   </Form>
  )
}
