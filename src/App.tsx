import { Component } from 'react';
import './App.css';

interface Param {
  id: number;
  name: string;
}
interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}
interface State extends Model {}

class App extends Component {
  render() {
    const params = [
      {
        id: 1,
        name: 'Назначение'
      },
      {
        id: 2,
        name: 'Длина'
      }
    ];

    const model = {
      paramValues: [
        {
          paramId: 1,
          value: 'повседневное'
        },
        {
          paramId: 2,
          value: 'макси'
        }
      ],
      colors: [
        { id: 1, value: 'Красный' },
        { id: 2, value: 'Синий' }
      ]
    };

    return (
      <div className='container pt-5'>
        <ParamEditor params={params} model={model} />
      </div>
    );
  }
}

interface ParamProps {
  item: {
    id: number;
    name: string;
    value: string;
  };
  handleChange: (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class ParamItem extends Component<ParamProps> {
  render() {
    const { id, name, value } = this.props.item;
    const handleChange = this.props.handleChange(id);

    return (
      <div className='row'>
        <label>{name}</label>
        <input type='text' value={value} onChange={handleChange} />
      </div>
    );
  }
}
class ParamEditor extends Component<Props, State> {
  state = { ...this.props.model };

  handleChange = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      paramValues: prevState.paramValues.map(paramValue => {
        if (paramValue.paramId === id) {
          return {
            ...paramValue,
            value: e.target.value
          };
        }
        return paramValue;
      })
    }));
  };

  getModel = () => this.state.paramValues;

  handleClickBtn = () => alert(JSON.stringify(this.getModel()));

  render() {
    return (
      <form className='form'>
        {this.props.params.map(param => {
          const value = this.state.paramValues.find(paramValue => paramValue.paramId === param.id)
            ?.value as string;

          return (
            <ParamItem
              key={param.id}
              item={{ id: param.id, name: param.name, value }}
              handleChange={this.handleChange}
            />
          );
        })}
        <button style={{ marginTop: 25 }} onClick={this.handleClickBtn}>
          Получить model
        </button>
      </form>
    );
  }
}

export default App;
