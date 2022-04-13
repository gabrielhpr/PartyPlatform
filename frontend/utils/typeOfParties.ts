import { RiQuestionFill } from "react-icons/ri"
import { GiBlockHouse, GiCupcake, GiPartyFlags, GiForkKnifeSpoon, GiPartyPopper } from "react-icons/gi";
import { FaBirthdayCake } from "react-icons/fa";
import { ImCamera } from "react-icons/im";
import { BsMusicNoteBeamed } from "react-icons/bs";


export const typeOfParties = {
    Infantil: {value: 'Infantil', textToShow: 'Infantil'},
    Debutante: {value: 'Debutante', textToShow: '15 anos (Debutante)'},
    Aniversario: {value: 'Aniversario', textToShow: 'Outros aniversários'}
}

export const typeOfServices = {
    Infantil: {
        services: [
            // ESPAÇOS
            {value: 'Chacara', textToShow: 'Chácara', parent: 'Espaco', icon: GiBlockHouse },
            {value: 'SalaoDeFestas', textToShow: 'Salão de Festas', parent: 'Espaco', icon: GiBlockHouse},
            // ALIMENTAÇÃO
            {value: 'Buffet', textToShow: 'Buffet Tradicional', parent:'Servico', icon: GiForkKnifeSpoon},
            {value: 'Bolos', textToShow: 'Bolos', parent:'Servico', icon: FaBirthdayCake},
            {value: 'Doces', textToShow: 'Doces', parent:'Servico', icon: GiCupcake},
            // SERVIÇOS
            {value: 'FotografiaFilmagem', textToShow: 'Fotografia/Filmagem', parent:'Servico', icon: ImCamera},
            {value: 'Decoracao', textToShow: 'Decoração', parent:'Servico', icon: GiPartyFlags},
            {value: 'Musica', textToShow: 'Música', parent:'Servico', icon: BsMusicNoteBeamed},
            {value: 'AnimacaoDeFesta', textToShow: 'Animação de Festa', parent:'Servico', icon: GiPartyPopper}
        ]
    },
    Debutante: {
        services: [
            // ESPAÇOS
            {value: 'Chacara', textToShow: 'Chácara', parent: 'Espaco', icon: GiBlockHouse },
            {value: 'SalaoDeFestas', textToShow: 'Salão de Festas', parent: 'Espaco', icon: GiBlockHouse},
            // ALIMENTAÇÃO
            {value: 'Buffet', textToShow: 'Buffet Tradicional', parent:'Servico', icon: GiForkKnifeSpoon},
            {value: 'Bolos', textToShow: 'Bolos', parent:'Servico', icon: FaBirthdayCake},
            {value: 'Doces', textToShow: 'Doces', parent:'Servico', icon: GiCupcake},
            // SERVIÇOS
            {value: 'FotografiaFilmagem', textToShow: 'Fotografia/Filmagem', parent:'Servico', icon: ImCamera},
            {value: 'Decoracao', textToShow: 'Decoração', parent:'Servico', icon: GiPartyFlags},
            {value: 'Musica', textToShow: 'Música', parent:'Servico', icon: BsMusicNoteBeamed},
            {value: 'AnimacaoDeFesta', textToShow: 'Animação de Festa', parent:'Servico', icon: GiPartyPopper}
        ]
    },
    Aniversario: {
        services: [
            // ESPAÇOS
            {value: 'Chacara', textToShow: 'Chácara', parent: 'Espaco', icon: GiBlockHouse },
            {value: 'SalaoDeFestas', textToShow: 'Salão de Festas', parent: 'Espaco', icon: GiBlockHouse},
            // ALIMENTAÇÃO
            {value: 'Buffet', textToShow: 'Buffet Tradicional', parent:'Servico', icon: GiForkKnifeSpoon},
            {value: 'Bolos', textToShow: 'Bolos', parent:'Servico', icon: FaBirthdayCake},
            {value: 'Doces', textToShow: 'Doces', parent:'Servico', icon: GiCupcake},
            // SERVIÇOS
            {value: 'FotografiaFilmagem', textToShow: 'Fotografia/Filmagem', parent:'Servico', icon: ImCamera},
            {value: 'Decoracao', textToShow: 'Decoração', parent:'Servico', icon: GiPartyFlags},
            {value: 'Musica', textToShow: 'Música', parent:'Servico', icon: BsMusicNoteBeamed},
            {value: 'AnimacaoDeFesta', textToShow: 'Animação de Festa', parent:'Servico', icon: GiPartyPopper}
        ]
    }
} 

