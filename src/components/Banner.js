import  styled from 'styled-components'
import logo from '../assets/logo-groupomania-orange.png'

const GpmnBanner = styled.div`
    color: black;
    border-bottom: solid 3px  #4E5166;
    display: flex;
    justify-content: center;
    flex-direction: row;
`

const GpmnLogo = styled.img`
    width: 30%;
`


const Banner = () => {
    return (
        <GpmnBanner>
            <GpmnLogo src={logo} alt='logo-groupomania' className='gpmn-logo' />
        </GpmnBanner>
        
    )
}

export default Banner