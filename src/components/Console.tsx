import { useContext } from 'react'
import { DispatchTextContext } from '../context'
import { Form, Formik } from 'formik'
import { ConsoleInput } from '.'
import { object, string } from 'yup'

const validate = object().shape({
  command: string(),
})

export const Console = () => {
  // const handleKeyUp = (event) => {
  //   console.log(event)
  // }
  const dispatchText = useContext(DispatchTextContext)

  return (
    <Formik
      initialValues={{
        command: '',
      }}
      validationSchema={validate}
      onSubmit={(values, {resetForm}) => {
        dispatchText({
          type: 'ADD_TEXT',
          payload: {data:  [[values.command]]}
        })
        dispatchText({
          type: 'EVAL_COMMAND',
          payload: { command: values.command },
        })
        resetForm()
      }}
    >
      {({ values }) => (
        <Form autoComplete="off" className="relative text-left">
          <ConsoleInput name="command" />
        </Form>
      )}
    </Formik>
  )
}
