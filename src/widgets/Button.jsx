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
    {
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
         mt={mt || '1.2em'} borderRadius={ borderRadius ||'5px'} {...isFull}  {...variantProps} 
         h={ h || '50px'} px={{ base:w || '2em', lg:px || '4em' }}   {...rest} >
            {children}
        </Button>       
    )
}


export default Btn;