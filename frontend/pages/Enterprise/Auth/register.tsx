import { Box, Button, Flex, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { ItemList } from "../../../components/Enterprise/ItemList";
import { RegisterFormLayout } from "../../../components/Enterprise/RegisterFormLayout";
import { useRouter } from "next/router";
import { useEnterpriseAuthContext } from "../../../context/enterpriseContext";
import Image from 'next/image';
import { enterpriseCategory, enterpriseSpecificCategory, typeOfParties,
specificQuestions, 
enterpriseSpecificCategoryDict,
locationMap} from "../../../utils/typeOfParties";
import { TextSpanInput } from "../../../components/Enterprise/TextSpanInput";

interface enterpriseDataInterf {
    step: number;
    // Contact Data
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    // Access Data
    password: string;
    passwordConfirmation: string;
    // About the enterprise
    enterpriseName: string;
    
    // Just for showing the user
    location: string;

    city: string;
    state: string;
    country: string;
    address: string;
    addressNumber: number;
    // Enterprise Social Media
    instagram?: string;
    facebook?: string;
    website?: string;
    
    partyMainFocus: string;
    serviceDescription: string;
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;

    photos: any[];

    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    q6: string;
    q7: string;
    q8: string;
    q9: string;
    q10: string;
    q11: string;
    q12: string;
    q13: string;
    q14: string;
    q15: string;
    q16: string;
    q17: string;
    q18: string;
    q19: string;
    q20: string;
    q21: string;
    q22: string;
    q23: string;
    q24: string;
    q25: string;
    q26: string;
    q27: string;
    q28: string;
    q29: string;
    q30: string;
    q31: string;
    q32: string;
    q33: string;
    q34: string;
    q35: string;
    q36: string;
    q37: string;
    q38: string;
    q39: string;
    q40: string;
    q41: string;
    q42: string;
    q43: string;
    q44: string;
    q45: string;
    q46: string;
    q47: string;
    q48: string;
    q49: string;
    q50: string;
}

const enterpriseDataNullState = {
    step: 0,
    // Contact Data
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    // Access Data
    password: '',
    passwordConfirmation: '',
    // About the enterprise
    enterpriseName: '',
    location: '',
    city: '',
    state: '',
    country: '',
    address: '',
    addressNumber: 0,

    // Enterprise Social Media
    instagram: '',
    facebook: '',
    website: '',

    partyMainFocus: '',
    serviceDescription: '',
    enterpriseCategory: '',
    enterpriseSpecificCategory: '',

    photos: [],

    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    q16: '',
    q17: '',
    q18: '',
    q19: '',
    q20: '',
    q21: '',
    q22: '',
    q23: '',
    q24: '',
    q25: '',
    q26: '',
    q27: '',
    q28: '',
    q29: '',
    q30: '',
    q31: '',
    q32: '',
    q33: '',
    q34: '',
    q35: '',
    q36: '',
    q37: '',
    q38: '',
    q39: '',
    q40: '',
    q41: '',
    q42: '',
    q43: '',
    q44: '',
    q45: '',
    q46: '',
    q47: '',
    q48: '',
    q49: '',
    q50: ''
}


export default function RegisterEnterprise() {
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>( enterpriseDataNullState );
    const routerNext = useRouter();
    const { registerEnterprise } = useEnterpriseAuthContext();
    const [preview, setPreview] = useState([]);
    const [menuWhere, setMenuWhere] = useState('none');

    function handleFileChange( event: any ) {
        console.log( 'event files images' );
        console.log( event.currentTarget.files );
        setPreview(Array.from(event.currentTarget.files));
        setEnterpriseData({...enterpriseData, [event.currentTarget.name]: [...event.currentTarget.files]});
    }

    function handleChange( event: any ) {
        setEnterpriseData({...enterpriseData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( enterpriseData );
    }

    // Used in Menu search
    function searchFunction( event: any, menuId: string ) {
        console.log( event.currentTarget.value );
        let inputValue = event.currentTarget.value.toUpperCase();
        let menu = document.getElementById( menuId );
        let itemList = menu.getElementsByTagName("button");
        
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].innerHTML.toUpperCase().indexOf(inputValue) > -1) {
                itemList[i].style.display = "";
            } 
            else {
                itemList[i].style.display = "none";
            }
        }
    }

    async function handleSubmit( event: any ) {
        event.preventDefault();
        console.log('entrou no submit!');

        const formData = new FormData;
    
        await Object.keys(enterpriseData).forEach((key:any) => {
            if(key == 'photos') {
                console.log('entrou no photos object key');
                for(let i = 0; i < enterpriseData[key].length; i++) {
                    formData.append('photos', enterpriseData[key][i]);
                }
            }
            else {
                formData.append(key, enterpriseData[key]);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        })

        console.log( formData.values );
        registerEnterprise( formData );
    }

    function nextStep() {
        setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
    }
    function previousStep() {
        // Reseta as respostas das perguntas específicas sobre cada segmento
        if( enterpriseData.step == 10 ) {
            setEnterpriseData({...enterpriseData, step: enterpriseData.step - 1, q1: '',q2: '',q3: '',q4: '',q5: '',q6: '',q7: '',q8: '',q9: '',q10: '',q11: '',q12: '',q13: '',q14: '',q15: '',q16: '',q17: '',q18: '',q19: '',q20: '',q21: '',q22: '',q23: '',q24: '',q25: '',q26: '',q27: '',q28: '',q29: '',q30: '',q31: '',q32: '',q33: '',q34: '',q35: '',q36: '',q37: '',q38: '',q39: '',q40: '',q41: '',q42: '',q43: '',q44: '',q45: '',q46: '',q47: '',q48: '',q49: '',q50: ''});
        }
        else if( enterpriseData.step > 0) {
            setEnterpriseData({...enterpriseData, step: enterpriseData.step - 1});
        }
    }

    switch( enterpriseData.step ) {

        case 0:
            return (
                <RegisterFormLayout 
                    question="Seja bem-vindo ao Cadastro Gratuito do Festafy!"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={false}
                    style="yellow"
                >
                    <Flex direction='column'
                        alignItems='center'
                    >
                        <Text
                            fontWeight={500}
                            fontSize={30}
                        >
                            Fique visível para centenas de clientes!
                        </Text>
                        <Button 
                            mt='10'
                            bg='brand.red' color='white'
                            onClick={nextStep}
                            fontSize={24}
                            p='7'
                            w='60%'
                        >
                            Começar cadastro!
                        </Button>
                    </Flex>
                
                </RegisterFormLayout>
            );
        
        {/* Dados de Contato */}
        case 1:
            return (
        
                <RegisterFormLayout 
                    question="Dados de contato"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    style='dark'
                >
                    <Stack direction='column' spacing={4} w='50%'>
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Nome completo"
                            />
                            <Input type='text' name='fullName' onChange={handleChange}
                                value={enterpriseData.fullName}
                            />
                        </Flex>

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="E-mail"
                            />
                            <Input type='email' name='email' onChange={handleChange} 
                                value={enterpriseData.email}
                            />
                        </Flex>

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Telefone/Celular"
                            />
                            <Input type='number' name='phone' 
                                value={enterpriseData.phone} onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="WhatsApp"
                            />
                            <Input type='number' name='whatsapp' 
                                value={enterpriseData.whatsapp} onChange={handleChange} 
                            />
                        </Flex>                        
                    </Stack>
                </RegisterFormLayout>
            );

        
        {/* Dados de Acesso */}
        case 2:
            return (
                <RegisterFormLayout 
                    question="Dados de acesso"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    style='dark'
                >
                    <Stack direction='column' spacing={4} w='50%'>
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Usuário - Email cadastrado na página anterior"
                            />
                            <Input type='text' value={enterpriseData.email}
                                disabled={true} 
                            />
                        </Flex>
                        
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Senha"
                            />
                            <Input type='password' name='password' 
                                value={enterpriseData.password} 
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Confirme a sua senha"
                            />
                            <Input type='password' name='passwordConfirmation' 
                                value={enterpriseData.passwordConfirmation}    
                                onChange={handleChange} 
                            />
                        </Flex>                        
                    </Stack>
                </RegisterFormLayout>
            );

        {/* Dados da empresa */}
        case 3:
            return (
                <RegisterFormLayout 
                    question="Sobre a sua empresa"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    style='dark'
                >
                    <Stack direction='column' spacing={4} w='50%'
                        as='form'
                        autoComplete='off'
                    >
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Nome da empresa"
                            />
                            <Input type='text' name='enterpriseName' 
                                value={enterpriseData.enterpriseName}
                                onChange={handleChange} 
                                autoCapitalize="off"
                            />
                        </Flex>

                        <Flex direction='column'
                        >
                            <TextSpanInput
                                textToShow="Localização da empresa"
                            />
                            {/* Onde - Localização */}
                            <Input 
                                _focus={{outline:'none'}}
                                value={enterpriseData.location}
                                onChange={(event: any) => {
                                    setEnterpriseData({...enterpriseData, location: event.currentTarget.value});
                                    searchFunction(event, "menuWhere");
                                }}
                                onClick={() => {
                                    setMenuWhere('onclick')
                                }}
                            />
                            <Box 
                                height={230} 
                                width={350}
                                display={menuWhere}
                                position='absolute'
                                overflowY="scroll"
                                bg='brand.white'
                                mt={20}
                                borderRadius={10}
                                zIndex={3}
                            >
                                <Flex direction="column" id="menuWhere"
                                    h='100%'
                                >
                                    {
                                    Object.values(locationMap).map((el, i) => {
                                        return(
                                            <Button
                                                bg='white'
                                                h='25%'
                                                py='4'
                                                px='5'
                                                borderRadius={0}
                                                _focus={{outline:'none'}}
                                                _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                //name='partyType'
                                                //value={el.value}
                                                onClick={(event) => {
                                                    setEnterpriseData({...enterpriseData, location: el.textToShow, city: el.city, state: el.state, country: el.country})
                                                    setMenuWhere('none');
                                                }}
                                            >
                                                <Text
                                                    width='100%'
                                                    textAlign='left'
                                                    fontWeight={400}
                                                    fontSize={18}
                                                >
                                                    {el.textToShow}
                                                </Text>
                                            </Button>
                                        );
                                    })
                                    }
                                </Flex>
                            </Box>
                        </Flex>                        

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Endereço"
                            />
                            <Input type='text' name='address'
                                value={enterpriseData.address} 
                                onChange={handleChange} 
                            />
                        </Flex>
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Número de endereço"
                            />
                            <Input type='number' name='addressNumber' 
                                value={enterpriseData.addressNumber}
                                onChange={handleChange} 
                            />
                        </Flex>
                    </Stack>
                </RegisterFormLayout>
            );

        case 4:
            return (
                <RegisterFormLayout 
                    question="Redes sociais da sua empresa"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    style='dark'
                >
                    <Stack direction='column' spacing={4} w='50%'>
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Instagram"
                            />
                            <Input type='text' name='instagram' 
                                value={enterpriseData.instagram}
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Facebook"
                            />
                            <Input type='text' name='facebook' 
                                value={enterpriseData.facebook}
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Site Próprio"
                            />
                            <Input type='text' name='website' 
                                value={enterpriseData.website}
                                onChange={handleChange}
                            />
                        </Flex>

                    </Stack>
                </RegisterFormLayout>
            );

        case 5:
            return (
                <RegisterFormLayout 
                    question="Qual é o principal tipo de festa que você atende ?"
                    subTitle="Caso atenda mais de uma opção, fique tranquilo. Você
                    poderá criar mais anúncios depois de concluir o cadastro. "
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction="column"
                        spacing={5}
                    >
                        {
                        Object.values(typeOfParties).map((el, i) => {
                            return(
                                
                                <ItemList
                                    styleType={2}
                                    name="partyMainFocus"
                                    textToShow={el.textToShow}
                                    value={el.value}
                                    selectedName={enterpriseData.partyMainFocus}
                                    handleOnClick={handleChange}
                                />
                                
                                
                            );
                        })
                        }
                    </Stack>
                </RegisterFormLayout>        
            );

        case 6:
            return (
                <RegisterFormLayout 
                    question="Descrição dos seus serviços"
                    subTitle="Descreva em detalhes todos os serviços e produtos
                    oferecidos por você referente a festa principal escolhida no 
                    item anterior (Infatil, Debutante, ...)."
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Flex direction='column' w='50%'>
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Descrição"
                            />
                            <Textarea h={300} resize='none' name='serviceDescription'
                                onChange={handleChange} 
                            />
                        </Flex>

                    </Flex>
                </RegisterFormLayout>
            );

        case 7:
            return (
                <RegisterFormLayout 
                    question="Qual a categoria de atuação da sua empresa ?"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction="column"
                        spacing={5}
                    >
                        {
                        Object.values(enterpriseCategory).map((el, i) => {
                            return(
                                <ItemList
                                    styleType={2}
                                    name="enterpriseCategory"
                                    value={el.value}
                                    textToShow={el.textToShow}
                                    description={el.description}
                                    selectedName={enterpriseData.enterpriseCategory}
                                    handleOnClick={handleChange}
                                />
                            );
                        })
                        }
                    </Stack>


                </RegisterFormLayout>
            );

        case 8:
            return (
                <RegisterFormLayout 
                    question="Qual o setor de atividade da empresa ?"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction="column" 
                        spacing={5} 
                        alignItems='center'
                        justifyContent='center'
                        flexWrap='wrap'
                        w='80%' h='80vh'
                    >
                        {
                        enterpriseSpecificCategory[enterpriseData.enterpriseCategory]
                        .map((el, i) => {
                            return(
                                <ItemList
                                    styleType={2}
                                    width='40%'
                                    name="enterpriseSpecificCategory"
                                    textAlign='center'
                                    value={el.value}
                                    textToShow={el.textToShow}
                                    selectedName={enterpriseData.enterpriseSpecificCategory}
                                    handleOnClick={handleChange}
                                />
                            );
                        })
                        }
                    </Stack>


                </RegisterFormLayout>
            );

        case 9:
            return (
                <RegisterFormLayout 
                    question="Inclua aqui as fotos do seu serviço"
                    subTitle="Escolha aquelas relacionadas com o evento 
                    Festa Infantil"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Flex direction='column' alignItems='center'>
                        <Flex w='100%'
                            justifyContent='center'
                        >
                            <Input
                                w='60%'
                                type='file'
                                name='photos'
                                onChange={handleFileChange}
                                multiple={true}
                            />
                        </Flex>

                        <Flex 
                            w='100%' 
                            mt='5'
                            mx='1'
                            h={700}
                            alignItems='center'
                            justifyContent='center'
                            flexWrap='wrap'
                            overflowY='scroll'
                        >
                            {
                                preview.length > 0
                                ?
                                preview.map((image, index) => (
                                    <Flex 
                                        position='relative'
                                        h='18vw'
                                        w='23vw'
                                        mx='2'
                                        my='2'
                                    >
                                        <Image 
                                            src={URL.createObjectURL(image)} 
                                            key={`${enterpriseData.enterpriseName}
                                            +${index}`} 
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </Flex>    
                                ))
                                :
                                <></>
                            }
                        </Flex>

                    </Flex>

                </RegisterFormLayout>

            );

        case 10:
            return (
                <RegisterFormLayout 
                    question={`Perguntas frequentes sobre ${enterpriseSpecificCategoryDict[enterpriseData.enterpriseSpecificCategory]}`}
                    subTitle="Responda essas perguntas para facilitar o 
                    entendimento do cliente sobre os seus serviços"
                    lastStep={true}
                    handleNextStep={handleSubmit}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction='column' 
                        justifyContent='flex-start'
                        spacing={5}
                        alignItems='center'
                        overflowY='scroll'
                        w='100%'
                        h='90%'
                        //overflowWrap='wrap'
                    >
                        {
                        enterpriseData.enterpriseCategory == 'Espaco'
                        ?
                        specificQuestions['Espaco']
                        .map((el, index) => {
                            // POSSUI BUFFET JUNTO COM O ESPAÇO
                            if( enterpriseData.q3 == 'Sim' && 
                                (
                                ['q21','q22','q23'].includes(el?.name[0])
                                ||
                                ['q21','q22','q23'].includes(el?.name[1])
                                ) ) 
                            {
                                console.log('entrou no sim');
                                console.log(el.name);
                                
                                
                                return (
                                    <>
                                    </>
                                );
                            }
                            // SEM BUFFET JUNTO COM O ESPAÇO
                            else if(enterpriseData.q3 == 'Não' && 
                                (
                                ['q5','q6','q7','q8','q9','q10','q11','q12','q13','q14',
                                'q15','q16','q17','q18','q19','q20'].includes(el?.name[0]) 
                                ||
                                ['q5','q6','q7','q8','q9','q10','q11','q12','q13','q14',
                                'q15','q16','q17','q18','q19','q20'].includes(el?.name[1]) 
                                )
                                ) 
                            {
                                return (
                                    <>
                                    </>
                                );
                            }
                            // NÃO SABE SE TEM OU NÃO BUFFET
                            else {
                                return (
                                    <Flex direction='column' bg='white'
                                        w='60%'  p='5'
                                        justifyContent='center'
                                        boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                        borderRadius={8} 
                                    >
                                        <Text 
                                            fontSize={22}
                                            mb='3'
                                        >
                                            {el.question}
                                        </Text>
    
                                        {/* RADIO */}
                                        {
                                            el.type == 'radio'
                                            ?
                                            <Flex direction='column'>
                                                <Flex
                                                    justifyContent='space-evenly'
                                                    mb='4'
                                                >
                                                    {
                                                        el.options.map((element, index) => {
                                                            return (
                                                                <ItemList
                                                                    styleType={2}
                                                                    width='40%'
                                                                    name={el.name[0]}
                                                                    textAlign='center'
                                                                    value={element}
                                                                    textToShow={element}
                                                                    selectedName={enterpriseData?.[el.name[0]]}
                                                                    handleOnClick={handleChange}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </Flex>
    
                                                <Textarea name={el.name[1]} 
                                                    placeholder={el.placeholder}
                                                    value={enterpriseData?.[el.name[1]]}
                                                    onChange={handleChange} 
                                                />
                                            </Flex>
                                            :
                                            <>
                                            </>
                                        }
    
                                        {/* TEXTAREA */}
                                        {
                                            el.type == 'textarea'  
                                            ?
                                            <Flex direction='column'>
                                                <Textarea 
                                                    name={el.name[0]} 
                                                    placeholder={el.placeholder}
                                                    value={enterpriseData?.[el.name[0]]}
                                                    onChange={handleChange} 
                                                />
                                            </Flex>
                                            :
                                            <>
                                            </>
                                        }       
    
                                        {/* INPUT */}
                                        {
                                            el.type == 'input'  
                                            ?
                                            <Flex direction='row'
                                                alignItems='center'
                                                //justifyContent='center'
                                            >
                                                {
                                                    el.span
                                                    ?
                                                    <Text as='span' mr='2'
    
                                                    >
                                                        {el.span}
                                                    </Text>
                                                    :
                                                    <>
                                                    </>
                                                }
                                                <Input 
                                                    name={el.name[0]} 
                                                    type={el.inputType}
                                                    width='40%'
                                                    value={enterpriseData?.[el.name[0]]}
                                                    onChange={handleChange} 
                                                />
                                            </Flex>
                                            :
                                            <>
                                            </>
                                        }       
    
                                    </Flex>
                                )
                            }
                        })
                        :
                        specificQuestions['Servico'][enterpriseData.enterpriseSpecificCategory]
                        .map((el, index) => {
                            return (
                                <Flex direction='column' bg='white'
                                    w='60%'  p='5'
                                    justifyContent='center'
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    borderRadius={8} 
                                >
                                    <Text 
                                        fontSize={22}
                                        mb='3'
                                    >
                                        {el.question}
                                    </Text>

                                    {/* RADIO */}
                                    {
                                        el.type == 'radio'
                                        ?
                                        <Flex 
                                            direction='column'
                                        >
                                            <Stack
                                                justifyContent='space-evenly'
                                                alignItems='center'
                                                mb='4'
                                                direction={el.options.length < 3 ? 'row' : 'column'}
                                            >
                                                {
                                                    el.options.map((element, index) => {
                                                        return (
                                                            <ItemList
                                                                styleType={2}
                                                                width={el.options.length < 3 ? '40%' : '70%'}
                                                                name={el.name[0]}
                                                                textAlign='center'
                                                                value={element}
                                                                textToShow={element}
                                                                selectedName={enterpriseData?.[el.name[0]]}
                                                                handleOnClick={handleChange}
                                                            />
                                                        )
                                                    })
                                                }
                                            </Stack>

                                            <Textarea name={el.name[1]} 
                                                placeholder={el.placeholder}
                                                value={enterpriseData?.[el.name[1]]}
                                                onChange={handleChange} 
                                            />
                                        </Flex>
                                        :
                                        <>
                                        </>
                                    }

                                    {/* TEXTAREA */}
                                    {
                                        el.type == 'textarea'  
                                        ?
                                        <Flex direction='column'>
                                            <Textarea 
                                                name={el.name[0]} 
                                                placeholder={el.placeholder}
                                                value={enterpriseData?.[el.name[0]]}
                                                onChange={handleChange} 
                                            />
                                        </Flex>
                                        :
                                        <>
                                        </>
                                    }       

                                    {/* INPUT */}
                                    {
                                        el.type == 'input'  
                                        ?
                                        <Flex direction='row'
                                            alignItems='center'
                                            //justifyContent='center'
                                        >
                                            {
                                                el.span
                                                ?
                                                <Text as='span' mr='2'

                                                >
                                                    {el.span}
                                                </Text>
                                                :
                                                <>
                                                </>
                                            }
                                            <Input 
                                                name={el.name[0]} 
                                                type={el.inputType}
                                                width='40%'
                                                value={enterpriseData?.[el.name[0]]}
                                                onChange={handleChange} 
                                            />
                                        </Flex>
                                        :
                                        <>
                                        </>
                                    }       

                                </Flex>
                            )
                        })
                        }
                        
                    </Stack>

                </RegisterFormLayout>

            );

        default:
            return (
                <Box>
                    default
                </Box>
            );
    }

}