import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { FaSortAmountDown, FaSortAmountUp, FaTrash } from 'react-icons/fa';
import styles from './styles.module.css';

const TodoContainer = ({ tableName, sectionTitle, navLinks }) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [duplicateMessage, setDuplicateMessage] = useState('');

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    async function fetchData() {
        try {
            setIsLoading(true);
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${tableName}?view=Grid%20view&sort[0][field]=item&sort[0][direction]=${sortOrder}`;

            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${
                        import.meta.env.VITE_AIRTABLE_API_TOKEN
                    }`,
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error has occurred: ${response.status}`);
            }

            const data = await response.json();
            const itemsToBuy = data.records.map((record) => ({
                id: record.id,
                title: record.fields.item,
            }));
            itemsToBuy.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            });

            setTodoList(itemsToBuy);
        } catch (error) {
            console.error('Error fetching items to buy:', error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [tableName, sortOrder]);

    const addTodo = async (newItemName) => {
        try {
            const existingItem = todoList.find(
                (todo) => todo.title === newItemName,
            );
            if (existingItem) {
                console.log(`${newItemName} is already on the list`);
                setDuplicateMessage(
                    `${newItemName} is already on the list to buy`,
                );
                setTimeout(() => {
                    setDuplicateMessage('');
                }, 3000);
                return;
            }
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${tableName}`;

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${
                        import.meta.env.VITE_AIRTABLE_API_TOKEN
                    }`,
                },
                body: JSON.stringify({
                    fields: {
                        item: newItemName,
                    },
                }),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Error occurred while adding todo: ${response.status}`,
                );
            }

            const newTodo = await response.json();
            setTodoList((prevList) => [
                ...prevList,
                { id: newTodo.id, title: newTodo.fields.item },
            ]);
            fetchData();
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
    };

    const removeTodo = async (id) => {
        try {
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${tableName}/${id}`;

            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${
                        import.meta.env.VITE_AIRTABLE_API_TOKEN
                    }`,
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Error occurred while deleting todo: ${response.status}`,
                );
            }

            setTodoList((prevList) =>
                prevList.filter((todo) => todo.id !== id),
            );
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };

    const updateTodo = async (id, updatedItem) => {
        try {
            const url = `https://api.airtable.com/v0/${
                import.meta.env.VITE_AIRTABLE_BASE_ID
            }/${tableName}/${id}`;

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${
                        import.meta.env.VITE_AIRTABLE_API_TOKEN
                    }`,
                },
                body: JSON.stringify({
                    fields: {
                        item: updatedItem,
                    },
                }),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Error occurred while updating todo: ${response.status}`,
                );
            }

            const updatedDataResponse = await fetch(
                `https://api.airtable.com/v0/${
                    import.meta.env.VITE_AIRTABLE_BASE_ID
                }/${tableName}`,
                {
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_AIRTABLE_API_TOKEN
                        }`,
                    },
                },
            );
            if (!updatedDataResponse.ok) {
                throw new Error(
                    `Error fetching updated data: ${updatedDataResponse.status}`,
                );
            }

            const updatedData = await updatedDataResponse.json();
            const updatedTodos = updatedData.records.map((record) => ({
                id: record.id,
                title: record.fields.item,
            }));

            setTodoList(updatedTodos);
            fetchData();
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    };

    const deleteAllTodos = async () => {
        try {
            const confirmation = window.confirm(
                'Are you sure you want to delete all items?',
            );
            if (confirmation) {
                const deletePromises = todoList.map(async (todo) => {
                    const url = `https://api.airtable.com/v0/${
                        import.meta.env.VITE_AIRTABLE_BASE_ID
                    }/${tableName}/${todo.id}`;

                    const options = {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${
                                import.meta.env.VITE_AIRTABLE_API_TOKEN
                            }`,
                        },
                    };
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error(
                            `Error occurred while deleting todo: ${response.status}`,
                        );
                    }
                });

                await Promise.all(deletePromises);

                setTodoList([]);
            }
        } catch (error) {
            console.error('Error deleting all todos:', error.message);
        }
    };

    return (
        <div className={styles.container}>
            <nav>
                <ul>
                    {navLinks.map(({ path, label }) => (
                        <li key={path}>
                            <Link to={path}>{label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <h1>{sectionTitle}</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {duplicateMessage && <p>{duplicateMessage}</p>}
            <button className={styles.button} onClick={toggleSortOrder}>
                Sort{' '}
                {sortOrder === 'asc' ? (
                    <FaSortAmountDown />
                ) : (
                    <FaSortAmountUp />
                )}
            </button>
            {todoList.length > 0 && (
                <button className={styles.button} onClick={deleteAllTodos}>
                    Clear Shopping List <FaTrash />
                </button>
            )}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList
                    todoList={todoList}
                    onRemoveTodo={removeTodo}
                    onUpdateTodo={updateTodo}
                />
            )}
        </div>
    );
};

export default TodoContainer;
