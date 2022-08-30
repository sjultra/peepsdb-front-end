import { Button } from "@chakra-ui/react"



const Btn = ({variant,w,children,loading,onClick,mt,fontSize,...rest})=>{

    const variantProps = variant==='secondary'?{
        border:'1px solid var(--primary-color)',
        color:'var(--primary-color)',
        _focus:{
            border:'1px solid var(--primary-color)',
            color:'var(--primary-color)',
        }
    }
    :{
        bg:'var(--primary-color)',
        color:'white',
        _focus:{
            bg:'var(--primary-color)',
            color:'white',
        },
        _hover:{
            bg:'var(--primary-color)',
            color:'white',
        }

    }

    return(
        <Button isLoading={loading || false} onClick={onClick} fontSize={fontSize|| '15px'} mt={mt || '1.2em'} borderRadius='12px'  {...variantProps} h='50px' w={w || 'full'}  {...rest} >
            {children}
        </Button>       
    )
}


export default Btn;