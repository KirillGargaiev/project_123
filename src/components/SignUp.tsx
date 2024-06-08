import React, { useState } from 'react';
import { styled } from 'goober';
import {MultiSelectDropdown} from "./Dropdown";
import { useUserContext } from './contexts/UserContext';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [errors, setErrors] = useState<{
    username: string;
    password: string;
    birthday: string;
    email: string;
    subjects: string;
    gender: string // Add this line
  }>({
    username: '',
    password: '',
    birthday: '',
    email: '',
    subjects: '',
    gender: '' // Add this line
  });
  const { addUser } = useUserContext();

  const [subjects, setSubjects] = useState<string[]>([]);

  // List of subjects
  const availableSubjects = ['Math', 'Science', 'History', 'English'];

  const validateGender = (gender: string): string => {
    if (!gender) {
      return 'Gender is required';
    }
    return '';
  };

  // Validation functions
  const validateUsername = (username: string): string => {
    if (!username) {
      return 'Username is required';
    }
    if (username.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const validateBirthday = (birthday: string): string => {
    if (!birthday) {
      return 'Birthday is required';
    }
    const date = new Date(birthday);
    const today = new Date();
    if (date >= today) {
      return 'Birthday must be in the past';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email) {
      return 'Email is required';
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return 'Email is invalid';
    }
    return '';
  };

  const validateSubjects = (subjects: string[]): string => {
    if (subjects.length === 0) {
      return 'At least one subject must be selected';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
      birthday: validateBirthday(birthday),
      email: validateEmail(email),
      subjects: validateSubjects(subjects),
      gender: validateGender(gender),
    };

    setErrors(newErrors);

    // Check for any validation errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const newUser = {
        username,
        password,
        birthday,
        email,
        subjects,
        gender,
      };

      addUser(newUser);
      window.location.href = "/";
    }
  };

  // Handle subject selection
  const handleSubjectChange = (selected: string[]) => {
    setSubjects(selected);
    const newErrors = { ...errors, subjects: validateSubjects(selected) };
    setErrors(newErrors);
  };

  return (
    <Container>
      <h2>Sign Up</h2>
      <FormContainer onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Label htmlFor="birthday">Birthday</Label>
        <Input
          type="date"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        {errors.birthday && <ErrorMessage>{errors.birthday}</ErrorMessage>}

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Label htmlFor="subjects">Subjects</Label>
        <MultiSelectDropdown
          options={availableSubjects}
          selectedOptions={subjects}
          onChange={handleSubjectChange}
        />
        {errors.subjects && <ErrorMessage>{errors.subjects}</ErrorMessage>}
        <Label htmlFor="gender">Gender</Label>
        <GenderContainer>
          <GenderOption>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">Male</label>
          </GenderOption>
          <GenderOption>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
          </GenderOption>
        </GenderContainer>
        {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}

        <Button type="submit">Sign Up</Button>
      </FormContainer>
    </Container>
  );
};

export default SignUp;

const Container = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em;
`;

const Input = styled('input')`
    margin: 0.5em 0;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
`;

const Label = styled('label')`
    margin: 0.5em 0;
    font-weight: bold;
`;

const Button = styled('button')`
    margin-top: 1em;
    padding: 0.5em 1em;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled('div')`
    color: red;
    margin-top: -0.5em;
    margin-bottom: 0.5em;
`;

const GenderContainer = styled('div')`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    max-width: 300px;
    margin: 0.5em 0;
`;

const GenderOption = styled('div')`
  display: flex;
  align-items: center;
`;