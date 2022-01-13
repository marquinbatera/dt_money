import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import incomeImg from '../../assets/entradas.svg';
import outcomeImg from '../../assets/saidas.svg';

import closeImg from '../../assets/botao_fechar.svg'
import { Container, TransactionTypeContainer, RadioButton } from './styles';
import { api } from '../../servers/api';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const [type, setType] = useState('deposit');

    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        const data = {
            title,
            value,
            category,
            type
        };

        api.post('/transactions', data)

    }

    return (
        <Modal 
          isOpen={isOpen} 
          onRequestClose={onRequestClose}
          overlayClassName='react-modal-overlay'
          className='react-modal-content'
        >
            <button type='button' 
                onClick={onRequestClose} 
                className='react-modal-close'
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input 
                    placeholder='Título'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    type='number'
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}
                    placeholder='Valor'
                />

                <TransactionTypeContainer>
                    <RadioButton 
                        type='button'
                        isActive={type === 'deposit'}
                        activeColor="green"
                        onClick={() => setType('deposit')}
                    >
                        <img src={incomeImg} alt='Entrada' />
                        <span>Entrada</span>
                    </RadioButton>
                    <RadioButton 
                        type='button'
                        isActive={type === 'withdraw'}
                        activeColor="red"
                        onClick={() => setType('withdraw')}
                    >
                        <img src={outcomeImg} alt='Entrada' />
                        <span>Saída</span>
                    </RadioButton>
                </TransactionTypeContainer>

                <input 
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type='submit'>Cadastrar</button>

            </Container>
        </Modal>
    )
}