import React, {useState} from 'react'
import {Form} from 'semantic-ui-react'
import {useFormik} from 'formik'
import {Auth} from '../../../../api'
import {initialValues,validationSchema} from './RegisterForm.form'
import './RegisterFrom.scss'




export const RegisterForm = ({openLogin}) => {

    const authController = new Auth()

    const [error, setError] = useState("")

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange:false,
        onSubmit: async(formValue)=>{
            try {
                setError("")
                console.log(formValue)
                await authController.register(formValue)
                openLogin()
            } catch (error) {
                setError("Error en el regristro")
            }
        }
    })

  return (
    <Form className='register-from' onSubmit={formik.handleSubmit}> 
 
    <Form.Input  name='email' placeholder='Correo electronico'  onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
    <Form.Input  name='password' type='password' placeholder='Contraseña' onChange={formik.handleChange} value={formik.values.password}  error={formik.errors.password} />
    <Form.Input  name='repeatPassword' type='password' placeholder='Repetir contraseña' onChange={formik.handleChange} value={formik.values.repeatPassword}  error={formik.errors.repeatPassword} />
    <Form.Checkbox name='conditionsAccepted' label='He leido y acepto las politicas de privacidad' onChange={(_,data)=> formik.setFieldValue("conditionsAccepted", data.checked)  } checked={formik.values.conditionsAccepted} error={formik.errors.conditionsAccepted}   />

    <Form.Button type='submit' primary fluid loading={formik.isSubmitting }>
    Crear cuenta
    </Form.Button>

    <p className='register-from__error'>{error}</p>

    </Form>
  )
}
