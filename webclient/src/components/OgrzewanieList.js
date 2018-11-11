import React from 'react'
import OgrzewanieForm from './OgrzewanieForm';

class OgrzewanieList extends React.Component {
    render(){
        const {currentTemps, zapisz} = this.props
        // console.log(currentTemps)

        const ogrzewanieList = currentTemps.map(poziom=>
            poziom.data.map(item=>
                <OgrzewanieForm key={item.id} item = {item} zapisz={zapisz} />
            )
        )

        return (
            <div>
                {ogrzewanieList}
            </div>
    )}
}
export default OgrzewanieList