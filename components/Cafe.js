import React, { useState } from "react";
import { View, Text, Button } from 'native-base';

const Cat = (props) => {
    const [estaHambriento, setEstaHambriento] = useState(true);
    return (
        <View>
            <Text> Yo soy {props.name}, y estoy {estaHambriento ? "Hambriento" : "Lleno"}!</Text>
            <Button
                colorScheme="primary"
                onPress={() => {
                    console.log('Se presionó el botón')
                    setEstaHambriento(false);
                }}
                isDisabled={!estaHambriento}
            >
                ¿Tiene hambre?
            </Button>
        </View>
    )
}

// const Cafe = ({route}) => {
//     const {name/*email*/} = route.params
//     return (
//         <View>
//             {/* <Cat name="Daniel" lastname="Gtz" /> */}
//             <Cat name={name} />
//             <Cat name="Oscar" />
//         </View>
//     );
// }

export default Cat;
