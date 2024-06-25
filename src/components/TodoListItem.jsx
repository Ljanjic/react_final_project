import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);

    const handleUpdateTitleChange = (event) => {
        setUpdatedTitle(event.target.value);
    };

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedTitle(todo.title);
    };

    const handleSaveClick = () => {
        onUpdateTodo(todo.id, updatedTitle);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onRemoveTodo(todo.id);
    };

    return (
        <div className={styles.todoItem}>
            {isEditing ? (
                <div>
                    <input
                        type='text'
                        value={updatedTitle}
                        onChange={handleUpdateTitleChange}
                    />
                    <div>
                        <button
                            className={styles.button}
                            onClick={handleSaveClick}
                        >
                            Save
                        </button>
                        <button
                            className={styles.button}
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <span>{todo.title}</span>
                    <div>
                        <button
                            className={styles.button}
                            onClick={handleUpdateClick}
                        >
                            Update
                        </button>
                        <button
                            className={styles.button}
                            onClick={handleDeleteClick}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