export const enterpriseCategory = {
    Espaco: {
        value: 'Espaco', textToShow: 'Espaço para festas', 
        description: 'Salão de Festas, Chácara, Buffet, ...'
    },
    Servico: {
        value: 'Servico', textToShow: 'Prestador de serviço',
        description: 'Fotografia/Filmagem, Decoração, Bolos, Doces, ...'
    }
}

export const enterpriseSpecificCategory = {
    Espaco: [
        {value: 'SalaoDeFesta', textToShow: 'Salão de Festa'},
        {value: 'Chacara', textToShow: 'Chácara'},
        {value: 'Buffet', textToShow: 'Buffet'}
    ],
    Servico: [
        {value: 'AnimacaoDeFesta', textToShow: 'Animação de Festa'},
        {value: 'Buffet', textToShow: 'Buffet'},
        {value: 'Bolos', textToShow: 'Bolos'},
        {value: 'Decoracao', textToShow: 'Decoração'},
        {value: 'Doces', textToShow: 'Doces'},
        {value: 'FotografiaFilmagem', textToShow: 'Fotografia/Filmagem'},
        {value: 'Musica', textToShow: 'Música'}
    ]
}

export const enterpriseSpecificCategoryDict = {
    'SalaoDeFesta': 'Salão de Festa',
    'Chacara': 'Chácara',
    'Buffet': 'Buffet',
    'AnimacaoDeFesta': 'Animação de Festa',
    'Bolos': 'Bolos',
    'Decoracao': 'Decoração',
    'Doces': 'Doces',
    'FotografiaFilmagem': 'Fotografia/Filmagem',
    'Musica': 'Música'
}

export const locationMap = {
    l1: {city: 'osasco', state: 'sp', country: 'brasil', textToShow: 'Osasco - SP, Brasil'},
    l2: {city: 'saopaulo', state: 'sp', country: 'brasil', textToShow: 'São Paulo - SP, Brasil'},
    l3: {city: 'carapicuiba', state: 'sp', country: 'brasil', textToShow: 'Carapicuíba - SP, Brasil'},
    l4: {city: 'barueri', state: 'sp', country: 'brasil', textToShow: 'Barueri - SP, Brasil'},
    l5: {city: 'cotia', state: 'sp', country: 'brasil', textToShow: 'Cotia - SP, Brasil'},
    l6: {city: 'itapevi', state: 'sp', country: 'brasil', textToShow: 'Itapevi - SP, Brasil'},
}

