import React, { useState } from "react";
import { Input, Image, Box, Text, Button, ScrollView, Stack, FormControl } from 'native-base';
import axios from 'axios';

const LoginForm = ({navigation}) => {

    const imgUri = require('../assets/favicon.png')
    const [formData, setformData] = useState({});
    const [errores, setErrores] = useState({});

    var pattern = new RegExp("^(?=,*[a-z])(=?,*[A-Z])(?=,*\\d)(?=,*[+-_!@#$%^&*,.?]),+$")

    const validate = () => {
        if (formData.nombre === undefined) {
            setErrores({
                ...errores,
                nombre: '¡El Nombre es requerido!'
            });
            return false;

        } else if (formData.nombre.length < 3) {
            setErrores({
                ...errores,
                nombre: '¡El Nombre debe ser de más de 3 caracteres!'
            });
            return false;

        }
        if (!formData.pass || formData.pass.length < 8) {
            console.log('pass 1', formData.pass)
            setErrores({ ...errores, pass: 'La Contraseña es requerida' });
            return false;

        } else if (pattern.test(formData.pass)) {
            console.log('pass 2', formData.pass)
            setErrores({ ...errores, pass: 'No es válida' });
            return false;

        }
        setErrores({})
        return true;
    };

    const onSubmit = async () => {
        validate() ? console.log('¡Hecho!, ', formData) :
            console.log('¡Verifica de nuevo! ', errores)
        console.log('formData: ', formData)
        console.log('TipoVa: ', typeof (formData))
        console.log('Nombre: ', formData.nombre)
        console.log('Pass: ', formData.pass)
        setformData({ ...formData, event: 'login' })
        /*console.log('formData: ', formData)*/

        const formDataForRequest = new FormData()
        console.log('TipoRq: ', typeof (formDataForRequest))
        formDataForRequest.append('Nickname: ', formData.nombre)
        formDataForRequest.append('Password: ', formData.pass)
        formDataForRequest.append('Action: ', formData.action)

        const respuesta = await axios.post (
            'http://192.168.100.4:8080/MovilesM/Backnd.php',
            formDataForRequest,
            {
                Headers: {
                    'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*"
                },
                transformRequest: formData => formDataForRequest,
            }
        )
        console.log('typeof: ', typeof (respuesta.data))
        // console.log('Object.keys: ', Object.keys (respuesta.data).length)
        // console.log('Object: ', respuesta.data)
        
        // if ( Object.keys (respuesta.data).length >= 1 )
        // {
        //     console.log ('Email: ', respuesta.data[0].email)
        //     navigaton.navigate('Cafe', {email: respuesta.data[0].email})
        //     console.log('navigation', 'Ok!')
        // }
        // else
        // {
        //     console.log('retry')
        // }

        console.log('Datos de respuesta: ', respuesta)
        if (respuesta.data == 'Ok!') {
            navigation.navigate('Cafe', { name: respuesta.data })
            console.log('navigation', 'Ok!')
        }
        else {
            console.log('retry')
        }

        console.log(respuesta)
    };

    return (
        <ScrollView w="100%">
            <Stack space={3} alignSelf="center" px="4" safeArea mt="12"
                w={{ base: "100%", md: "50%" }}>
                <Text size={20}>Iniciar Sesión</Text>
                <Box>
                    <FormControl isRequired isInvalid={'nombre' in errores}>
                        <FormControl.Label>Nombre de Usuario</FormControl.Label>
                        <Input p={2} placeholder="Ingresa el nombre de usuario..."
                            onChangeText={value => setformData({ ...formData, nombre: value })} />
                        {'nombre' in errores ?
                            <FormControl.ErrorMessage>{errores.nombre}</FormControl.ErrorMessage> :
                            <FormControl.HelperText>
                                El Nombre debe ser de más de 3 caracteres...
                            </FormControl.HelperText>}
                    </FormControl>
                </Box>
                <Box>
                    <FormControl isRequired isInvalid={'pass' in errores}>
                        <FormControl.Label>Contraseña</FormControl.Label>
                        <Input type="password" p={2} placeholder="Contraseña"
                            onChangeText={value => setformData({ ...formData, pass: value })} />
                        {'pass' in errores ?
                            <FormControl.ErrorMessage>{errores.pass}</FormControl.ErrorMessage> :
                            <FormControl.HelperText>
                                La Contraseña debe ser de más de 8 caracteres...
                            </FormControl.HelperText>}
                    </FormControl>
                </Box>
                <Box>
                    <Button colorScheme="primary"
                        onPress={onSubmit}>
                        Ingresar
                    </Button>
                    <Image source={imgUri} alt="Splash" height="10" rounded="3" width="10" />
                    <Image source={{
                        uri: 'https://www.informador.mx/__export/1658261934531/sites/elinformador/img/2022/07/19/balltze_105932259_1023776668139770_2950712250429383177_n_1_crop1658261933866.jpg_1563092755.jpg'
                    }} alt="Pumtepego" height="60" rounded="13" width="60" />
                </Box>
            </Stack>
        </ScrollView>
    )
}

export default LoginForm;