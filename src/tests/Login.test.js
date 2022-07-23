import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import Login from "../pages/Login";

describe('Testando a página de Login', () => {
  test('Testando se a logo aparece na tela de login', () => {
    render(<Login />, {wrapper: BrowserRouter})

    const logoImg = screen.getByAltText('logo');

    expect(logoImg).toBeInTheDocument();
  });

  test('Testando se aparece o formulário de login', () => {
    render(<Login />, {wrapper: BrowserRouter})

    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const loginButton = screen.getByText('Acessar');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Testando se aparece o aviso caso o email ou a senha não sejam válidos', () => {
    render(<Login />, {wrapper: BrowserRouter})

    const emailInput = screen.getByPlaceholderText('E-mail');
    fireEvent.change(emailInput, {
      target: { value: "teste" }
    });
    const errorMessage = screen.getByText('Digite um e-mail válido');

    const passwordInput = screen.getByPlaceholderText('Senha');
    fireEvent.change(passwordInput, {
      target: { value: "teste" }
    });
    const errorPasswordMessage = screen.getByText('A senha deve ter pelo menos 6 caracteres');

    expect(errorMessage).toBeInTheDocument();
    expect(errorPasswordMessage).toBeInTheDocument();
  });
})