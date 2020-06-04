import React from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import './style.css';
import logo from '../../assets/logo.svg';

const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>

                <main>
                    <h1>Seu Marketplace de coleta de residuos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>
                    <Link to ="/Register">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de Coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;