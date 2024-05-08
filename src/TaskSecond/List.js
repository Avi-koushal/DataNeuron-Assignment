import React, { useEffect, useState } from 'react';

function List() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState({});
    const [apiHits, setApiHits] = useState(0); // State to track API hits

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/demo', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setForm({ username: '', password: '' });
        getUsers();
    };

    const getUsers = async () => {
        const response = await fetch('http://localhost:8080/demo', {
            method: 'GET',
        });
        const data = await response.json();
        setUsers(data);
        setApiHits(apiHits + 1); // Increment API hits count
        setEditMode({});
    };

    const handleUpdate = async (id) => {
        const userToUpdate = users.find(user => user._id === id);
        const response = await fetch(`http://localhost:8080/demo/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userToUpdate),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        getUsers();
    };

    const toggleEditMode = (id) => {
        setEditMode(prevEditMode => ({
            ...prevEditMode,
            [id]: !prevEditMode[id]
        }));
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" name="username" value={form.username} onChange={handleFormChange} />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" value={form.password} onChange={handleFormChange} />
                        </div>
                        <button type="submit" style={{ width: "50%" }} class="btn btn-success mb-5">ADD</button>
                    </form>
                    <div class="userdata">
                        <ul class="list-group">
                            {users.map(user => (
                                <li key={user._id} class="list-group-item">
                                    {editMode[user._id] ? (
                                        <>
                                            <input type="text" class="form-control" name="username" value={form.username} onChange={handleFormChange} />
                                            <input type="password" class="form-control" name="password" value={form.password} onChange={handleFormChange} />
                                            <button class="btn btn-success" onClick={() => handleUpdate(user._id)}>Save</button>
                                        </>
                                    ) : (
                                        <>
                                            <div>Username: {user.username}</div>
                                            <div>Password: {user.password}</div>
                                            <button class="btn btn-info" onClick={() => toggleEditMode(user._id)}>Edit</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="api-hits">
                        API Hit Count: {apiHits}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
