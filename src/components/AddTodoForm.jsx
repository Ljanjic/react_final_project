import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';
import styles from './styles.module.css';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoItem, setTodoItem] = useState('');

    const handleItemChange = (event) => {
        const newTodoItem = event.target.value;
        setTodoItem(newTodoItem);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (todoItem.trim() !== '') {
            onAddTodo(todoItem);
            setTodoItem('');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputWithLabel
                type='text'
                id='todoItem'
                name='item'
                value={todoItem}
                onChange={handleItemChange}
                autoFocus={true}
            >
                Need to buy:
            </InputWithLabel>
            <button className={styles.button} type='submit'>
                Add
            </button>
        </form>
    );
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
