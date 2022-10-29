import { FormikProps } from 'formik'

export interface IUploaderProps {
  name: string
  formik:FormikProps<any>
  btnName: string
}
