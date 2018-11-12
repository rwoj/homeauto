// import React from 'react'
// import PropTypes from "prop-types";
// import { Container, Row, Button} from 'reactstrap'
// import {connect} from 'react-redux'
// import LokalForm from '../forms/LokalForm'
// import RejestrOpisForm from '../forms/RejestrOpisForm'
// // import {zmienKonfiguracja} from '../../actions/ustawienia'
// import {lokaleSelector, rejestrOpisSelector} from '../../reducers/ustawienia'

// class Konfiguracja extends React.Component{
//   state={
//     czyLokale: false
//   }
//   przelacz = ()=> this.setState({czyLokale: !this.state.czyLokale})
//   render(){
//     const {czyLokale}=this.state
//     const {lokale, rejestrOpis} = this.props
//     const lokaleForm=lokale.map((lokal) => <LokalForm key={lokal.id} lokal={lokal}/>)
//     const rejestrOpisForm=rejestrOpis.map((rejOpis) => 
//         <RejestrOpisForm key={rejOpis.id} rejOpis={rejOpis}/>)
    
//     return (
//       <Container>Przelacz pomiedzy Lokale/Opis rejestru:
//       <Button onClick={this.przelacz}>{czyLokale?'Lokale':'Opis rejestru'}</Button>
//         {czyLokale && <Row> (Id lokalu, Nazwa Lokalu, pietro) </Row>} 
//         {czyLokale && lokaleForm}
//         {!czyLokale && <Row> (adres, nazwa, rodzaj | nazwa zmiennej | rejestr | ster/wy) </Row>} 
//         {!czyLokale && rejestrOpisForm}
//       </Container>
//     )}
// }
// Konfiguracja.propTypes = {
//   lokale: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     nazwaLokalu: PropTypes.string,
//     pietro: PropTypes.string
//   })).isRequired, 
//   rejestrOpis: PropTypes.arrayOf(PropTypes.shape({
//     adres: PropTypes.number,
//     nazwa: PropTypes.string
//   })).isRequired
// }

// function mapStateToProps (state){
//   return {
//     lokale: lokaleSelector(state),
//     rejestrOpis: rejestrOpisSelector(state)
//   }
// }

// export default connect(mapStateToProps, {zmienKonfiguracja})(Konfiguracja)
