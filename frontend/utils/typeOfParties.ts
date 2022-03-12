
export const typeOfParties = {
    Infantil: {value: 'Infantil', textToShow: 'Infantil'},
    Debutante: {value: 'Debutante', textToShow: '15 anos (Debutante)'},
    Aniversario: {value: 'Aniversario', textToShow: 'Outros aniversários'}
}

export const typeOfServices = {
    Infantil: {
        services: [
            // ESPAÇOS
            {value: 'Chacara', textToShow: 'Chácara'},
            {value: 'SalaoDeFestas', textToShow: 'Salão de Festas'},
            // ALIMENTAÇÃO
            {value: 'BuffetTradicional', textToShow: 'Buffet Tradicional'},
            {value: 'Bolos', textToShow: 'Bolos'},
            {value: 'Doces', textToShow: 'Doces'},
            // SERVIÇOS
            {value: 'Fotografia', textToShow: 'Fotografia'},
            {value: 'Filmagem', textToShow: 'Filmagem'},
            {value: 'Decoracao', textToShow: 'Decoração'},
            {value: 'Musica', textToShow: 'Música'},
            {value: 'AnimacaoDeFesta', textToShow: 'Animação de Festa'}
        ]
    },
    Debutante: {
        services: [
            // ESPAÇOS
            {value: 'Chacara', textToShow: 'Chácara'},
            {value: 'SalaoDeFestas', textToShow: 'Salão de Festas'},
            // ALIMENTAÇÃO
            {value: 'BuffetTradicional', textToShow: 'Buffet Tradicional'},
            {value: 'Bolos', textToShow: 'Bolos'},
            {value: 'Doces', textToShow: 'Doces'},
            // SERVIÇOS
            {value: 'Fotografia', textToShow: 'Fotografia'},
            {value: 'Filmagem', textToShow: 'Filmagem'},
            {value: 'Decoracao', textToShow: 'Decoração'},
            {value: 'Musica', textToShow: 'Música'},
            {value: 'AnimacaoDeFesta', textToShow: 'Animação de Festa'}
        ]
    },
    Aniversario: {
        services: [
            // ESPAÇOS
            {value: 'Chacara', textToShow: 'Chácara'},
            {value: 'SalaoDeFestas', textToShow: 'Salão de Festas'},
            // ALIMENTAÇÃO
            {value: 'BuffetTradicional', textToShow: 'Buffet Tradicional'},
            {value: 'Bolos', textToShow: 'Bolos'},
            {value: 'Doces', textToShow: 'Doces'},
            // SERVIÇOS
            {value: 'Fotografia', textToShow: 'Fotografia'},
            {value: 'Filmagem', textToShow: 'Filmagem'},
            {value: 'Decoracao', textToShow: 'Decoração'},
            {value: 'Musica', textToShow: 'Música'},
            {value: 'AnimacaoDeFesta', textToShow: 'Animação de Festa'}
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
        description: 'Fotografia, Decoração, Bolos, Doces, ...'
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
        {value: 'Fotografia', textToShow: 'Fotografia'},
        {value: 'Filmagem', textToShow: 'Filmagem'},
        {value: 'Musica', textToShow: 'Música'}
    ]
}




export const specificQuestions = {
    Espaco: [
        'Celebra mais de um evento por dia ?',  
        // BUFFET
        'Dispõe de buffet/cozinha própria ?',
        // Se sim
        'O que inclui o menu ?',
        'É possível alugar apenas o espaço sem o serviço de buffet ?',
        'Qual é o tipo de cozinha servida ?',
        'É possível adaptar ou alterar os menus ?',
        'Dispõe de menus especiais ?',
        'Também serve o bolo de noiva ?',
        'Posso levar o meu próprio bolo de noiva? Tem algum encargo ?',
        'Como funciona o Open bar ?',

        // ESPAÇO
        'Tem uma hora limite para as celebrações ?',
        'Exclusividade de fotógrafo ?',
        'Exclusividade de música ?',
        'Exclusividade de buffet ?',
        'Existe algum pagamento fixo pelo lugar ?',
        'Qual é a penalização no caso de não se atingir o mínimo ?',
        'Quais são as formas de pagamento ?',
        'Dispõe de acessos para pessoas com deficiência ?',
    ],
    Servico: {
        Buffet: [
            // BUFFET
            'Cozinha no mesmo local da recepção ?',
            'O que inclui o menu ?',
            'É possível adaptar ou alterar os menus ?',
            'É possível elaborar menus personalizados ?',
            'Qual é o tipo de cozinha servida ?',
            'Dispõe de menus especiais ?',
            'Também serve o bolo de noiva ?',
            'Posso levar o meu próprio bolo de noiva? Tem algum encargo ?',
            'Tem uma hora limite para as celebrações ?',
            'Como funciona o Open bar ?',
            'Celebra mais de um evento por dia ?',
            'Qual é a penalização no caso de não se atingir o mínimo ?',
            'Quais são as formas de pagamento ?'
        ],
        Bolos: [
            'Que tipos de bolos oferece ?',
            'Realiza trabalhos a medida ?',
            'Dispõe de bolos especiais ?',
            'Que outros produtos oferece ?',
            'Leva o produto ao local da recepção ?',
            'Há algum custo para entregar a domicílio ?',
            'Quais são as formas de pagamento ?'
        ],
        Doces: [
            'Que tipo de produtos estão disponíveis ?',
            'Realiza trabalhos a medida ?',
            'Leva o produto ao local da recepção ?',
            'Quais são as formas de pagamento ?',
        ],
        Fotografia: [
            'Com que antecedência devo entrar em contato ?',
            'Cobre mais de um casamento por dia ?',
            'Que estilo de fotografia realiza ?',
            'Qual é a tecnologia utilizada ?',
            'Utiliza alguma técnica especial ou inovadora ?',
            'Que material utiliza ?',
            'Dispõe de algum sistema para compartilhar as fotos online ?',
            'Qual é o tempo de entrega aproximado do álbum finalizado ?',
            'Entrega todas as cópias originais ?',
            'Trabalha sozinho ou conta com uma equipe de profissionais ?',
            'Tem um substituto em caso de imprevisto ?',
            'Reserva o direito de publicar as fotos do casamento ?',
            'Recebe por horas ou por evento ?',
            'Se fosse necessário, poderia realizar horas extras ?',
            'Como é o pagamento das horas extras ?',
            'Quais são as formas de pagamento ?'
        ],     
        Filmagem: [
            'Com que antecedência devo entrar em contato ?',
            'Cobre mais de um casamento por dia ?',
            'Que estilo de vídeo realiza ?',
            'Qual é a tecnologia utilizada ?',
            'Utiliza alguma técnica especial ou inovadora ?',
            'Que material utiliza ?',
            'Trabalha sozinho ou conta com uma equipe de profissionais ?',
            'Tem um substituto em caso de imprevisto ?',
            'Reserva o direito de publicar as fotos do casamento ?',
            'Qual é o tempo de entrega aproximado do álbum finalizado ?',
            'Recebe por horas ou por evento ?',
            'Se fosse necessário, poderia realizar horas extras ?',
            'Como é o pagamento das horas extras ?',
            'Quais são as formas de pagamento ?',
            'Como é o seu estilo de trabalhar?'
        ],
        Decoracao: [
            'Ao contratar o serviço, encarrega-se de: ',
            'Com que antecedência devo entrar em contato ?',
            'Tem um showroom para ver os exemplos disponíveis ?',
            'Dispõe de um serviço de assessoria ?',
            'Quais são as formas de pagamento ?'
        ],
        Musica: [
            'O que inclui o pack de casamento ?',
            'Com que antecedência devo entrar em contato ?',
            'Tamanho da formação',
            'Repertório:',
            'Há algum problema ou impedimento se peço uma música que não está no repertório ?',
            'Experiência:',
            'Dispõe de equipamento próprio ?',
            'Necessita de algum material em concreto ou condições específicas para oferecer o serviço ?',
            'Pode fazer deslocamentos ?',
            'Cobre mais de um casamento por dia ?',
            'Trabalha sozinho ou conta com uma equipe de profissionais ?',
            'Quanto tempo dura o serviço ?',
            'De quanto tempo necessita para preparar a atuação ?',
            'Realiza atuações ao ar livre ?',
            'Recebe por horas ou por evento ?',
            'Se fosse necessário, poderia realizar horas extras ?',
            'Como é o pagamento das horas extras ?',
            'Quais são as formas de pagamento ?',
        ],
        AnimacaoDeFesta: [
            'Com que antecedência devo entrar em contato ?',
            'Que outros serviços são oferecidos ?',
            'Necessita de algum material em concreto ou condições específicas para oferecer o serviço ?',
            'Quanto tempo dura o serviço ?',
            'De quanto tempo necessita para preparar a atuação ?',
            'Trabalha sozinho ou conta com uma equipe de profissionais ?',
            'Realiza atuações ao ar livre ?',
            'Recebe por horas ou por evento ?',
            'Se fosse necessário, poderia realizar horas extras ?',
            'Como é o pagamento das horas extras ?',
            'Quais são as formas de pagamento ?'
        ]
    }
}