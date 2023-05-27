import { Formik } from "formik";
import * as Yup from 'yup';
import { nanoid } from "nanoid";
import { Form, FormField, Field, ErrorMessage } from "./ContactForm.styled";
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Too Short!')
        .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan")
        .required('Required'),
    phone: Yup.string()
        .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +")
        .required('Required'),
});

const ContactForm = () => {
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();

    const addNewContact = (newContact, actions) => {
        const normalizedName = newContact.name.toLocaleLowerCase();
    
        if(contacts.find(contact => contact.name.toLowerCase() === normalizedName)) {
          alert(`${newContact.name} is already in contacts.`);
          return;
        };
    
        dispatch(addContact(newContact));
        actions.resetForm();
    };
    
    return (
        <Formik 
            initialValues={{ 
                name: '',
                phone: '',
            }} 
            validationSchema={ContactSchema}
            onSubmit={(values, actions) => {
                addNewContact({
                    ...values,
                    id: nanoid(),
                }, actions);
            }}>
            
            <Form>
                <FormField>
                    Name 
                    <Field name="name" type="text" />
                    <ErrorMessage name="name" component="div"/>
                </FormField>
                <FormField>
                    Number 
                    <Field name="phone" type="tel" />
                    <ErrorMessage name="phone" component="div"/>
                </FormField>
                <button type="submit">Add contant</button>
            </Form>
        </Formik>
    )
};

export default ContactForm;