import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { LuLayoutDashboard, LuWarehouse } from "react-icons/lu";
import { IoCartOutline, IoFileTrayFullOutline  } from "react-icons/io5";
import { MdOutlineIntegrationInstructions, MdShoppingCart  } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { FaRegAddressCard, FaTools, FaUserAlt, FaUserTie  } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdMoney } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { Link } from 'react-router-dom'
// import { useAuthContext } from '../../context/AuthContext';

const MenuList = ({darktheme, closeDrawer }) => {
    // const {authUser} = useAuthContext()
    const handleMenuClick = () => {
        if (closeDrawer) {
          closeDrawer();
        }
      };
    return (
       <div style={{overflowY: 'auto', height: 'calc(100% - 80px)'}}>
         <Menu onClick={handleMenuClick} theme={darktheme ? 'dark' : 'light' } mode='inline' className='menu-bar' style={{display:'flex', flexDirection:'column', gap:'1.3rem'}} >
            <Menu.Item key='home' icon={<LuLayoutDashboard size='1.4rem' />} >
                <Link to='/dashboard'><span style={{fontWeight:500}} >Dashboard</span></Link>
            </Menu.Item>
            <Menu.Item key='product' icon={<MdShoppingCart size='1.4rem' />} >
                <Link to='/product'><span style={{fontWeight:500}} >Orders</span></Link>
            </Menu.Item>
            <Menu.Item key='ndr' icon={<IoFileTrayFullOutline size='1.4rem' />} >
            <Link to='/ndr'><span style={{fontWeight:500}} >NDR</span></Link>
            </Menu.Item>

            <Menu.SubMenu key='finance' title='Finance' icon={<MdMoney size='1.6rem' />} >
                <Menu.Item key='cod_remittance'  ><Link to='finance/codremmitance' ><span style={{fontWeight:500}} >COD Remittance</span></Link></Menu.Item>
                <Menu.Item key='wallet'  ><Link to='finance/wallet' ><span style={{fontWeight:500}} >Wallet</span></Link></Menu.Item>
                {/* <Menu.Item key='walletAdmin'  ><Link to='finance/walletadmin' >Wallet Admin</Link></Menu.Item> */}
                <Menu.Item key='lost_damage'  ><Link to='finance/lost_damage' ><span style={{fontWeight:500}} >Lost/Damage Claim</span></Link></Menu.Item>
                <Menu.Item key='weightDiscrepancies'  ><Link to='finance/weight_discrepancies'><span style={{fontWeight:500}} >Weight Discrepancies</span></Link></Menu.Item>
                <Menu.Item key='invoices'  ><Link to='finance/invoices' >Invoices</Link></Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key='warehouse' icon={<LuWarehouse size='1.4rem' />} >
            <Link to='/warehouse'><span style={{fontWeight:500}} >Warehouse</span></Link>
            </Menu.Item>
            <Menu.Item key='rate_card' icon={<LiaRupeeSignSolid size='1.7rem' />} >
            <Link to='/ratecard' ><span style={{fontWeight:500}} >Rate Card</span></Link>
            </Menu.Item>
            <Menu.SubMenu key='tool' title='Tool' icon={<FaTools size='1.4rem'  />} >
                <Menu.Item key='rateCalculator' ><Link to='/ratecalculator' ><span style={{fontWeight:500}} >Rate Calculator</span></Link></Menu.Item>
                {/* <Menu.Item key='label' ><Link to='/label'>Label</Link></Menu.Item> */}
                <Menu.Item key='updLabel' ><Link to='/updatelabel'><span style={{fontWeight:500}} >UpdateLabel</span></Link></Menu.Item>
                <Menu.Item key='pcServiceability' >
                    <Link to='/pincodeservice' ><span style={{fontWeight:500}} >Pin Code Serviceablity</span></Link></Menu.Item>
                <Menu.Item key='channelIntegration' >
                    <Link to='/channelintegration' ><span style={{fontWeight:500}} >Channel Integration</span></Link></Menu.Item>
            </Menu.SubMenu>
            {/* <Menu.SubMenu key='reports' title='Reports' icon={<TbReportSearch  />} >
                <Menu.Item key='misReport' >
                    <Link to='reports/misreport' >Master MIS Report</Link></Menu.Item>
                <Menu.Item key='ndrReport' >
                    <Link  >NDR Report</Link></Menu.Item>
            </Menu.SubMenu> */}
            <Menu.Item key='reports' icon={<TbReportSearch size='1.5rem' />} >
               <Link to='reports/misreport' ><span style={{fontWeight:500}} >Reports</span></Link>
            </Menu.Item>
            {/* <Menu.SubMenu key='support' title='Support' icon={<BiSupport  />} >
                <Menu.Item key='support' >
                <Link to='support' >Support</Link></Menu.Item>
                <Menu.Item key='ticket' >
                    <Link  to='ticket' >Ticket</Link></Menu.Item>
            </Menu.SubMenu> */}
            <Menu.Item key='support' icon={<BiSupport size='1.6rem' />} >
               <Link to='/ticket' ><span style={{fontWeight:500}} >Support</span></Link>
            </Menu.Item>
            <Menu.Item key='setting' icon={<CiSettings size='1.6rem' />} >
            <Link to='/settings' ><span style={{fontWeight:500}} >Setting</span></Link>
            </Menu.Item>
        </Menu>
       </div>
    )
}

export default MenuList
