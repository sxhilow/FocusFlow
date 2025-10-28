import { Logo } from "../../assets"
import { Button } from "../index"


const MobileNavbar = ({toggleSidebar}) => {
  return (
    <div className='border-b border-b-slate-700 flex items-center p-3 gap-3'>

        <Button className='cursor-pointer' onClick={toggleSidebar}>
            <img src={""} alt="Columsn Icon" className="w-8" />
        </Button>

        <div>
            <img src={Logo} alt="crewmate" /> 
        </div>

    </div>
  )
}

export default MobileNavbar