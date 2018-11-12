import React from 'react'

class OgrzewanieForm extends React.Component {
    state={
        initTempNastawy: 0,
        tempNastawy: 0,
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.item.tempNast!==this.state.initTempNastawy){
            this.setState(
                {tempNastawy: nextProps.item.tempNast, initTempNastawy: nextProps.item.tempNast})
        }
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value })
    increase = () => this.setState({tempNastawy: Number(this.state.tempNastawy)+0.5})
    decrease = () => this.setState({ tempNastawy: Number(this.state.tempNastawy)-0.5})

    render(){
        const {tempNastawy} = this.state
        const {item, zapisz} = this.props

        return (
        <div>
            {item.nazwa} {item.temp}
            {item.tempNast!==''&& <span>    
                <button onClick={this.decrease}>
                    -
                </button>
                {tempNastawy}
                <button onClick={this.increase}>
                    +
                </button>
                <button onClick={()=>zapisz(item.idTempNast, this.state.tempNastawy)}>
                    OK
                </button>
                {item.tempNast}
            </span>}
            {item.ogrzewanie===1 && '!'}    
        </div>    
    )}
}
export default OgrzewanieForm
