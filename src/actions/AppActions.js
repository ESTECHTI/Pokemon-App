import {
    MODIFICA_ADICIONA_CONTATO_NAME,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
} from './Types';

export const modificaAdicionaContatoName = texto => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_NAME,
        payload: texto
    }
}