export const priceOptionsPerService = {
    Espaco: {
        SoEspaco: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-500', textToShow: 'Até R$500'},
            {value: '500-1000', textToShow: 'Entre R$500 e R$1000'},
            {value: '1000-2000', textToShow: 'Entre R$1000 e R$2000'},
            {value: '2000-3000', textToShow: 'Entre R$2000 e R$3000'},
            {value: '3000-5000', textToShow: 'Entre R$3000 e R$5000'},
            {value: '5000-10000', textToShow: 'Entre R$5000 e R$10000'},
            {value: '10000-10000000', textToShow: '+R$10000'}
        ],
        EspacoEBuffet: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-30', textToShow: 'Até R$30'},
            {value: '30-50', textToShow: 'Entre R$30 e R$50'},
            {value: '50-75', textToShow: 'Entre R$50 e R$75'},
            {value: '75-100', textToShow: 'Entre R$75 e R$100'},
            {value: '100-1000000', textToShow: '+R$100'}
        ]
    },
    Servico: {
        AnimacaoDeFesta: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-300', textToShow: 'Até R$300'},
            {value: '300-500', textToShow: 'Entre R$300 e R$500'},
            {value: '500-1000', textToShow: 'Entre R$500 e R$1000'},
            {value: '1000-10000000', textToShow: '+R$1000'},
        ],
        Buffet: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-30', textToShow: 'Até R$30'},
            {value: '30-50', textToShow: 'Entre R$30 e R$50'},
            {value: '50-75', textToShow: 'Entre R$50 e R$75'},
            {value: '75-100', textToShow: 'Entre R$75 e R$100'},
            {value: '100-100000', textToShow: '+R$100'}
        ],
        Bolos: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-30', textToShow: 'Até R$30'},
            {value: '30-50', textToShow: 'Entre R$30 e R$50'},
            {value: '50-75', textToShow: 'Entre R$50 e R$75'},
            {value: '75-100', textToShow: 'Entre R$75 e R$100'},
            {value: '100-200', textToShow: 'Entre R$100 e R$200'},
            {value: '200-300', textToShow: 'Entre R$200 e R$300'},
            {value: '300-10000000', textToShow: '+R$300'},
        ],
        Decoracao: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-500', textToShow: 'Até R$500'},
            {value: '500-1000', textToShow: 'Entre R$500 e R$1000'},
            {value: '1000-2000', textToShow: 'Entre R$1000 e R$2000'},
            {value: '2000-3000', textToShow: 'Entre R$2000 e R$3000'},
            {value: '3000-5000', textToShow: 'Entre R$3000 e R$5000'},
            {value: '5000-1000000', textToShow: '+R$5000'},
        ],
        Doces: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-50', textToShow: 'Até R$50'},
            {value: '50-100', textToShow: 'Entre R$50 e R$100'},
            {value: '100-200', textToShow: 'Entre R$100 e R$200'},
            {value: '200-1000000', textToShow: '+R$200'}
        ],
        FotografiaFilmagem: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-500', textToShow: 'Até R$500'},
            {value: '500-1000', textToShow: 'Entre R$500 e R$1000'},
            {value: '1000-2000', textToShow: 'Entre R$1000 e R$2000'},
            {value: '2000-3000', textToShow: 'Entre R$2000 e R$3000'},
            {value: '3000-5000', textToShow: 'Entre R$3000 e R$5000'},
            {value: '5000-1000000', textToShow: '+R$5000'},        
        ],
        Musica: [
            {value: '-1', textToShow: 'Sem filtro'},
            {value: '0-500', textToShow: 'Até R$500'},
            {value: '500-1000', textToShow: 'Entre R$500 e R$1000'},
            {value: '1000-2000', textToShow: 'Entre R$1000 e R$2000'},
            {value: '2000-1000000', textToShow: '+R$2000'}
        ]
    }
}

export function minPrice(element : any) {
    let price = '';

    if( element.enterpriseCategory == 'Espaco' ) {
        if( element.q3 == 'Sim' ) {
            price = element.q5;
        }
        else {
            price = element.q21;
        }
    }
    else if( element.enterpriseCategory == 'Servico' ) {
        price = element.q1;
    }

    return price;
}


