import React from "react";
import {browserHistory} from "react-router";
import Header from "../components/bank/Header";
import Sidebar from "../components/bank/Sidebar";
import Body from "../components/bank/Body";
import Viewbanks from "../components/bank/Viewbanks";
import style from "../../css/bank.css";
import {startBank, addQuestion, getAllBanks} from "../api/axios";

export default class Banks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ques: '',
      quesId: 0,
      quesarr: [],
      options: [{
        opName: '',
        idx: ''
      }],
      bankId: -1,
      bankName: '',
      optionChecked: 0,
      error: '',
      isBankNameEditting: false,
      onCreate: false,
      results: []
    };
  }

  handleQuestionChange = (evt) => {
    this.setState({
      ...this.state,
      ques: evt.target.value
    });
  }

  handleBankNameChange = (evt) => {
    this.setState({
      ...this.state,
      bankName: evt.target.value
    });
  }

  handleOptionNameChange = (idx) => (evt) => {
    const newOptions = this.state.options.map((option, sidx) => {
      if (idx !== sidx) return option;
      return {
        ...option,
        opName: evt.target.value,
        idx: sidx
      };
    });

    this.setState({options: newOptions});
  }

  handleSubmit = (evt) => {
    const {ques, options, quesId, optionChecked} = this.state;
    console.log(this.state.quesId);
    console.log('starting Bank');

    let data = {
      bank_name: this.state.bankName,
      question: this.state.ques,
      option_1: options[0].opName,
      option_2: options[1].opName,
      option_3: options[2].opName,
      option_4: options[3].opName,
      answer: optionChecked
    };

    if (this.state.bankId === -1) {
      console.log('starting Bank');
      startBank(JSON.stringify(data)).then((response) => {
        console.log(response);

        if (response.data.status === 'success') {
          this.setState({
            ...this.state,
            bankId: response.data.data.bank_id,
            error: ''
          });

        } else {
          this.setState({
            ...this.state,
            error: response.data.message
          });
        }
      }).catch((error) => {
        console.log(error);
      });

    } else {
      data.bank_id = this.state.bankId;
      addQuestion(JSON.stringify(data), this.state.bankId).then((response) => {
        console.log(response);

        if (response.data.status === 'success') {
          this.setState({
            ...this.state,
            error: ''
          });

        } else {
          this.setState({
            ...this.state,
            error: response.data.message
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    }

    let quesarr = this.state.quesarr;
    quesarr[quesId] = ({
      ques,
      options,
      optionChecked
    });

    this.setState({
      ...this.state,
      quesarr,
      ques: '',
      quesId: quesarr.length,
      options: [{
        opName: "",
        idx: 0
      }],
      optionChecked: 0
    });


    setTimeout(() => {
      console.log(this.state);
    }, 1000);

  };

  handleAddOption = () => {
    const {options, idx} = this.state;
    this.setState({
      options: this.state.options.concat([{opName: ''}]),
    });
  };

  handleRemoveOption = (idx) => () => {
    console.log("aa gaya", idx);
    this.setState({
      options: this.state.options.filter((s, sidx) => idx !== sidx)
    });
  };

  onOptionCheckedChange = (idx) => {
    this.setState({
      ...this.state,
      optionChecked: idx
    });
  }

  loadQuestion = (index) => {
    const {quesId, quesarr} = this.state;
    console.log(index);
    this.setState({
      ...this.state,
      ques: quesarr[index].ques,
      quesId: index,
      options: quesarr[index].options,
      optionChecked: quesarr[index].optionChecked
    });
  };

  handleBankNameEditToggle = (isEditting) => {
    this.setState({
      ...this.state,
      isBankNameEditting: isEditting
    });
  }

  onCreateNewButtonClick = (evt) => {
    this.setState({
      ...this.state,
      onCreate: true
    });
  }

  discardChanges = (evt) => {
    this.setState({
      ...this.state,
      ques: '',
      quesId: 0,
      quesarr: [],
      options: [{
        opName: '',
        idx: ''
      }],
      bankId: 0,
      bankName: '',
      optionChecked: 0,
      error: '',
      isBankNameEditting: false,
      onCreate: false
    });
  }

  componentWillMount() {
    console.log('Banks - component is mounting');
    getAllBanks()
      .then((response) => {
        console.log(response);
        if (response.data.status === 'success') {
          this.setState({
            ...this.state,
            results: response.data.data
          });
        } else {
          this.setState({
            ...this.state,
            results: undefined
          });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          results: undefined
        });
      });
  }


  // saveQuestions = () => {
  //   console.log('Save clicked')
  //
  //
  //   let data = JSON.stringify({
  //     bank_name: this.state.bankName,
  //     question: this.state.ques,
  //     option_1: options[0].opName,
  //     option_2: options[1].opName,
  //     option_3: options[2].opName,
  //     option_4: options[3].opName,
  //     answer: optionChecked
  //   })
  //   console.log(data);
  //
  //   addQuestion(data).then((response) => {
  //     console.log(response);
  //
  //     if (response.data.status === 'success') {
  //       this.setState({
  //         ...this.state,
  //         error: ''
  //       });
  //
  //     } else {
  //       this.setState({
  //         ...this.state,
  //         error: response.data.message
  //       });
  //     }
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  //
  // }

  render() {
    return (
      <div>
        {this.state.onCreate &&
        <div>
          <Header
            onCreate={this.state.onCreate}
            isBankNameEditting={this.state.isBankNameEditting}
            bankName={this.state.bankName}
            handleBankNameChange={this.handleBankNameChange}
            handleBankNameEditToggle={this.handleBankNameEditToggle}
            discardChanges={this.discardChanges}
          />

          <div className={style.partition}>
            <div className={style.left}>
              <Sidebar
                quesarr={this.state.quesarr}
                loadQuestion={this.loadQuestion}
              />
            </div>

            <div className={style.right}>
              <Body
                ques={this.state.ques}
                options={this.state.options}
                optionChecked={this.state.optionChecked}
                error={this.state.error}
                handleQuestionChange={this.handleQuestionChange}
                onOptionCheckedChange={this.onOptionCheckedChange}
                handleOptionNameChange={this.handleOptionNameChange}
                handleRemoveOption={this.handleRemoveOption}
                handleAddOption={this.handleAddOption}
                handleSubmit={this.handleSubmit}
              />
            </div>
          </div>
        </div>
        }
        {!this.state.onCreate &&
        <div className={style.bankPage}>
          <Header
            onCreate={this.state.onCreate}
            isBankNameEditting={this.state.isBankNameEditting}
            bankName={this.state.bankName}
            handleBankNameChange={this.handleBankNameChange}
            handleBankNameEditToggle={this.handleBankNameEditToggle}
            onCreateNewButtonClick={this.onCreateNewButtonClick}
          />
          <Viewbanks
            results={this.state.results}
          />
        </div>

        }
      </div>
    );


  }
}