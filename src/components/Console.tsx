import { useContext } from 'react'
import { DispatchTextContext } from '../context'
import { Form, Formik } from 'formik'
import { ConsoleInput } from '.'
import { object, string } from 'yup'

interface ConsoleProps {}

const validate = object().shape({
  command: string(),
})

export const Console: React.FC<ConsoleProps> = () => {
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
      onSubmit={(values) => {
        dispatchText({
          type: 'EVAL_COMMAND',
          payload: { command: values.command },
        })
      }}
    >
      {({ values }) => (
        <Form autoComplete="off" className="relative">
          <ConsoleInput name="command" />
        </Form>
      )}
    </Formik>
  )
}
