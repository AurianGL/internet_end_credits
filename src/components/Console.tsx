import { Form, Formik } from "formik";
import { useContext } from "react";
import { object, string } from "yup";
import { ConsoleInput } from ".";
import { DispatchTextContext } from "../context";

const validate = object().shape({
	command: string(),
});

export const Console = () => {
	// const handleKeyUp = (event) => {
	//   console.log(event)
	// }
	const dispatchText = useContext(DispatchTextContext);

	return (
		<Formik
			initialValues={{
				command: "",
			}}
			validationSchema={validate}
			onSubmit={(values, { resetForm }) => {
				dispatchText({
					type: "ADD_TEXT",
					payload: { data: [[values.command]] },
				});
				dispatchText({
					type: "EVAL_COMMAND",
					payload: { command: values.command },
				});
				resetForm();
			}}
		>
			{({ values }) => (
				<Form autoComplete="off" className="relative text-left">
					<ConsoleInput name="command" />
				</Form>
			)}
		</Formik>
	);
};
