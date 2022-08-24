import { Text } from "@chakra-ui/react"
import PropTypes from 'prop-types'


const TextInput =({variant,color,children})=>{

    let fontSize = variant ==='s1' ? '28px': '18px'

    return(
        <Text fontSize={fontSize} color={color || 'initial'} >{children}</Text>
    )
}

TextInput.propTypes = {
    variant: PropTypes.oneOf(['s1','s2']),
    color:PropTypes.string,
}


export default TextInput