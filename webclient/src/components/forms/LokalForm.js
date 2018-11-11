import React from "react";
import { Form, FormGroup, Button, Input } from 'reactstrap';

class LokalForm extends React.Component {
  state = {
    data: {
      id: this.props.lokal.id,
      nazwaLokalu: this.props.lokal.nazwaLokalu,
      poziom: this.props.lokal.poziom
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      console.log(this.state.data)
      const that=this
      setTimeout(()=>that.setState({loading: false}), 3000)
      // this.props
      //   .submit(this.state.data)
      //   .catch(err =>
      //     this.setState({ errors: err.response.data.errors, loading: false })
      //   );
    }
  };

  validate = data => {
    const errors = {};

    if (!data.id) errors.id = "Id lokalu nie może byc puste";
    if (!data.nazwaLokalu) errors.nazwaLokalu = "Nazwa lokalu nie może byc pusta";
    if (!data.poziom) errors.poziom = "Pole poziom może byc puste";
    if (data.poziom!=="parter" && data.poziom!=="pietro") errors.poziom = "Dozwolone wartości to parter albo pietro"

    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <Form inline onSubmit={this.onSubmit}>
          <FormGroup className="m-1">
            {/* <label htmlFor="id">Id</label> */}
            <Input
              type="id"
              id="id"
              name="id"
              value={data.id}
              onChange={this.onChange}
              className={
                errors.id ? "form-control is-invalid" : "form-control"
              }
            />
          </FormGroup>

          <FormGroup className="m-1">
            {/* <label htmlFor="nazwaLokalu">nazwa</label> */}
            <Input
              type="text"
              id="nazwaLokalu"
              name="nazwaLokalu"
              value={data.nazwaLokalu}
              onChange={this.onChange}
              className={
                errors.nazwaLokalu ? "form-control is-invalid" : "form-control"
              }
            />
          </FormGroup>

          <FormGroup className="m-1">
            {/* <label htmlFor="poziom">poziom</label> */}
            <Input
              type="poziom"
              id="poziom"
              name="poziom"
              value={data.poziom}
              onChange={this.onChange}
              className={
                errors.poziom ? "form-control is-invalid" : "form-control"
              }
            />
          </FormGroup>

          <Button >
            Zapisz zmiany
          </Button>
            <div >{errors.id}</div>
            <div>{errors.poziom}</div>
            <div>{errors.nazwaLokalu}</div>
        </Form>
        
    </div>

    );
  }
}

export default LokalForm;
