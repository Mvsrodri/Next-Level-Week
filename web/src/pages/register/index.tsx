import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import {LeafletMouseEvent} from 'leaflet';


import api from '../../services/api';
import './style.css';
import logo from '../../assets/logo.svg';
import Alert from '../alert';


interface Item{
    id: number;
    title: string;
    image: string;
}

interface IBGEUFResponse{
    sigla: string;
}

interface IBGECityResponse{
    nome: string;
}
const Register = () => {
    const [itens, setItens] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const[formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItens, setSelectedItens] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [SubmitedAlert, setSubmitedAlert] = useState<boolean>(false);

    const history = useHistory();

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(position =>{
            const {latitude,longitude} = position.coords;

            setInitialPosition([latitude,longitude]);
        });
    }, []);
    
    useEffect(()=> {
        api.get('itens').then(response =>{
            setItens(response.data);
            
        });
    }, []);

    useEffect(()=> {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
            const ufInitials = response.data.map(uf => uf.sigla);
            

            setUfs(ufInitials);
        });
    }, []);

    useEffect(()=> {
        if(selectedUf === '0'){
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response =>{
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        });

    }, [selectedUf]);

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }

    function handleImputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;

        setFormData({...formData, [name]: value });
    }

    function handleSelectItem(id: number){
        const alreadySelected = selectedItens.findIndex(item => item === id);

        if(alreadySelected >= 0){
            const filteredItens = selectedItens.filter(item => item !== id);

            setSelectedItens(filteredItens);
        }else{
            setSelectedItens([...selectedItens, id]);
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        
        const {name,email,whatsapp} = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const itens = selectedItens;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude, 
            longitude,
            itens
        };
        await api.post('points', data);

        
        setSubmitedAlert(true);

        let delay = 2300;
        
        setTimeout(function(){
            history.push('/');
        },delay);
        
    }
    return (
        <div id="page-create-point">
            {SubmitedAlert ? <Alert />: null}
            <header>
                <img src={logo} alt="Ecoleta"></img>

                <Link to ="/"> 
                    <FiArrowLeft />
                    Voltar para Home 
                </Link>
            </header>
            
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de Coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleImputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleImputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleImputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition}></Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value ={selectedUf} onChange={handleSelectedUf}>
                                <option value="0">Selecione um Estado</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value ={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid"> 
                           
                        {itens.map(item => (
                           
                            <li key={item.id} 
                            onClick={()=>handleSelectItem(item.id)} 
                            className={selectedItens.includes(item.id)? 'selected' : ''}>
                              <img src={item.image} alt={item.title}/>
                              <span>{item.title}</span>
                            </li>
                            
                        ))} 
                    
                    </ul>
                </fieldset>
                
                <button type="submit">Cadastrar ponto de Coleta</button>
            </form>
        </div>
    );
}

export default Register;