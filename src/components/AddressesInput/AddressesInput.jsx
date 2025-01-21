import React, {useEffect, useRef, useState} from 'react';
import {fetchAddresses} from "../../http/addressesApi";
import axios from "axios";

const AddressesInput = () => {
    const [query, setQuery] = useState(""); // Текст из инпута
    const [suggestions, setSuggestions] = useState([]); // Найденные города
    const [loading, setLoading] = useState(false); // Флаг загрузки
    const [isSelect, setIsSelect] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if(isSelect) {
            setIsSelect(false)
            return
        }
        const timeoutId = setTimeout(() => {
            if (query.trim() !== "") {
                    setLoading(true);
                    // fetchSuggestions(query)
                    fetchAddresses({query, count: 10}).then(data => {
                        setLoading(false);
                        if(data.suggestions.length) setIsDropdownOpen(true)

                        setSuggestions(data.suggestions)
                    })
            } else {
                setSuggestions([]); // Если поле пустое, очищаем результаты
            }
        }, 500); // Задержка 500 мс

        return () => clearTimeout(timeoutId); // Очищаем таймер при каждом изменении query
    }, [query]);


    const handleClickAddress = (value) => {
        setIsSelect(true)
        setQuery(value)
        setIsDropdownOpen(false)
    }

    return (
        <>
            <input name="" id=""
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={"Адрес"}
                      required
            />

            {query.length >= 35 && <span className={"adderess-notice"}>{query}</span>}

            {loading && <p>Загрузка...</p>}
            <ul ref={dropdownRef} className={`dropdown-cities ${isDropdownOpen && 'active'}`} style={{ listStyle: "none" }}>
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        style={{ }}
                        onClick={() => handleClickAddress(suggestion.value)} // Выбор города
                    >
                        {suggestion.value}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default AddressesInput;