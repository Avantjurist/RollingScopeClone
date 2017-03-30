import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Task extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    const {name, time, onClickLeft, onClickRight} = this.props;
    return (
      <div>
        <div>{name}</div>
        <div>{time}</div>
        <button onClick={onClickLeft}>left</button>
        <button onClick={onClickRight}>right</button>
      </div>
    )
  }
}

class List extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    const {taskList, moveToLeftContainer, moveToRightContainer} = this.props;
    return (
      <div>{taskList.map((task,i) => (<Task key={i} name={task.name} time={task.time} onClickLeft={moveToLeftContainer? moveToLeftContainer.bind(this,i):null} onClickRight={moveToRightContainer?moveToRightContainer.bind(this,i):null}/>))}</div>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      lists : {
        todo: [{ name: 'max', time:'666' }],
        inprog: [{ name: 'nick', time:'156' }],
        test: [{ name: 'oop', time:'1222' }],
        done: [{ name: 'twit', time:'555' },{ name: 'kas', time:'999' }]
      }, update : false
    }
  }

  moveToContainer (arrayFrom, arrayTo, index) {
    console.log(arrayFrom, arrayTo, index)
    arrayTo.push(arrayFrom.splice(index,1)[0])
    console.log(arrayFrom, arrayTo)
    this.setState({
      update: true
    })
  }

  shouldComponentUpdate (_,state) {
    if (state.update === true){
    this.setState({update:false})
    return true;}
    return false;
  }

  render () {
    const { lists, update } = this.state;
    return (
      <div className="container">
        <div className='col-sm-3 ToDo'>ToDo<List taskList={lists.todo} moveToRightContainer={this.moveToContainer.bind(this, lists.todo,lists.inprog)}/></div>
        <div className='col-sm-3 InProgres'>InProgres<List taskList={lists.inprog} moveToLeftContainer={this.moveToContainer.bind(this, lists.inprog, lists.todo)}moveToRightContainer={this.moveToContainer.bind(this, lists.inprog, lists.test)}/></div>
        <div className='col-sm-3 Testing'>Testing<List taskList={lists.test} moveToLeftContainer={this.moveToContainer.bind(this, lists.test, lists.inprog)}moveToRightContainer={this.moveToContainer.bind(this, lists.test, lists.done)}/></div>
        <div className='col-sm-3 Done'>Done<List taskList={lists.done} moveToLeftContainer={this.moveToContainer.bind(this, lists.done, lists.test)}/></div>
      </div>
    )
  }
}

ReactDOM.render(<App/>,
  document.getElementById('app')
);
