import React, { useState } from 'react';
import { styled } from 'goober';
import { useUserContext } from './contexts/UserContext';

const Container = styled('div')`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled('h2')`
  text-align: center;
  color: #333;
`;

const Filters = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #666;
  }

  input, select {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
  background: #fff;

  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const UserTable: React.FC = () => {
  const { users } = useUserContext();
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [emailFilter, setEmailFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');

  const filteredUsers = users.filter(user => {
    const matchesGender = genderFilter ? user.gender === genderFilter : true;
    const matchesEmail = emailFilter ? user.email.includes(emailFilter) : true;
    const matchesSubject = subjectFilter ? user.subjects.includes(subjectFilter) : true;
    return matchesGender && matchesEmail && matchesSubject;
  });

  return (
    <Container>
      <Title>User Table</Title>
      <Filters>
        <label>
          Gender:
          <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Email:
          <input type="text" value={emailFilter} onChange={e => setEmailFilter(e.target.value)} />
        </label>
        <label>
          Subject:
          <input type="text" value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} />
        </label>
      </Filters>
      <Table>
        <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Birthday</th>
          <th>Email</th>
          <th>Subjects</th>
          <th>Gender</th>
        </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.birthday}</td>
            <td>{user.email}</td>
            <td>{user.subjects.join(', ')}</td>
            <td>{user.gender}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserTable;