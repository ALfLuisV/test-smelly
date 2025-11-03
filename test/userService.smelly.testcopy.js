const { UserService } = require('../src/userService');

// Manteve-se a const de dados padrão para clareza no Arrange
const dadosUsuarioPadrao = {
  nome: 'Fulano de Tal',
  email: 'fulano@teste.com',
  idade: 25,
};

// O nome da suíte está mais claro 
describe('UserService - Suíte de Testes Refatorada', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  // --- Testes da Funcionalidade "createUser" ---

  test('deve criar um novo usuário com status "ativo" por padrão', () => {
    // Arrange (Organizar) 
    const nome = dadosUsuarioPadrao.nome;
    const email = dadosUsuarioPadrao.email;
    const idade = dadosUsuarioPadrao.idade;

    // Act (Agir) 
    const usuarioCriado = userService.createUser(nome, email, idade);

    // Assert (Verificar) 
    expect(usuarioCriado.id).toBeDefined();
    expect(usuarioCriado.nome).toBe(nome);
    expect(usuarioCriado.email).toBe(email);
    expect(usuarioCriado.idade).toBe(idade);
    expect(usuarioCriado.status).toBe('ativo');
  });

  test('deve lançar um erro ao tentar criar usuário menor de idade', () => {
 
    const acaoDeCriar = () => {
      userService.createUser('Menor', 'menor@email.com', 17);
    };

    expect(acaoDeCriar).toThrow('O usuário deve ser maior de idade.');
  });

  // --- Testes da Funcionalidade "getUserById" ---

  test('deve buscar um usuário existente pelo ID', () => {
    // Arrange (Organizar) 
    const usuario = userService.createUser(
      dadosUsuarioPadrao.nome,
      dadosUsuarioPadrao.email,
      dadosUsuarioPadrao.idade
    );

    // Act (Agir) 
    const usuarioBuscado = userService.getUserById(usuario.id);

    // Assert (Verificar) 
    expect(usuarioBuscado).toBeDefined();
    expect(usuarioBuscado.id).toBe(usuario.id);
    expect(usuarioBuscado.nome).toBe(dadosUsuarioPadrao.nome);
  });

  // --- Testes da Funcionalidade "deactivateUser" ---

  test('deve desativar um usuário comum com sucesso', () => {
    
    const usuarioComum = userService.createUser('Comum', 'comum@teste.com', 30, false); 

    
    const resultado = userService.deactivateUser(usuarioComum.id);
    const usuarioAtualizado = userService.getUserById(usuarioComum.id);
 
    expect(resultado).toBe(true);
    expect(usuarioAtualizado.status).toBe('inativo');
  });

  test('não deve desativar um usuário administrador', () => {
    const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true); 

    const resultado = userService.deactivateUser(usuarioAdmin.id);
    const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);

    expect(resultado).toBe(false);
    expect(usuarioAtualizado.status).toBe('ativo');
  });
  const dadosUsuarioPadrao = {
    nome: 'Fulano de Tal',
    email: 'fulano@teste.com',
    idade: 25,
  };

  describe('UserService - Suíte de Testes Refatorada', () => {
    let userService;

    beforeEach(() => {
      userService = new UserService();
      userService._clearDB();
    });

    test('deve criar um novo usuário com status "ativo" por padrão', () => {
      const nome = dadosUsuarioPadrao.nome;
      const email = dadosUsuarioPadrao.email;
      const idade = dadosUsuarioPadrao.idade;

      const usuarioCriado = userService.createUser(nome, email, idade);

      expect(usuarioCriado.id).toBeDefined();
      expect(usuarioCriado.nome).toBe(nome);
      expect(usuarioCriado.email).toBe(email);
      expect(usuarioCriado.idade).toBe(idade);
      expect(usuarioCriado.status).toBe('ativo');
    });

    test('deve lançar um erro ao tentar criar usuário menor de idade', () => {
      const acaoDeCriar = () => {
        userService.createUser('Menor', 'menor@email.com', 17);
      };

      expect(acaoDeCriar).toThrow('O usuário deve ser maior de idade.');
    });

    test('deve buscar um usuário existente pelo ID', () => {
      const usuario = userService.createUser(
        dadosUsuarioPadrao.nome,
        dadosUsuarioPadrao.email,
        dadosUsuarioPadrao.idade
      );

      const usuarioBuscado = userService.getUserById(usuario.id);

      expect(usuarioBuscado).toBeDefined();
      expect(usuarioBuscado.id).toBe(usuario.id);
      expect(usuarioBuscado.nome).toBe(dadosUsuarioPadrao.nome);
    });

    test('deve desativar um usuário comum com sucesso', () => {
      const usuarioComum = userService.createUser('Comum', 'comum@teste.com', 30, false);

      const resultado = userService.deactivateUser(usuarioComum.id);
      const usuarioAtualizado = userService.getUserById(usuarioComum.id);

      expect(resultado).toBe(true);
      expect(usuarioAtualizado.status).toBe('inativo');
    });

    test('não deve desativar um usuário administrador', () => {
      const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true);

      const resultado = userService.deactivateUser(usuarioAdmin.id);
      const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);

      expect(resultado).toBe(false);
      expect(usuarioAtualizado.status).toBe('ativo');
    });

    test('deve gerar um relatório contendo os dados principais do usuário', () => {
      userService.createUser('Alice', 'alice@email.com', 28);
      userService.createUser('Bob', 'bob@email.com', 32);

      const relatorio = userService.generateUserReport();

      expect(relatorio).toContain('--- Relatório de Usuários ---');
      expect(relatorio).toContain('Alice');
      expect(relatorio).toContain('alice@email.com');
      expect(relatorio).toContain('Bob');
      expect(relatorio).toContain('bob@email.com');
    });

    test('deve gerar um relatório apenas com o cabeçalho se não houver usuários', () => {
      const relatorio = userService.generateUserReport();

      expect(relatorio).toContain('--- Relatório de Usuários ---');
      expect(relatorio).not.toContain('Nome:');
    });
  });
  // --- Testes da Funcionalidade "generateUserReport" ---

  test('deve gerar um relatório contendo os dados principais do usuário', () => {
    // Arrange (Organizar) 
    userService.createUser('Alice', 'alice@email.com', 28);
    userService.createUser('Bob', 'bob@email.com', 32);

    // Act (Agir) 
    const relatorio = userService.generateUserReport();

    // Assert (Verificar) 
    // Teste menos frágil: verifica o comportamento (conter os dados)
    // e não a implementação (string exata) 
    expect(relatorio).toContain('--- Relatório de Usuários ---');
    expect(relatorio).toContain('Alice');
    expect(relatorio).toContain('alice@email.com');
    expect(relatorio).toContain('Bob');
    expect(relatorio).toContain('bob@email.com');
  });

  test('deve gerar um relatório apenas com o cabeçalho se não houver usuários', () => {

    const relatorio = userService.generateUserReport();
    expect(relatorio).toContain('--- Relatório de Usuários ---');
    expect(relatorio).not.toContain('Nome:');
  });
});