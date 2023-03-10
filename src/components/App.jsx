import React from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Container } from './Container/Container';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('contactsBase'))) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contactsBase')),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contactsBase', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.state.contacts.some(contact => contact.name === name)) {
      alert(`${contact.name} is already in contacts!`);

      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    console.log(contact);
  };

  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  handleFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase())
    );
    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onFilterChange={this.handleFilter} />
        <ContactList
          deleteContact={this.deleteContact}
          contacts={filteredContacts}
        />
      </Container>
    );
  }
}
