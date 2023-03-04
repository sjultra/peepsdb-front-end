import { Button } from "@chakra-ui/react"



const Btn = ({variant,w,p,children,loading,h,onClick,mt,px,fontSize,borderRadius,full,...rest})=>{

    const variantProps = variant==='secondary'?{
        border:'1px solid var(--primary-color)',
        color:'var(--primary-color)',
        _focus:{
            border:'1px solid var(--primary-color)',
            color:'var(--primary-color)',
        }
    }:
    variant==='fade'?{
        background:'#FAFAFA',
        color:'var(--primary-color)',
        _focus:{
            border:'1px solid #FAFAFA',
            color:'var(--primary-color)'
        }
    }:
    variant==='blank'?
    {
        bg:'transparent',
        p:'0 !important',
        _focus:{
            bg:'transparent',
        },
        _hover:{
            bg:'transparent',
        }

    }:{
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

    const isFull = full?{
        w:'full'
    }:{}

    return(
        <Button isLoading={loading || false} onClick={onClick} fontSize={fontSize|| '15px'} 
         mt={mt || 0 } borderRadius={ borderRadius ||'5px'} {...isFull}   
         h={ h || '40px'} px={{ base:w || '2em', lg:px || '4em' }} {...variantProps}  {...rest} >
            {children}
        </Button>       
    )
}


export default Btn;