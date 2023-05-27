import { List, Item } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';
import Contact from 'components/Contact';

const ContactList = () => {
    const visibleContacts = useSelector(selectVisibleContacts);
    
    return (
        <List>
            {visibleContacts.map(contact => {
                return (
                    <Item key={contact.id}>
                        <Contact contact={contact} />
                    </Item>
                )
            })}
        </List>
    );
};

export default ContactList;