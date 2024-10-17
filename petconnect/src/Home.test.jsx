import { render, screen, fireEvent } from '@testing-library/react';
import Home from './home';
import { signOut } from 'firebase/auth'; // Importa solo signOut
import { vi, describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mockear las funciones de Firebase
vi.mock('firebase/auth', () => ({
  signOut: vi.fn(() => Promise.resolve()), // Mock de signOut con una promesa resuelta
  getAuth: vi.fn(() => ({})), // Mock de getAuth
}));

describe('Home Component', () => {
  it('Renderiza correctamente con nombre de usuario', () => {
    render(
      <MemoryRouter>
        <Home nombreUsuario="John Doe" />
      </MemoryRouter>
    );
    const greeting = screen.getByText('Bienvenido');
    const username = screen.getByText('John Doe');

    expect(greeting).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });

  it('Renderiza "Usuario" si no hay nombre de usuario', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const username = screen.getByText('Usuario');
    expect(username).toBeInTheDocument();
  });

  it('El menú de navegación aparece y desaparece al hacer clic en el icono de hamburguesa', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Buscar el icono del menú de hamburguesa
    const menuIcon = screen.getByText('☰');

    // Verificar que el menú está cerrado inicialmente
    let navLinks = screen.getByRole('navigation').querySelector('.nav-links');
    expect(navLinks.classList.contains('active')).toBe(false);

    // Simular clic en el ícono de menú
    fireEvent.click(menuIcon);

    // Verificar que el menú ahora está abierto
    expect(navLinks.classList.contains('active')).toBe(true);
  });

  it('Cerrar sesión llama a la función signOut', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText('Cerrar Sesión');

    fireEvent.click(logoutButton);

    // Esperar a que la promesa de signOut se resuelva
    await expect(signOut).toHaveBeenCalled();
  });
});

/*para realizar el testeo en la pagina principal home.jsx de la pagina web
 Usamos el siguiente comando para hacer el testeo de la pagina en la terminal
                              npx vitest run */