export const specificQuestions = {
    Espaco: [
        {name: ['q1', 'q2'], question: 'Celebra mais de um evento por dia ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},

        // BUFFET
        {name: ['q3', 'q4'], question: 'Dispõe de buffet/cozinha própria ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},

        // Se sim
        {name: ['q5'], question: 'Qual o preço mínimo por pessoa ?', description: '', type: 'input', inputType: 'text', span: 'R$ ', specific:'price'},
        {name: ['q6'], question: 'Qual o número mínimo de convidados que atende ?', description: '', type: 'input', inputType:'text', specific: 'nOfPeople'},
        {name: ['q7'], question: 'Qual o número máximo de convidados que atende ?', description: '', type: 'input', inputType:'text', specific: 'nOfPeople'},
        {name: ['q8'], question: 'O que inclui o menu ?', description: '', type: 'textarea', placeholder: ''},
        {name: ['q9','q10'], question: 'É possível alugar apenas o espaço sem o serviço de buffet ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q11'], question: 'Qual é o tipo de cozinha servida ?', description: '', type: 'textarea', placeholder: ''},
        {name: ['q12', 'q13'], question: 'É possível adaptar ou alterar os menus ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q14', 'q15'], question: 'Dispõe de menus especiais ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q16', 'q17'], question: 'Também serve o bolo de noiva ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q18', 'q19'], question: 'Posso levar o meu próprio bolo de noiva? Tem algum encargo ?', description: '', type: 'radio', options: ['Não há encargo', 'Há encargo'], placeholder: 'Observações: '},
        {name: ['q20'], question: 'Como funciona o Open bar ?', description: '', type: 'textarea', placeholder: ''},

        // Se não
        {name: ['q21'], question: 'Qual o preço mínimo do aluguel do espaço ?', description: '', type: 'input', inputType: 'text', specific: 'price'},
        {name: ['q22'], question: 'Qual o número mínimo de convidados que aceita ?', description: '', type: 'input', inputType: 'text', specific: 'nOfPeople'},
        {name: ['q23'], question: 'Qual o número máximo de convidados que aceita ?', description: '', type: 'input', inputType: 'text', specific: 'nOfPeople'},

        // ESPAÇO
        {name: ['q24', 'q25'], question: 'Tem uma hora limite para as celebrações ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q26', 'q27'], question: 'Há exclusividade de buffet ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q28', 'q29'], question: 'Há exclusividade de decoração ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q30', 'q31'], question: 'Há exclusividade de fotógrafo ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q32', 'q33'], question: 'Há exclusividade de música ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q34', 'q35'], question: 'Existe algum pagamento fixo pelo lugar ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q36', 'q37'], question: 'Há penalização no caso de não se atingir o número mínimo de pessoas ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q38', 'q39'], question: 'Parcela até a data do evento ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
        {name: ['q40'], question: 'Quais são as formas de pagamento ?', description: '', type: 'textarea', placeholder: ''},
        {name: ['q41', 'q42'], question: 'Dispõe de acessos para pessoas com deficiência ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '}
    ],
    Servico: {
        Buffet: [
            // BUFFET
            {name: ['q1'], question: 'Qual o preço mínimo por pessoa ?', description: '', type: 'input', inputType: 'text', span: 'R$ ', specific: 'price'},
            {name: ['q2'], question: 'Qual o número mínimo de convidados que atende ?', description: '', type: 'input', inputType:'text', specific: 'nOfPeople' },
            {name: ['q3'], question: 'Qual o número máximo de convidados que atende ?', description: '', type: 'input', inputType:'text', specific: 'nOfPeople'},
            {name: ['q4', 'q5'], question: 'Tem uma hora limite para as celebrações ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q6','q7'], question: 'Cozinha no mesmo local da recepção ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q8'], question: 'O que inclui o menu ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q9','q10'], question: 'É possível adaptar ou alterar os menus ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q11','q12'], question: 'É possível elaborar menus personalizados ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q13'], question: 'Qual é o tipo de cozinha servida ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q14','q15'], question: 'Dispõe de menus especiais ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q16','q17'], question: 'Também serve o bolo de noiva ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q18','q19'], question: 'Posso levar o meu próprio bolo de noiva? Tem algum encargo ?', description: '', type: 'radio', options: ['Não há encargo', 'Há encargo'], placeholder: 'Observações: '},
            {name: ['q20','q21'], question: 'Tem uma hora limite para as celebrações ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q22'], question: 'Como funciona o Open bar ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q23','q24'], question: 'Celebra mais de um evento por dia ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q25','q26'], question: 'Há penalização no caso de não se atingir o número mínimo de pessoas ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q27','q28'], question: 'Parcela até a data do evento ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q29'], question: 'Quais são as formas de pagamento ?', description: '', type: 'textarea', placeholder: ''}
        ],
        Bolos: [
            {name: ['q1'], question: 'Qual o preço mínimo do kg ?', description: '', type: 'input', inputType: 'text', span: 'R$ ', specific: 'price'},
            {name: ['q2'], question: 'Qual o peso mínimo que atende ?', description: '', type: 'input', inputType:'text', span: 'Kg ', specific: 'float'},
            {name: ['q3'], question: 'Qual o peso máximo que atende ?', description: '', type: 'input', inputType:'text', span: 'Kg ', specific: 'float'},
            {name: ['q4'], question: 'Que tipos de bolos oferece ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q5','q6'], question: 'Realiza trabalhos a medida ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q7','q8'], question: 'Dispõe de bolos especiais ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q9'], question: 'Que outros produtos oferece ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q10','q11'], question: 'Realiza a entrega do produto ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q12','q13'], question: 'Há custo de entrega ? Se sim, qual é o custo ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q14'], question: 'Quais são as formas de pagamento ?', description: '', type: 'textarea', placeholder: ''}
        ],
        Doces: [
            {name: ['q1'], question: 'Qual o preço mínimo do serviço ?', description: '', type: 'input', inputType: 'text', span: 'R$ ', specific: 'price'},
            {name: ['q2'], question: 'Que tipo de produtos estão disponíveis ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q3','q4'], question: 'Realiza trabalhos sob medida ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q5','q6'], question: 'Realiza a entrega do produto ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q7'], question: 'Qual o custo para entregar ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q8'], question: 'Quais são as formas de pagamento ?', description: '', type: 'textarea', placeholder: ''}
        ],
        FotografiaFilmagem: [
            {name: ['q1'], question: 'Qual o preço mínimo do serviço ?', description: '', type: 'input', inputType: 'text', span: 'R$ ', specific: 'price'},

            {name: ['q2','q3'], question: 'Quais serviços realiza ?', description: '', type: 'radio', options:['Fotografia', 'Filmagem', 'Fotografia e Filmagem']},
            
            // Geral
            {name: ['q4'], question: 'Com que antecedência devo entrar em contato ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q5','q6'], question: 'Cobre mais de um evento por dia ?', description: '', type: 'radio', options:['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q7','q8'], question: 'Recebe por horas ou por evento ?', description: '', type: 'radio', options: ['Por horas', 'Por evento'], placeholder: 'Observações: '},
            {name: ['q9','q10'], question: 'Se fosse necessário, poderia realizar horas extras ?', description: '', type:'radio', options:['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q11'], question: 'Como é o pagamento das horas extras ?', description: '', type:'textarea', placeholder: ''},
            {name: ['q12', 'q13'], question: 'Parcela até a data do evento ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q14'], question: 'Quais são as formas de pagamento ?', description: '', type:'textarea', placeholder: ''},
            {name: ['q15','q16'], question: 'Trabalha sozinho ou conta com uma equipe de profissionais ?', description: '', type: 'radio', options: ['Sozinho', 'Com equipe'], placeholder: 'Observações: '},
            {name: ['q17','q18'], question: 'Tem um substituto em caso de imprevisto ?', description: '', type: 'radio', options:['Sim','Não'], placeholder: 'Observações: '},
            {name: ['q19','q20'], question: 'Reserva o direito de publicar as fotos/filmagem do evento ?', description: '', type: 'radio', options:['Sim','Não'], placeholder: 'Observações: '},
            
            // Fotografia
            {name: ['q21'], question: 'Que estilo de fotografia realiza ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q22'], question: 'Qual é a tecnologia utilizada ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q23'], question: 'Utiliza alguma técnica especial ou inovadora ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q24'], question: 'Que material utiliza ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q25','q26'], question: 'Dispõe de algum sistema para compartilhar as fotos online ?', description: '', type: 'radio', options:['Sim','Não'], placeholder: 'Observações: '},
            {name: ['q27'], question: 'Qual é o tempo de entrega aproximado do álbum finalizado ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q28','q29'], question: 'Entrega todas as cópias originais ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            
            // Filmagem
            {name: ['q30'], question: 'Que estilo de vídeo realiza ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q31'], question: 'Qual é a tecnologia utilizada ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q32'], question: 'Utiliza alguma técnica especial ou inovadora ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q33'], question: 'Que material utiliza ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q34'], question: 'Como é o seu estilo de trabalhar?', description: '', type: 'textarea', placeholder: ''}
        ],     
        Decoracao: [
            {name: ['q1'], question: 'Qual o preço mínimo do serviço ?', description: '', type: 'input', inputType: 'text', span: 'R$ ', specific: 'price'},
            {name: ['q2'], question: 'Qual o número mínimo de convidados que atende ?', description: '', type: 'input', inputType:'text', specific: 'nOfPeople'},
            {name: ['q3'], question: 'Qual o número máximo de convidados que atende ?', description: '', type: 'input', inputType:'text', specific: 'nOfPeople'},
            {name: ['q4'], question: 'Ao contratar o serviço, encarrega-se de: ', description: '', type: 'textarea', placeholder: ''},
            {name: ['q5'], question: 'Com que antecedência devo entrar em contato ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q6','q7'], question: 'Tem um showroom para ver os exemplos disponíveis ?', description: '', type: 'radio', options:['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q8','q9'], question: 'Parcela até a data do evento ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q10'], question: 'Quais são as formas de pagamento ?', description: '', type: 'textarea', placeholder: ''}
        ],
        Musica: [
            {name: ['q1'], question: 'Qual o preço mínimo do serviço ?', description: '', type: 'input', inputType: 'text', span: 'R$ ', specific: 'price'},
            {name: ['q2'], question: 'O que inclui o pack de casamento ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q3'], question: 'Com que antecedência devo entrar em contato ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q4'], question: 'Qual o tamanho da formação ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q5'], question: 'Qual é o repertório ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q6','q7'], question: 'Há algum problema ou impedimento se peço uma música que não está no repertório ?', description: '', type: 'radio', options:['Sim','Não'], placeholder: 'Observações: '},
            {name: ['q8'], question: 'Descreva sua experiência:', description: '', type: 'textarea', placeholder: ''},
            {name: ['q9','q10'], question: 'Dispõe de equipamento próprio ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q11'], question: 'Necessita de algum material em concreto ou condições específicas para oferecer o serviço ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q12','q13'], question: 'Pode fazer deslocamentos ?', description: '', type: 'radio', options:['Sim','Não'], placeholder: 'Observações: '},
            {name: ['q14','q15'], question: 'Cobre mais de um evento por dia ?', description: '', type: 'radio', options:['Sim','Não'], placeholder: 'Observações: '},
            {name: ['q16', 'q17'], question: 'Trabalha sozinho ou conta com uma equipe de profissionais ?', description: '', type: 'radio', options: ['Sozinho', 'Com equipe'], placeholder: 'Observações: '},
            {name: ['q18'], question: 'Quanto tempo dura o serviço ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q19'], question: 'De quanto tempo necessita para preparar a atuação ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q20','q21'], question: 'Realiza atuações ao ar livre ?', description: '', type: 'radio', options:['Sim','Não'], placeholder: 'Observações: '},
            {name: ['q22','q23'], question: 'Recebe por horas ou por evento ?', description: '', type: 'radio', options:['Por horas', 'Por evento'], placeholder: 'Observações: '},
            {name: ['q24','q25'], question: 'Se fosse necessário, poderia realizar horas extras ?', description: '', type: 'radio', options:['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q26'], question: 'Como é o pagamento das horas extras ?', description: '', type: 'textarea', placeholder: ''},
            {name: ['q27','q28'], question: 'Parcela até a data do evento ?', description: '', type: 'radio', options: ['Sim', 'Não'], placeholder: 'Observações: '},
            {name: ['q29'], question: 'Quais são as formas de pagamento ?', description: '', type: 'textarea', placeholder: ''}
        ],
        AnimacaoDeFesta: [
            {name:['q1'], question: 'Qual o preço mínimo do serviço ?', description: '', type: 'input', inputType: 'text', span: 'R$ ', specific: 'price'},
            {name:['q2'], question: 'Com que antecedência devo entrar em contato ?', description: '', type:'textarea', placeholder: ''},
            {name:['q3'], question: 'Que outros serviços são oferecidos ?', description: '', type:'textarea', placeholder: ''},
            {name:['q4'], question: 'Necessita de algum material em concreto ou condições específicas para oferecer o serviço ?', description: '', type:'textarea', placeholder: ''},
            {name:['q5'], question: 'Quanto tempo dura o serviço ?', description: '', type:'textarea', placeholder: ''},
            {name:['q6'], question: 'De quanto tempo necessita para preparar a atuação ?', description: '', type:'textarea', placeholder: ''},
            {name:['q7'], question: 'Trabalha sozinho ou conta com uma equipe de profissionais ?', description: '', type:'radio', options:['Sozinho', 'Com equipe'], placeholder: 'Observações: '},
            {name:['q8','q9'], question: 'Realiza atuações ao ar livre ?', description: '', type:'radio', options:['Sim','Não'], placeholder: 'Observações: '},
            {name:['q10','q11'], question: 'Recebe por horas ou por evento ?', description: '', type:'radio', options:['Por horas', 'Por evento'], placeholder: 'Observações: '},
            {name:['q12','q13'], question: 'Se fosse necessário, poderia realizar horas extras ?', description: '', type:'radio', options: ['Sim','Não'], placeholder: 'Observações: '},
            {name:['q14'], question: 'Como é o pagamento das horas extras ?', description: '', type:'textarea', placeholder: ''},
            {name:['q15'], question: 'Quais são as formas de pagamento ?', description: '', type:'textarea', placeholder: ''}
        ]
    }
}