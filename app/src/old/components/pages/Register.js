import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {wyjsciaSelector, wySatelSelector, wyTempSelector} from '../../reducers/register'
import {swiatlaRejestrOpisSelector} from '../../reducers/ustawienia'

class Register extends React.Component{
  state = {
    liczbaZapalonychSwiatel: 0,
  }
  componentWillReceiveProps(){
    this.setState({liczbaZapalonychSwiatel: 
      this.policzZapaloneSwiatla(this.props.swiatla,this.props.wyjscia)})
  }
  
  policzZapaloneSwiatla = (swiatla, wyjscia)=> {
    // console.log(swiatla, wyjscia)
    return swiatla.reduce((iloscSwiatel, swiatlo)=>{
      const wyFound=wyjscia.find(x=>x.id===swiatlo.adres)
      const stan=wyFound?wyFound.value:0
      return iloscSwiatel+stan
    }, 0)
  }

  render(){
    const {liczbaZapalonychSwiatel} = this.state
    const {wyjscia, wySatel, wyTemp} = this.props

    const wyTempList = wyTemp.length===0? <li>loading...</li> :
    wyTemp.map( (x)=>(
      <li key={x.id}> adres: {x.id} value: {x.value} </li>
    ))

    const wyjsciaList = wyjscia.length===0? <li>loading...</li> :
      wyjscia.map( (x)=>(
        <li key={x.id}> adres: {x.id} value: {x.value} </li>
      ))

    const wySatelList = wySatel.length===0? <li>loading...</li> :
    wySatel.map( (x)=>(
      <li key={x.id}> adres: {x.id} value: {x.value} </li>
    ))
    
    return (
      <div>
      <p>Swiatel: {liczbaZapalonychSwiatel} </p>
      <ul>
        {wyTempList}
        {wyjsciaList}
        {wySatelList}
      </ul>
      </div>
    )
  }
}

Register.propTypes = {
  swiatla: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  wySatel: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  wyjscia: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
  wyTemp: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
}

function mapStateToProps (state){
  return {
    wyjscia: wyjsciaSelector(state), 
    wySatel: wySatelSelector(state),
    wyTemp: wyTempSelector(state), 
    swiatla: swiatlaRejestrOpisSelector(state), 
  }
}

export default connect(mapStateToProps)(Register)