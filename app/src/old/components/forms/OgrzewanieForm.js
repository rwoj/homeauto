import React from "react"
import PropTypes from 'prop-types'

class OgrzewanieForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            initTempNastawy: 0,
            tempNastawy: 0,
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.lokal.tempNast!==this.state.initTempNastawy){
            this.setState(
                {tempNastawy: nextProps.lokal.tempNast, initTempNastawy: nextProps.lokal.tempNast})
        }
    }

    
    onChange = e =>
    this.setState({
        [e.target.name]: e.target.value
    });

    increase = () =>
        this.setState({
            tempNastawy: Number(this.state.tempNastawy)+0.5
        })

    decrease = () =>
    this.setState({
        tempNastawy: Number(this.state.tempNastawy)-0.5
    })

    render(){
        const {lokal, zapisz}=this.props
        // console.log("form2 : ", tempNast, idTempNast)
        
        return (
        <div className='ogrzewanie'>
            <div className='nazwa'> {lokal.nazwa}</div>
            <div className={lokal.ogrzewanie===0?'grzanie-zero': 'grzanie-one'}>  {lokal.ogrzewanie}</div>
            <div className='temperatura'> {lokal.temp}</div>
            <div className='temperatura-init-nastawa'> {lokal.tempNast}</div>
            {lokal.tempNast>0 &&
                <input className='temperatura-nastawy' 
                    type='text' 
                    name='tempNastawy'
                    value={this.state.tempNastawy}
                    onChange={this.onChange}
                />
            }
            {lokal.tempNast>0 &&
                <div className='buttony-nastawy'>
                    <button onClick={this.increase}>+</button> 
                    <button onClick={this.decrease}>-</button>
                    <button onClick={()=>zapisz(lokal.idTempNast, this.state.tempNastawy)}>OK</button>  
                </div>  
            }
        </div>
        )
    }
}
OgrzewanieForm.propTypes={
    lokal: PropTypes.shape({
        tempNast: PropTypes.string.isRequired,
    }).isRequired, 
    zapisz: PropTypes.func.isRequired,
}

export default OgrzewanieForm
