import {
    MODIFICA_ADICIONA_CONTATO_NAME,
    ADICIONA_CONTATO_ERRO, 
    ADICIONA_CONTATO_SUCESSO,
} from '../actions/Types';

const INITIAL_STATE = {
    adiciona_contato_name: '',
    cadastro_resultado_inclusao: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_ADICIONA_CONTATO_NAME:
            return {...state, adiciona_contato_name: action.payload}
        case ADICIONA_CONTATO_ERRO:
            return { ...state, cadastro_resultado_txt_erro: action.payload }
        case ADICIONA_CONTATO_SUCESSO:
            return { ...state, cadastro_resultado_inclusao: action.payload, adiciona_contato_email: '' }
        default: 
            return state;
    }
}