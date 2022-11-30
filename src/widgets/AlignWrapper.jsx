import styled from "styled-components"





const AlignWrapper = ({children,left,right,className,...rest})=>{

    return (
        <div className={className} {...rest}>
            {children}
        </div>
    )

}


export default styled(AlignWrapper)`
    ${props=>{
        const paddingType = `padding${props.left?'-left':props.right?'-right':''}:`
        return(
            `
            ${paddingType}: 0 5rem;

            @media (max-width: 768px) {
                ${paddingType}: 0 3rem;
            }

            @media (max-width: 450px) {
                ${paddingType}: 0 2rem;
            }`
        )
    }
    }
    


`