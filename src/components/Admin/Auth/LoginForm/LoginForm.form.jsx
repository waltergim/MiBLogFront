import * as Yup from 'yup'

export const initialValue = () =>{
    return{
        email: "",
        password: "",
    }
}

export const validationSchema = () =>{
    return Yup.object({
        email: Yup.string().email("El email no es valido pa").required("Email obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria")
    })
}