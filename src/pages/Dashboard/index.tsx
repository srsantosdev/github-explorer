import React, { useState, FormEvent } from 'react';

import { FiChevronRight } from 'react-icons/fi';

import {
  Container,
  Title,
  Logo,
  Form,
  Input,
  Button,
  Repositories,
} from './styles';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get<Repository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo('');
  }

  return (
    <Container>
      <Logo src={logo} />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <Input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <Button type="submit">Pesquisar</Button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <a href="#teste" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </Container>
  );
};

export default Dashboard;
