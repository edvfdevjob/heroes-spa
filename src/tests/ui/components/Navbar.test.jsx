import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth";
import { Navbar } from "../../../ui";


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate

}));

describe('Pruebas en Navbar', () => { 

    const contextValue = {
        logged: true,
        user: { id: 'ABC', name: 'Enmanuel' },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks() )

    test('debe de mostrar el nombre del usuario', () => { 

        

        render(
            <MemoryRouter initialEntries={['/marvel']}> 
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
            
        );

        expect( screen.getByText('Enmanuel') ).toBeTruthy();

     });

     test('debe de llamar el logout y navigate cuando se hace click en el boton', () => { 

        render(
            <MemoryRouter initialEntries={['/marvel']}> 
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const buttonLogout = screen.getByText('Logout');


        fireEvent.click( buttonLogout );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});


      });

 })