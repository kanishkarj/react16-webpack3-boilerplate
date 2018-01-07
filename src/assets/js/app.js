import '../scss/app.scss';
// import 'font-awesome-webpack-sass';
// import mindBlown from '../assets/mind-blown.gif'
//
// import '../css/base.less';

export default class Hello extends Component {
  render() {
    return (
      <div>
        <h1>Hello from React fibre!</h1>
      </div>
    );
  }
}

render(<Hello />, document.getElementById('root'));
