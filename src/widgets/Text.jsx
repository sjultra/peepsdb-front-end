import { Text } from "@chakra-ui/react"
import PropTypes from 'prop-types'


const TextInput =({variant,color,children,weight})=>{

    let fontSize = variant ==='s1' ? '28px': '18px'

    return(
        <Text as={'h2'} fontWeight={weight || 500} fontSize={fontSize} color={color || 'initial'} >
            {children}
        </Text>
    )
}

TextInput.propTypes = {
    variant: PropTypes.oneOf(['s1','s2']),
    color:PropTypes.string,

}


export default TextInput