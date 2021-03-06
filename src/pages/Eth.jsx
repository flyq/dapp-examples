import React from "react";
// import NasId from "../api/nasid";
import { Button , Col} from "antd";
import intl from "react-intl-universal";
import getcontract from "../api/counterbackend.js";
import NasId from "../api/nasid";
import contractoption from "../api/contractoption.js"
import "nasa.js";
const contract = contractoption.nebulas_nub.address;



const backgroundImg = 'https://i.loli.net/2018/07/16/5b4c4a832a920.jpg'
// const contract = 'n1vhZgBFYt7AE6nP3VFap9c67VPqn1eFoTi'
const contractAddr = 'https://explorer.nebulas.io/#/testnet/address/n1vhZgBFYt7AE6nP3VFap9c67VPqn1eFoTi'
const buttonStyle = {
    margin: "0.5rem"
}
const colStyle = {
    padding: '0 10px'
}
const bannerStyle = {
    padding: `6rem`,
    color: `#fafafa`,
    width: "100%", minHeight: "48rem",
    background: `url(${backgroundImg})`, backgroundSize: 'cover'
}
const number = {
    width: '150px',
    height: '150px',
    backgroundColor: 'darksalmon'
}

function BuyEvent(e) {
    var args = []
    var option = {}
    window.Nasa.call(contract, "inc", args, option)
        .then((payId) => {
            setTimeout(() => {
            }, 5000)
        })
        .catch((e) => {
            let msg = e.message
            if (msg === window.Nasa.error.TX_REJECTED_BY_USER) {
                msg = intl.get("homepage.tx_rejected_msg");
            }
            alert(msg)
        })
}

class Eth extends React.Component {
    constructor() {
        super();    
        this.state = {
            counter: null
        };
    }

    async fetchDataFromNebulas() {
        const counter = (await window.Nasa.query(contract, "get", [])).toString()
        return { counter }
    }

    async componentDidMount() {
        const {
            counter
        } = await this.fetchDataFromNebulas()
        this.setState({
            counter
        })
    }    

    render() {
        const {
            counter
        } = this.state        
        return (
            <div className="index-page" style={{ marginTop: "-64px" }}>
                <div className="banner" style={bannerStyle}>
                    <div>
                        <a href={contractAddr}>合约地址：{contract}</a>

                        <Col span="5" style={colStyle}>
                        <Button type="primary" size="large" style={buttonStyle} onClick={BuyEvent}>
                        点击加数字
                        </Button>
                        <div className="custom-card">
                            {counter?(counter.substr(0,counter.length>15?15:counter.length)):0}
                        </div>
                    </Col>
                    </div>                    
                </div>
                
            </div>
            
        );
    }
};

export default Eth;